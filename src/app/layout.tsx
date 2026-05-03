import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "LawConsult - Konsultasi Hukum Profesional",
  description: "Ahli hukum berpengalaman kami siap membantu Anda dengan solusi hukum yang tepat dan cepat. Platform konsultasi hukum digital terpercaya di Indonesia.",
  keywords: ["konsultasi hukum", "lawyer online", "pengacara", "hukum digital", "LawConsult"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${plusJakarta.className} ${plusJakarta.variable}`}>{children}</body>
    </html>
  );
}
