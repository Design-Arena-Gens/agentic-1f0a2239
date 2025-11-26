"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Cpu,
  Radio,
  ShieldCheck,
  Timer,
  Workflow,
} from "lucide-react";

import {
  CertificateBoard,
  type CertificateRecord,
} from "@/components/certificate-board";
import {
  CertificateForm,
  type CertificateDraft,
} from "@/components/certificate-form";
import {
  PreservationVault,
  type PreservationAsset,
} from "@/components/preservation-vault";
import { Ticker, type TickerEvent } from "@/components/ticker";

const initialCertificates: CertificateRecord[] = [
  {
    id: "ODG-2024-001",
    expediente: "RCS-2024-087",
    entidad: "Planta Hidráulica Odigo Norte",
    custodio: "Ing. Gabriela Ledesma",
    tipoActivo: "Plan maestro electromecánico",
    integridadHash:
      "a4d9c935221f88bfa82c9b7f5cc7eb9fe45c33e02f7be913d87aa12791efb1cd",
    estado: "Certificado",
    nivelPreservacion: "III",
    fecha: "2024-07-04T08:15:00Z",
  },
  {
    id: "ODG-2024-002",
    expediente: "RCS-2024-091",
    entidad: "Red de Subestaciones Pacífico",
    custodio: "Tec. Luis Carrasco",
    tipoActivo: "Informe de maniobra HV",
    integridadHash:
      "db774f3f5d8c8fcdfbde48b2dd2efc62bdc3bf98064b0ec1cd04195c6e1188a2",
    estado: "En revisión",
    nivelPreservacion: "II",
    fecha: "2024-07-04T10:45:00Z",
  },
  {
    id: "ODG-2024-003",
    expediente: "RCS-2024-096",
    entidad: "Laboratorio de Control Odigo",
    custodio: "Ing. Martín Tapia",
    tipoActivo: "Firmware PLC V5.8",
    integridadHash:
      "f12dc8a4a3e45aa74fb18af078e19300ce67ae8c87292c5dc146dd1c064f5b09",
    estado: "Observado",
    nivelPreservacion: "I",
    fecha: "2024-07-03T22:05:00Z",
  },
  {
    id: "ODG-2024-004",
    expediente: "RCS-2024-099",
    entidad: "Consorcio Energía Sur",
    custodio: "Ing. Daniela Salas",
    tipoActivo: "Contrato de mantenimiento resiliente",
    integridadHash:
      "c73cf13b6868b6b0d4e9f4a0e84662f0a5763cb5a0a9fd9a93dc09d9bacf1d37",
    estado: "Certificado",
    nivelPreservacion: "II",
    fecha: "2024-07-02T18:00:00Z",
  },
];

const initialEvents: TickerEvent[] = [
  {
    id: "evt-1",
    message: "ODG-2024-004 archivado con doble firma automática",
    timestamp: "2024-07-04T09:20:00Z",
    level: "success",
  },
  {
    id: "evt-2",
    message: "RCS-2024-091 en fase de validación eléctrica",
    timestamp: "2024-07-04T09:15:00Z",
    level: "info",
  },
  {
    id: "evt-3",
    message: "Control de firmware detectó dependencia obsoleta",
    timestamp: "2024-07-04T09:05:00Z",
    level: "warning",
  },
  {
    id: "evt-4",
    message: "Hash SHA-256 sincronizado con bóveda fría",
    timestamp: "2024-07-04T08:55:00Z",
    level: "success",
  },
];

