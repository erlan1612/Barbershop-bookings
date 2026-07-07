import { useState } from "react";
import { useState } from "react";
import { Camera, KeyRound, Bell, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState = {
  name: "Azamat Jusupov",
  email: "azamat@hairline.kg",
  phone: "+996 555 123456",
  address: "Chuy Ave, 150, Bishkek",
  bio: "Senior barber focused on clean fades, shape, and natural styling.",
};

export default function Settings() {
  const [profile, setProfile] = useState(initialState);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const updateField = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const canSavePassword =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    newPassword === repeatPassword;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold sm:text-3xl">Настройки</h1>
        <p className="text-sm text-muted-foreground">
          Профиль, контакты и уведомления.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="surface-card card-shadow p-5 sm:p-6 text-center">
            <div className="mx-auto w-24 h-24 mb-4 relative inline-flex items-center justify-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-xl">AJ</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">Barber</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="surface-card card-shadow p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">Профиль</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1 block text-sm font-medium">Имя</Label>
                <div className="relative">
                  <Input
                    value={profile.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label className="mb-1 block text-sm font-medium">
                  Электронная почта
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={profile.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-1 block text-sm font-medium">Телефон</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={profile.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-1 block text-sm font-medium">Адрес</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={profile.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Label className="mb-1 block text-sm font-medium">О себе</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) => updateField("bio", e.target.value)}
              />
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => {}}>Сохранить изменения</Button>
            </div>
          </div>

          <div className="surface-card card-shadow p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">Безопасность</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <KeyRound className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Пароль</p>
                  <p className="text-xs text-muted-foreground">
                    Измените или обновите пароль
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => setPasswordDialogOpen(true)}
              >
                Изменить пароль
              </Button>
            </div>
          </div>

          <div className="surface-card card-shadow p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">
              <span className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Уведомления
              </span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email-уведомления</p>
                  <p className="text-xs text-muted-foreground">
                    Новые записи и изменения
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      email: checked,
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">SMS-уведомления</p>
                  <p className="text-xs text-muted-foreground">
                    Напоминания клиентам
                  </p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      sms: checked,
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Push-уведомления</p>
                  <p className="text-xs text-muted-foreground">
                    В приложении
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      push: checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изменение пароля</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-1 block text-sm font-medium">
                Текущий пароль
              </Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium">
                Новый пароль
              </Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1 block text-sm font-medium">
                Повторите пароль
              </Label>
              <Input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setPasswordDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button
              disabled={!canSavePassword}
              onClick={() => setPasswordDialogOpen(false)}
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
