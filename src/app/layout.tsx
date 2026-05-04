import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Law Consult",
    default: "Law Consult - Platform Konsultasi Hukum Profesional",
  },
  description: "Dapatkan solusi hukum cepat dan terpercaya dengan lawyer profesional terverifikasi secara online. Chat, Video Call, dan urus dokumen legalitas dengan mudah.",
  keywords: ["konsultasi hukum", "lawyer online", "pengacara", "hukum bisnis", "hukum pidana", "hukum perdata", "Law Consult"],
  openGraph: {
    title: "Law Consult - Konsultasi Hukum Profesional",
    description: "Dapatkan solusi hukum cepat dan terpercaya dengan lawyer profesional terverifikasi secara online.",
    url: "https://lawconsult.id",
    siteName: "Law Consult",
    images: [
      {
        url: "https://lawconsult.id/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Consult - Konsultasi Hukum Profesional",
    description: "Dapatkan solusi hukum cepat dan terpercaya dengan lawyer profesional terverifikasi secara online.",
    images: ["https://lawconsult.id/twitter-image.png"],
  },
  authors: [{ name: "Law Consult Team", url: "https://lawconsult.id/about" }],
  metadataBase: new URL("https://lawconsult.id"),
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
