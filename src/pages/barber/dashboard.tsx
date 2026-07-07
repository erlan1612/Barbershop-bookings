import { CalendarDays, Clock, DollarSign, Star, Users } from "lucide-react";
import { activities, appointments } from "@/data/barber";

const todayAppointments = appointments.filter((a) => a.date === "2026-07-07");
const upcomingAppointment = todayAppointments.find((a) => a.status === "upcoming");

export default function Dashboard() {
  const todayRevenue = appointments
    .filter((a) => a.date === "2026-07-07")
    .reduce((sum, a) => sum + a.price, 0);
  const weekRevenue = appointments.reduce((sum, a) => sum + a.price, 0);
  const newClients = 12;
  const rating = 4.9;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold sm:text-3xl">Панель управления</h1>
        <p className="text-sm text-muted-foreground">
          Обзор вашего рабочего дня и активности.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="surface-card card-shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Записи сегодня</p>
              <p className="mt-1 text-2xl font-semibold">{todayAppointments.length}</p>
            </div>
            <CalendarDays className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        <div className="surface-card card-shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Доход сегодня</p>
              <p className="mt-1 text-2xl font-semibold">{todayRevenue} сом</p>
            </div>
            <DollarSign className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        <div className="surface-card card-shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Новые клиенты</p>
              <p className="mt-1 text-2xl font-semibold">{newClients}</p>
            </div>
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        <div className="surface-card card-shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Рейтинг</p>
              <p className="mt-1 text-2xl font-semibold">{rating}</p>
            </div>
            <Star className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="surface-card card-shadow p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">Записи на сегодня</h2>
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-semibold">
                      {appointment.time}
                    </div>
                    <div>
                      <p className="font-medium">{appointment.clientName}</p>
                      <p className="text-xs text-muted-foreground">{appointment.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.price} сом</p>
                    <p
                      className={`text-xs font-medium ${
                        appointment.status === "upcoming"
                          ? "text-emerald-600"
                          : appointment.status === "completed"
                            ? "text-blue-600"
                            : "text-destructive"
                      }`}
                    >
                      {appointment.status === "upcoming"
                        ? "Ожидает"
                        : appointment.status === "completed"
                          ? "Завершена"
                          : "Отменена"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card card-shadow p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">Краткая сводка</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Выполнено записей</p>
                <p className="mt-1 text-xl font-semibold">
                  {appointments.filter((a) => a.status === "completed").length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Отменено</p>
                <p className="mt-1 text-xl font-semibold">
                  {appointments.filter((a) => a.status === "canceled").length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Общий доход</p>
                <p className="mt-1 text-xl font-semibold">{weekRevenue} сом</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ожидают подтверждения</p>
                <p className="mt-1 text-xl font-semibold">
                  {appointments.filter((a) => a.status === "upcoming").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card card-shadow p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">Ближайшая запись</h2>
            {upcomingAppointment ? (
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Сегодня</p>
                    <p className="font-semibold">{upcomingAppointment.time}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium">{upcomingAppointment.clientName}</p>
                  <p className="text-xs text-muted-foreground">{upcomingAppointment.service}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Нет ближайших записей.</p>
            )}
          </div>

          <div className="surface-card card-shadow p-5 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">Последние действия</h2>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm leading-relaxed">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
