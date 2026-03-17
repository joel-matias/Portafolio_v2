import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joel Matias — Full-Stack Developer",
  description:
    "Desarrollador Full-Stack especializado en Laravel y Next.js. Construyo aplicaciones web modernas, escalables y con excelente UX.",
  keywords: ["Joel Matias", "Full-Stack Developer", "Laravel", "Next.js", "PHP", "TypeScript"],
  authors: [{ name: "Joel Matias" }],
  openGraph: {
    title: "Joel Matias — Full-Stack Developer",
    description: "Desarrollador Full-Stack especializado en Laravel y Next.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${syne.variable} ${inter.variable} noise`}
        style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
      >
        {children}
      </body>
    </html>
  );
}
