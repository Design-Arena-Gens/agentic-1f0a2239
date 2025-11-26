import { ArchiveRestore, ShieldCheck, Signal, Zap } from "lucide-react";

export type PreservationAsset = {
  id: string;
  titulo: string;
  responsable: string;
  criticidad: "Alta" | "Media" | "Baja";
  controles: string[];
  ultimaVerificacion: string;
};

const criticidadStyles: Record<PreservationAsset["criticidad"], string> = {
  Alta: "bg-red-500/10 text-red-300 border border-red-500/40",
  Media: "bg-amber-500/10 text-amber-200 border border-amber-500/40",
  Baja: "bg-emerald-500/10 text-emerald-200 border border-emerald-500/40",
};

const formatRelative = (value: string) => {
  const formatter = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
  const date = new Date(value);
  const delta = date.getTime() - Date.now();
  const minutes = Math.round(delta / 60000);

  if (Math.abs(minutes) < 60) {
    return formatter.format(minutes, "minute");
  }

  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 48) {
    return formatter.format(hours, "hour");
  }

  const days = Math.round(hours / 24);
  return formatter.format(days, "day");
};

type Props = {
  assets: PreservationAsset[];
};

export const PreservationVault = ({ assets }: Props) => (
  <section className="card-border flex h-full flex-col gap-5 rounded-3xl p-6">
    <header className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-200">
        <ArchiveRestore className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-100">
          Preservación avanzada
        </h2>
        <p className="text-sm text-slate-400">
          Rutinas automáticas para resguardar firmas, bitácoras y registros
          críticos.
        </p>
      </div>
    </header>

    <ul className="space-y-4">
      {assets.map((asset) => (
        <li
          key={asset.id}
          className="rounded-3xl border border-slate-800/60 bg-slate-950/80 p-4"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500">
                  {asset.id}
                </p>
                <h3 className="text-sm font-semibold text-slate-100">
                  {asset.titulo}
                </h3>
                <p className="text-xs text-slate-400">
                  Responsable: {asset.responsable}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-medium ${criticidadStyles[asset.criticidad]}`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Criticidad {asset.criticidad}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {asset.controles.map((control) => (
                <span
                  key={control}
                  className="inline-flex items-center gap-1 rounded-xl bg-slate-900/80 px-3 py-1 text-[11px] text-slate-300"
                >
                  <Signal className="h-3 w-3 text-cyan-300" />
                  {control}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-emerald-300" />
                Último test automático {formatRelative(asset.ultimaVerificacion)}
              </span>
              <span className="font-mono text-slate-500">
                Frecuencia 4h | 0 incidentes
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

