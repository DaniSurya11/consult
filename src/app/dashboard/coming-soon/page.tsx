"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ComingSoonPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      {/* Animated Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#1D64FB] to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
        </div>
        {/* Floating dots */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
        <div className="absolute top-1 -left-4 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
      </div>

      <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-2">Segera Hadir</h1>
      <p className="text-sm text-slate-500 font-medium max-w-md mb-2">
        Fitur ini sedang dalam tahap optimalisasi pro. Tim kami bekerja keras untuk menghadirkan pengalaman terbaik untuk Anda.
      </p>
      <p className="text-xs text-slate-400 font-medium mb-8">Estimasi: Q3 2026</p>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <div className="h-full w-3/5 bg-gradient-to-r from-[#1D64FB] to-blue-400 rounded-full" style={{ animation: "pulse 2s ease-in-out infinite" }}></div>
      </div>

      <Button onClick={() => router.back()} variant="outline" className="rounded-xl h-10 px-6 text-sm font-bold text-slate-700 border-slate-200 hover:border-[#1D64FB] hover:text-[#1D64FB]">
        ← Kembali
      </Button>
    </div>
  );
}
