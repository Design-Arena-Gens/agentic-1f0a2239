"use client";

import { useMemo, useState } from "react";
import { FilePlus2 } from "lucide-react";

export type CertificateDraft = {
  expediente: string;
  entidad: string;
  custodio: string;
  tipoActivo: string;
  integridadHash: string;
  descripcion: string;
};

type Props = {
  onCreate: (draft: CertificateDraft) => void;
};

const emptyDraft: CertificateDraft = {
  expediente: "",
  entidad: "",
  custodio: "",
  tipoActivo: "",
  integridadHash: "",
  descripcion: "",
};

export const CertificateForm = ({ onCreate }: Props) => {
  const [draft, setDraft] = useState<CertificateDraft>(emptyDraft);
  const [touched, setTouched] = useState(false);

  const isValid = useMemo(() => {
    return Object.values(draft).every((item) => item.trim().length > 0);
  }, [draft]);

  const updateField = (key: keyof CertificateDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);

    if (!isValid) return;

    onCreate(draft);
    setDraft(emptyDraft);
    setTouched(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-border rounded-3xl p-6 shadow-2xl shadow-emerald-500/10"
    >
      <header className="mb-5 flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
          <FilePlus2 className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Registrar nuevo activo certificado
          </h2>
          <p className="text-sm text-slate-400">
            Completa la bitácora y el hash de integridad para lanzar el flujo
            de revisión.
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Código de expediente
          </span>
          <input
            value={draft.expediente}
            onChange={(event) => updateField("expediente", event.target.value)}
            placeholder="RCS-2024-105"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Entidad responsable
          </span>
          <input
            value={draft.entidad}
            onChange={(event) => updateField("entidad", event.target.value)}
            placeholder="Planta Odigo Norte"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Custodio técnico
          </span>
          <input
            value={draft.custodio}
            onChange={(event) => updateField("custodio", event.target.value)}
            placeholder="Ing. Daniela Salas"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Tipo de activo
          </span>
          <input
            value={draft.tipoActivo}
            onChange={(event) => updateField("tipoActivo", event.target.value)}
            placeholder="Plano electromecánico"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
          />
        </label>

        <label className="sm:col-span-2 flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Hash de integridad (SHA-256)
          </span>
          <input
            value={draft.integridadHash}
            onChange={(event) =>
              updateField("integridadHash", event.target.value)
            }
            placeholder="bd45c0d14f2b8c2ee21e7a9f6c3e213d"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm font-mono text-slate-100 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
          />
        </label>

        <label className="sm:col-span-2 flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Bitácora y alcance del activo
          </span>
          <textarea
            value={draft.descripcion}
            onChange={(event) => updateField("descripcion", event.target.value)}
            placeholder="Resumen técnico de la inspección, controles realizados y responsables de la trazabilidad."
            rows={4}
            className="resize-none rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
          />
        </label>
      </div>

      {touched && !isValid && (
        <p className="mt-4 text-sm text-amber-300/90">
          Revisa los campos: todos son obligatorios para emitir la trazabilidad
          inicial.
        </p>
      )}

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:from-emerald-400 hover:to-cyan-400"
      >
        Registrar activo y lanzar revisión
      </button>
    </form>
  );
};
