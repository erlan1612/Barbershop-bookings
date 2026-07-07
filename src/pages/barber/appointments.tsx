import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { appointments as initialAppointments } from "@/data/barber";

export default function Appointments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [appointments, setAppointments] = useState(initialAppointments);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = appointments.filter((a) => {
    const matchesSearch =
      a.clientName.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, status: "upcoming" | "completed" | "canceled") => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    setCancelDialogOpen(false);
    setSelectedId(null);
  };

  const handleCancelClick = (id: string) => {
    setSelectedId(id);
    setCancelDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold sm:text-3xl">Записи</h1>
        <p className="text-sm text-muted-foreground">
          Управление клиентскими записями.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по клиенту или услуге..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="upcoming">Ожидают</SelectItem>
            <SelectItem value="completed">Завершены</SelectItem>
            <SelectItem value="canceled">Отменены</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="surface-card card-shadow p-4 sm:p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Клиент</TableHead>
              <TableHead>Услуга</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Время</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.clientName}</TableCell>
                <TableCell>{appointment.service}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.price} сом</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      appointment.status === "completed"
                        ? "secondary"
                        : appointment.status === "canceled"
                          ? "destructive"
                          : "default"
                    }
                  >
                    {appointment.status === "upcoming"
                      ? "Ожидает"
                      : appointment.status === "completed"
                        ? "Завершена"
                        : "Отменена"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  {appointment.status !== "completed" &&
                    appointment.status !== "canceled" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(appointment.id, "completed")}
                      >
                        Завершить
                      </Button>
                    )}
                  {appointment.status === "upcoming" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateStatus(appointment.id, "completed")}
                      >
                        Подтвердить
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleCancelClick(appointment.id)}
                      >
                        Отмена
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">
                  Нет записей, соответствующих фильтру.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Отмена записи</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Вы уверены, что хотите отменить эту запись? Это действие можно будет
            изменить позже.
          </p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setCancelDialogOpen(false)}
            >
              Нет
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                selectedId && updateStatus(selectedId, "canceled")
              }
            >
              Да, отменить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
