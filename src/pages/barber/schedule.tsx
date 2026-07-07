import { useState } from "react";
import { Clock, Coffee, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { defaultSchedule as initialSchedule } from "@/data/barber";

export default function Schedule() {
  const [schedule, setSchedule] = useState(initialSchedule);

  const toggleDay = (index: number) => {
    setSchedule((prev) =>
      prev.map((day, i) => (i === index ? { ...day, active: !day.active } : day))
    );
  };

  const updateTime = (
    index: number,
    field: "start" | "end" | "breakStart" | "breakEnd",
    value: string
  ) => {
    setSchedule((prev) =>
      prev.map((day, i) => (i === index ? { ...day, [field]: value } : day))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold sm:text-3xl">Расписание</h1>
        <p className="text-sm text-muted-foreground">
          Настройте рабочие дни, время и перерывы.
        </p>
      </div>

      <div className="grid gap-4">
        {schedule.map((day, index) => (
          <div
            key={day.day}
            className={`surface-card card-shadow p-4 sm:p-5 ${
              !day.active ? "opacity-70" : ""
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  checked={day.active}
                  onCheckedChange={() => toggleDay(index)}
                />
                <Label className="text-base font-medium">{day.day}</Label>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={day.start}
                    onChange={(e) => updateTime(index, "start", e.target.value)}
                    disabled={!day.active}
                    className="h-9 w-28"
                  />
                </div>
                <span className="text-sm text-muted-foreground">—</span>
                <Input
                  type="time"
                  value={day.end}
                  onChange={(e) => updateTime(index, "end", e.target.value)}
                  disabled={!day.active}
                  className="h-9 w-28"
                />

                <div className="ml-2 flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2">
                  <Coffee className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={day.breakStart}
                    onChange={(e) =>
                      updateTime(index, "breakStart", e.target.value)
                    }
                    disabled={!day.active}
                    className="h-9 w-28"
                  />
                  <span className="text-sm text-muted-foreground">—</span>
                  <Input
                    type="time"
                    value={day.breakEnd}
                    onChange={(e) =>
                      updateTime(index, "breakEnd", e.target.value)
                    }
                    disabled={!day.active}
                    className="h-9 w-28"
                  />
                </div>
              </div>

              {!day.active && (
                <Badge variant="secondary" className="gap-1">
                  <X className="h-3.5 w-3.5" />
                  Выходной
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
