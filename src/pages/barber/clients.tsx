import { useState } from "react";
import { Search, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { clients as initialClients } from "@/data/barber";

export default function Clients() {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState(initialClients);
  const [selectedClient, setSelectedClient] = useState<ReturnType<typeof initialClients[0]> | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold sm:text-3xl">Клиенты</h1>
        <p className="text-sm text-muted-foreground">
          База ваших клиентов и история посещений.
        </p>
      </div>

      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по имени или телефону..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="surface-card card-shadow p-4 sm:p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Клиент</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Посещений</TableHead>
              <TableHead>Последний визит</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((client) => (
              <TableRow
                key={client.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedClient(client);
                  setDetailOpen(true);
                }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{client.name}</span>
                  </div>
                </TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{client.visits}</Badge>
                </TableCell>
                <TableCell>{client.lastVisit}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">
                    Подробнее
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                  Карентов не найдено.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Карточка клиента</DialogTitle>
            <DialogDescription>
              Детальная информация о клиенте.
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-lg">
                    {selectedClient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-semibold">{selectedClient.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    {selectedClient.phone}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="surface-card p-4">
                  <p className="text-sm text-muted-foreground">Посещений</p>
                  <p className="mt-1 text-xl font-semibold">{selectedClient.visits}</p>
                </div>
                <div className="surface-card p-4">
                  <p className="text-sm text-muted-foreground">Последний визит</p>
                  <p className="mt-1 text-xl font-semibold">{selectedClient.lastVisit}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Заметки</p>
                <p className="mt-1 text-sm text-muted-foreground">{selectedClient.notes}</p>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setDetailOpen(false)}>Закрыть</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
