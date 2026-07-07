import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { services as initialServices } from "@/data/services";

type ServiceForm = {
  id: string;
  name: string;
  duration: string;
  price: string;
  category: "men" | "women" | "unisex";
};

function emptyService(): ServiceForm {
  return { id: "", name: "", duration: "", price: "", category: "men" };
}

export default function BarberServices() {
  const [services, setServices] = useState(
    initialServices.map((s) => ({ ...s, price: String(s.price) }))
  );
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<ServiceForm>(emptyService());

  const handleAdd = () => {
    setEditing(false);
    setForm(emptyService());
    setOpen(true);
  };

  const handleEdit = (service: (typeof services)[0]) => {
    setEditing(true);
    setForm({
      id: service.id,
      name: service.name,
      duration: service.duration,
      price: String(service.price),
      category: service.category,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.duration.trim() || !form.price.trim()) {
      return;
    }

    const next = { ...form, price: Number(form.price) };

    setServices((prev) => {
      if (editing) {
        return prev.map((s) => (s.id === next.id ? next : s));
      }
      return [...prev, { ...next, id: `s_${Date.now()}` }];
    });

    setOpen(false);
    setEditing(false);
    setForm(emptyService());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold sm:text-3xl">Услуги</h1>
          <p className="text-sm text-muted-foreground">
            Управление прайс-листом и длительностью услуг.
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Добавить услугу
        </Button>
      </div>

      <div className="surface-card card-shadow p-4 sm:p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Услуга</TableHead>
              <TableHead>Длительность</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>{service.price} сом</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {service.category === "men"
                      ? "Мужская"
                      : service.category === "women"
                        ? "Женская"
                        : "Унисекс"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => handleEdit(service)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-sm text-muted-foreground"
                >
                  Нет услуг.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) {
            setEditing(false);
            setForm(emptyService());
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Редактировать услугу" : "Новая услуга"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Название</label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Длительность
              </label>
              <Input
                value={form.duration}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, duration: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Цена</label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Категория
              </label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    category: value as ServiceForm["category"],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Мужская</SelectItem>
                  <SelectItem value="women">Женская</SelectItem>
                  <SelectItem value="unisex">Унисекс</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Описание / заметка
              </label>
              <Textarea
                placeholder="Дополнительная информация..."
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setOpen(false);
                setEditing(false);
                setForm(emptyService());
              }}
            >
              Отмена
            </Button>
            <Button onClick={handleSave}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
