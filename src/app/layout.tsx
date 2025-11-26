import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-1f0a2239.vercel.app"),
  title: "ODIGO-RCS | Sistema de Certificación Digital",
  description:
    "ODIGO-RCS es una plataforma para la certificación, preservación y monitoreo en tiempo real de activos críticos.",
  keywords: [
    "certificación digital",
    "preservación",
    "ticker en tiempo real",
    "electromecánica",
    "ODIGO-RCS",
  ],
  authors: [{ name: "Ingeniero Electromecánico" }],
  openGraph: {
    title: "ODIGO-RCS | Sistema de Certificación y Preservación",
    description:
      "Gestione la trazabilidad de activos, certificados y bitácoras en tiempo real con el sistema ODIGO-RCS.",
    url: "https://agentic-1f0a2239.vercel.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
