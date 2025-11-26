import { CheckCircle2, ClipboardList, Timer, TriangleAlert } from "lucide-react";

export type CertificateRecord = {
  id: string;
  expediente: string;
  entidad: string;
  custodio: string;
  tipoActivo: string;
  integridadHash: string;
  estado: "En revisión" | "Certificado" | "Observado";
  nivelPreservacion: string;
  fecha: string;
};

const statusStyles: Record<CertificateRecord["estado"], { label: string; className: string; Icon: typeof CheckCircle2 }> = {
  Certificado: {
    label: "Certificado",
    className:
      "bg-emerald-500/10 text-emerald-300 border border-emerald-400/40",
    Icon: CheckCircle2,
  },
  "En revisión": {
    label: "En revisión",
    className: "bg-sky-500/10 text-sky-300 border border-sky-400/40",
    Icon: Timer,
  },
  Observado: {
    label: "Observado",
    className: "bg-amber-500/10 text-amber-300 border border-amber-400/40",
    Icon: TriangleAlert,
  },
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

type Props = {
  data: CertificateRecord[];
};

export const CertificateBoard = ({ data }: Props) => (
  <section className="card-border rounded-3xl p-6">
    <header className="mb-6 flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/60 text-cyan-300">
        <ClipboardList className="h-6 w-6" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-100">
          Tablero de certificaciones activas
        </h2>
        <p className="text-sm text-slate-400">
          Estado en vivo de los expedientes y su nivel de preservación.
        </p>
      </div>
    </header>

    <div className="space-y-4">
      {data.map((item) => {
        const style = statusStyles[item.estado];

        return (
          <article
            key={item.id}
            className="rounded-3xl border border-white/5 bg-slate-950/60 p-4 transition hover:border-emerald-400/30 hover:bg-slate-900/80"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-400">
                    {item.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-medium ${style.className}`}
                  >
                    <style.Icon className="h-3.5 w-3.5" />
                    {style.label}
                  </span>
                  <span className="rounded-xl bg-slate-800/80 px-3 py-1 text-xs text-slate-300">
                    Nivel {item.nivelPreservacion}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-slate-50">
                  {item.expediente} · {item.tipoActivo}
                </h3>
                <p className="text-sm text-slate-400">
                  {item.entidad} – Custodio: {item.custodio}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 text-sm text-slate-300 lg:items-end">
                <span className="font-mono text-xs text-slate-500">
                  Hash
                </span>
                <code className="max-w-xs truncate rounded-xl bg-slate-900/70 px-3 py-1 font-mono text-xs text-slate-200">
                  {item.integridadHash}
                </code>
                <span className="text-xs text-slate-400">
                  Actualizado: {formatDate(item.fecha)}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

