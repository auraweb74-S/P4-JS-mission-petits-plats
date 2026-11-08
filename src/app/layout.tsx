import type { Metadata } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Les Petits Plats",
  description: "Découvrez des recettes simples et délicieuses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${anton.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}