const preservationAssets: PreservationAsset[] = [
  {
    id: "VAULT-031",
    titulo: "Registro termográfico de barras de potencia",
    responsable: "Tec. Luis Carrasco",
    criticidad: "Alta",
    controles: ["Checksum cuádruple", "Replica IPFS", "Escaneo infrarrojo"],
    ultimaVerificacion: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: "VAULT-045",
    titulo: "Bitácora de maniobra 33kV estación Sur",
    responsable: "Ing. Gabriela Ledesma",
    criticidad: "Media",
    controles: ["OCR certificado", "Firmas ECDSA", "Backups geodistribuidos"],
    ultimaVerificacion: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "VAULT-052",
    titulo: "Modelos BIM sala de control",
    responsable: "Arq. Jorge Medina",
    criticidad: "Baja",
    controles: ["Revisión trimestral", "Snapshot cadenciado", "Control CAD"],
    ultimaVerificacion: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

const automationPlaybooks = [
  {
    title: "Validación estructural multicapa",
    description:
      "Ejecuta pruebas de integridad hash, contraste de firmas y coherencia de metadatos en menos de 90 segundos.",
    icon: ShieldCheck,
  },
  {
    title: "Orquestación de preservación",
    description:
      "Replica los artefactos críticos en bóvedas calientes y frías con verificación de lectura/escritura inmediata.",
    icon: Workflow,
  },
  {
    title: "Telemetría de operación",
    description:
      "Monitorea sensores, PLCs y bitácoras operativas para detectar anomalías antes de comprometer la certificación.",
    icon: Radio,
  },
];

const heroHighlights = [
  "Trazabilidad completa certificada con sellos SHA-256",
  "Integración con PostgreSQL y Redis lista para backend industrial",
  "Panel de mando ágil para ingenieros electromecánicos",
];

export default function Home() {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [events, setEvents] = useState(initialEvents);

  const registerEvent = useCallback((event: TickerEvent) => {
    setEvents((current) => [event, ...current].slice(0, 20));
  }, []);

  const handleCreateCertificate = useCallback(
    (draft: CertificateDraft) => {
      const sequence = certificates.length + 1;
      const id = `ODG-${new Date().getFullYear()}-${sequence
        .toString()
        .padStart(3, "0")}`;

      const newRecord: CertificateRecord = {
        id,
        expediente: draft.expediente,
        entidad: draft.entidad,
        custodio: draft.custodio,
        tipoActivo: draft.tipoActivo,
        integridadHash: draft.integridadHash,
        estado: "En revisión",
        nivelPreservacion: "II",
        fecha: new Date().toISOString(),
      };

      setCertificates((prev) => [newRecord, ...prev]);
      registerEvent({
        id: `evt-${Date.now()}`,
        message: `${draft.expediente} ingresó a revisión avanzada (${draft.tipoActivo}).`,
        timestamp: new Date().toISOString(),
        level: "info",
      });
    },
    [certificates.length, registerEvent],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCertificates((prev) => {
        const targetIndex = prev.findIndex((item) => item.estado === "En revisión");

        if (targetIndex === -1) {
          return prev;
        }

        const now = new Date().toISOString();
        const target = prev[targetIndex];
        const updated: CertificateRecord = {
          ...target,
          estado: "Certificado",
          fecha: now,
        };

        const next = [...prev];
        next[targetIndex] = updated;

        registerEvent({
          id: `evt-cert-${now}`,
          message: `${updated.expediente} certificado y bloqueado en bóveda nivel ${updated.nivelPreservacion}.`,
          timestamp: now,
          level: "success",
        });

        return next;
      });
    }, 16000);

    return () => clearInterval(interval);
  }, [registerEvent]);

  const metrics = useMemo(() => {
    const total = certificates.length;
    const certified = certificates.filter((item) => item.estado === "Certificado").length;
    const inReview = certificates.filter((item) => item.estado === "En revisión").length;
    const observed = certificates.filter((item) => item.estado === "Observado").length;
    const coverage = total > 0 ? Math.round((certified / total) * 100) : 0;

    return [
      {
        title: "Activos certificados",
        value: certified.toString().padStart(2, "0"),
        detail: `${coverage}% del portafolio total`,
        icon: ShieldCheck,
        accent: "from-emerald-500/20",
      },
      {
        title: "En revisión dinámica",
        value: inReview.toString().padStart(2, "0"),
        detail: "Tiempo medio < 6h",
        icon: Timer,
        accent: "from-sky-500/20",
      },
      {
        title: "Observaciones",
        value: observed.toString().padStart(2, "0"),
        detail: "QA priorizada en tablero Kanban",
        icon: Cpu,
        accent: "from-amber-500/20",
      },
      {
        title: "Integridad verificada",
        value: "99.982%",
        detail: "Pruebas hash automatizadas 24/7",
        icon: BarChart3,
        accent: "from-purple-500/20",
      },
    ];
  }, [certificates]);

  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-14 px-6 pb-16 pt-14 sm:px-10 md:px-12 lg:px-16">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-slate-800/80 bg-slate-950/70 px-8 py-12 shadow-2xl shadow-emerald-500/10 sm:py-16">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
              ODIGO-RCS
            </span>
            <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl lg:text-5xl">
              Sistema de Certificación y Preservación Digital con telemetría
              en tiempo real.
            </h1>
            <p className="text-lg text-slate-300">
              Orquesta la trazabilidad de activos electromecánicos, documentos
              críticos y firmware operativo con cadenas de custodia confiables
              y un ticker en vivo que alerta cada cambio relevante.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {heroHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-none flex-col items-center gap-4 rounded-3xl bg-black/40 px-6 py-6 text-slate-200">
            <p className="text-sm uppercase tracking-[0.45em] text-slate-500">
              Versión 1.0.0
            </p>
            <p className="text-2xl font-semibold text-emerald-300">
              Ingeniero Electromecánico
            </p>
            <p className="text-xs text-center text-slate-400">
              Arquitectura lista para desplegar en Vercel con integraciones a
              PostgreSQL, Redis y pipelines de certificación continua.
            </p>
          </div>
        </div>
      </section>

      <Ticker events={events} />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.title}
              className={`card-border relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br ${metric.accent} to-transparent p-5`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {metric.title}
                  </p>
                  <p className="text-3xl font-semibold text-slate-50">
                    {metric.value}
                  </p>
                  <p className="text-xs text-slate-400">{metric.detail}</p>
                </div>
                <span className="rounded-2xl border border-white/10 bg-black/30 p-3 text-emerald-200">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.8fr_1.2fr]">
        <CertificateBoard data={certificates} />
        <PreservationVault assets={preservationAssets} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <CertificateForm onCreate={handleCreateCertificate} />
        <div className="card-border flex flex-col gap-6 rounded-3xl p-6">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
              Playbooks automáticos
            </p>
            <h2 className="text-lg font-semibold text-slate-100">
              Automatizaciones listas para orquestar con PM2 o Vercel CRON
            </h2>
            <p className="text-sm text-slate-400">
              Conecta PostgreSQL, Redis y agentes OPC-UA para mantener la
              certificación permanente sin intervención manual.
            </p>
          </header>

          <ul className="space-y-4">
            {automationPlaybooks.map((playbook) => {
              const Icon = playbook.icon;
              return (
                <li
                  key={playbook.title}
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="rounded-2xl border border-white/10 bg-black/40 p-3 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-100">
                        {playbook.title}
                      </p>
                      <p className="text-xs text-slate-400">
                        {playbook.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <footer className="rounded-3xl border border-slate-800/50 bg-slate-950/60 p-6 text-sm text-slate-400">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ODIGO-RCS. Arquitectura diseñada por el
            equipo de Ingeniería Electromecánica.
          </p>
          <p className="font-mono text-xs text-slate-500">
            PostgreSQL · Redis · Next.js 14 · Tailwind · Vercel Ready
          </p>
        </div>
      </footer>
    </main>
  );
}
