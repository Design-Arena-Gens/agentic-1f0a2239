"use client";

import { useMemo } from "react";
import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";

export type TickerEvent = {
  id: string;
  message: string;
  timestamp: string;
  level: "success" | "info" | "warning";
};

const levelStyles: Record<
  TickerEvent["level"],
  { tint: string; bg: string; Icon: typeof Activity }
> = {
  success: {
    tint: "text-emerald-300",
    bg: "from-emerald-500/20 to-emerald-500/10",
    Icon: CheckCircle2,
  },
  info: {
    tint: "text-sky-300",
    bg: "from-sky-500/20 to-sky-500/10",
    Icon: Activity,
  },
  warning: {
    tint: "text-amber-300",
    bg: "from-amber-500/20 to-amber-500/10",
    Icon: AlertTriangle,
  },
};

const formatTime = (value: string) => {
  try {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

type Props = {
  events: TickerEvent[];
};

export const Ticker = ({ events }: Props) => {
  const items = useMemo(() => {
    if (events.length === 0) {
      return [];
    }

    const repetitions = Math.ceil(12 / events.length);
    return Array.from({ length: repetitions }, () => events).flat();
  }, [events]);

  return (
    <section className="rounded-3xl border border-slate-800/60 bg-slate-900/70 shadow-xl">
      <header className="flex items-center gap-4 border-b border-slate-800/60 px-6 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-emerald-400">
            Ticker en vivo
          </p>
          <p className="text-sm text-slate-400">
            Registro de certificaciones, verificaciones y alertas.
          </p>
        </div>
      </header>
      <div className="ticker-mask relative overflow-hidden">
        <div className="flex min-w-max items-center gap-6 animate-ticker px-6 py-5">
          {items.map((event, index) => {
            const style = levelStyles[event.level];
            return (
              <article
                key={`${event.id}-${index}`}
                className={`flex min-w-[18rem] items-center gap-3 rounded-2xl bg-gradient-to-r ${style.bg} px-4 py-3 backdrop-blur`}
              >
                <div
                  className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-white/10 ${style.tint} bg-black/30`}
                >
                  <style.Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-100">
                    {event.message}
                  </p>
                  <span className="text-xs font-mono uppercase tracking-wide text-slate-400">
                    {formatTime(event.timestamp)} UTC
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
