export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "canceled";
  price: number;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  visits: number;
  lastVisit: string;
  notes: string;
}

export interface ScheduleDay {
  day: string;
  active: boolean;
  start: string;
  end: string;
  breakStart: string;
  breakEnd: string;
}

export interface Activity {
  id: string;
  text: string;
  time: string;
}

export const appointments: Appointment[] = [
  { id: "a1", clientName: "Бекзат Мамбетов", service: "Men haircut", date: "2026-07-07", time: "10:00", status: "upcoming", price: 500 },
  { id: "a2", clientName: "Нурлан Касымов", service: "Beard design", date: "2026-07-07", time: "11:30", status: "upcoming", price: 350 },
  { id: "a3", clientName: "Айбек Тургунов", service: "Haircut and styling", date: "2026-07-07", time: "13:00", status: "upcoming", price: 700 },
  { id: "a4", clientName: "Жибек Асанова", service: "Straight razor shave", date: "2026-07-06", time: "16:00", status: "completed", price: 400 },
  { id: "a5", clientName: "Темирлан Орозов", service: "Men haircut", date: "2026-07-05", time: "09:30", status: "canceled", price: 500 },
  { id: "a6", clientName: "Алия Умурова", service: "Beard design", date: "2026-07-07", time: "14:30", status: "upcoming", price: 350 },
  { id: "a7", clientName: "Эрлан Дастанов", service: "Haircut and styling", date: "2026-07-06", time: "12:00", status: "completed", price: 700 },
];

export const clients: Client[] = [
  { id: "c1", name: "Бекзат Мамбетов", phone: "+996 555 010101", visits: 12, lastVisit: "2026-07-01", notes: "Предпочитает короткие стрижки" },
  { id: "c2", name: "Нурлан Касымов", phone: "+996 555 020202", visits: 8, lastVisit: "2026-06-28", notes: "Аллергия на某些 препараты" },
  { id: "c3", name: "Айбек Тургунов", phone: "+996 555 030303", visits: 5, lastVisit: "2026-06-15", notes: "Регулярный клиент" },
  { id: "c4", name: "Жибек Асанова", phone: "+996 555 040404", visits: 3, lastVisit: "2026-07-06", notes: "Новый клиент" },
  { id: "c5", name: "Темирлан Орозов", phone: "+996 555 050505", visits: 15, lastVisit: "2026-06-30", notes: "Любит классику" },
];

export const defaultSchedule: ScheduleDay[] = [
  { day: "Понедельник", active: true, start: "09:00", end: "19:00", breakStart: "13:00", breakEnd: "14:00" },
  { day: "Вторник", active: true, start: "09:00", end: "19:00", breakStart: "13:00", breakEnd: "14:00" },
  { day: "Среда", active: true, start: "09:00", end: "19:00", breakStart: "13:00", breakEnd: "14:00" },
  { day: "Четверг", active: true, start: "09:00", end: "19:00", breakStart: "13:00", breakEnd: "14:00" },
  { day: "Пятница", active: true, start: "09:00", end: "19:00", breakStart: "13:00", breakEnd: "14:00" },
  { day: "Суббота", active: true, start: "10:00", end: "18:00", breakStart: "13:00", breakEnd: "14:00" },
  { day: "Воскресенье", active: false, start: "10:00", end: "18:00", breakStart: "13:00", breakEnd: "14:00" },
];

export const activities: Activity[] = [
  { id: "act1", text: "Новая запись от Бекзата", time: "5 мин назад" },
  { id: "act2", text: "Отменена запись Темирлана", time: "1 час назад" },
  { id: "act3", text: "Завершена стрижка Жибек", time: "3 часа назад" },
  { id: "act4", text: "Добавлен новый клиент Алия", time: "Вчера" },
  { id: "act5", text: "Обновлено расписание", time: "Вчера" },
];
