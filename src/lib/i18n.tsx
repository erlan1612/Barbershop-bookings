import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { enDictionary } from "@/lib/i18n/dictionaries/en";
import { kyDictionary } from "@/lib/i18n/dictionaries/ky";
import { ruDictionary } from "@/lib/i18n/dictionaries/ru";
import type { I18nDictionary, I18nKey } from "@/lib/i18n/types";

export type Lang = "ky" | "ru" | "en";
export type Theme = "light" | "dark";
type ValueGroup = "role" | "location" | "specialty" | "productType" | "service";

const dictionaries: Record<Lang, I18nDictionary> = {
  en: enDictionary,
  ru: ruDictionary,
  ky: kyDictionary,
};

const fallbackDictionary = dictionaries.en;

function getInitialLang(): Lang {
  const saved = localStorage.getItem("hairline-lang") as Lang | "kg" | null;
  if (saved === "kg") return "ky";
  if (saved === "ky" || saved === "ru" || saved === "en") return saved;

  if (typeof navigator === "undefined") return "en";

  const browser = navigator.language.toLowerCase();
  if (browser.startsWith("ru")) return "ru";
  if (browser.startsWith("ky") || browser.startsWith("kg")) return "ky";
  return "en";
}

function normalizeValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function languageTag(lang: Lang) {
  if (lang === "ru") return "ru-RU";
  if (lang === "ky") return "ky-KG";
  return "en-US";
}

function verifyDictionaryKeys() {
  const baseline = new Set(Object.keys(fallbackDictionary));
  const dictionaryEntries = Object.entries(dictionaries);

  for (const [lang, dictionary] of dictionaryEntries) {
    const currentKeys = new Set(Object.keys(dictionary));

    for (const key of baseline) {
      if (!currentKeys.has(key)) {
        throw new Error(`Missing i18n key "${key}" in language "${lang}"`);
      }
    }

    for (const key of currentKeys) {
      if (!baseline.has(key)) {
        throw new Error(`Extra i18n key "${key}" in language "${lang}"`);
      }
    }
  }
}

if (import.meta.env.DEV) {
  verifyDictionaryKeys();
}

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("hairline-theme") as Theme | null;
  if (saved === "dark" || saved === "light") return saved;
  if (typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  tr: (key: I18nKey, values?: Record<string, string | number>) => string;
  tv: (group: ValueGroup, value: string) => string;
  price: (amount: number) => string;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const changeLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("hairline-lang", newLang);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("hairline-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = languageTag(lang);
  }, [lang]);

  const interpolate = useCallback((value: string, values?: Record<string, string | number>) => {
    if (!values) return value;
    return value.replace(/\{\{(\w+)\}\}/g, (_, name) => {
      const replacement = values[name];
      return replacement !== undefined ? String(replacement) : "";
    });
  }, []);

  const tr = useCallback(
    (key: string, values?: Record<string, string | number>) => {
      const dictionary = dictionaries[lang];
      const raw = dictionary[key] || fallbackDictionary[key] || key;
      return interpolate(raw, values);
    },
    [lang, interpolate],
  );

  const tv = useCallback(
    (group: ValueGroup, value: string) => {
      if (!value) return value;
      const key = `${group}.${normalizeValue(value)}`;
      return tr(key) === key ? value : tr(key);
    },
    [tr],
  );

  const price = useCallback(
    (amount: number) => `${amount} ${tr("currency")}`,
    [tr],
  );

  const formatDate = useCallback(
    (date: Date, options?: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(languageTag(lang), options).format(date),
    [lang],
  );

  const contextValue = useMemo<I18nContextType>(
    () => ({
      lang,
      setLang: changeLang,
      tr,
      tv,
      price,
      formatDate,
      theme,
      setTheme,
    }),
    [lang, changeLang, tr, tv, price, formatDate, theme, setTheme],
  );

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};