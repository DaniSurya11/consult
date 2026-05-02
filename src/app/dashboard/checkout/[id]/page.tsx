"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getLawyerById } from "@/lib/lawyers-data";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const lawyer = getLawyerById(Number(params.id));
  const [isPaying, setIsPaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  // Countdown Timer
  useEffect(() => {
    if (isSuccess || isPaying) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSuccess, isPaying]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (!lawyer) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 bg-white">
        <h2 className="text-lg font-bold text-slate-700">Data tidak ditemukan</h2>
        <button onClick={() => router.push("/dashboard")} className="mt-4 text-sm font-bold text-[#1D64FB] hover:underline">Kembali ke Dashboard</button>
      </div>
    );
  }

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/chat/${lawyer.id}`);
      }, 2000);
    }, 2500);
  };

  return (
    <div className="bg-white min-h-full">
      {/* Back Navigation */}
      <div className="px-4 sm:px-8 pt-6 pb-4">
        <Button variant="ghost" onClick={() => router.back()} className="text-sm font-medium text-slate-500 hover:text-[#1D64FB] transition-colors -ml-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Kembali
        </Button>
      </div>

      <div className="px-4 sm:px-8 pb-10 max-w-5xl mx-auto">
        <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-1 tracking-tight">Checkout Pembayaran</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mb-8">Selesaikan pembayaran untuk memulai konsultasi</p>

        {/* Success Overlay */}
        {isSuccess && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-10 text-center shadow-2xl max-w-sm mx-4 animate-in fade-in zoom-in">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">Pembayaran Berhasil!</h2>
              <p className="text-sm text-slate-500">Menghubungkan Anda dengan {lawyer.name}...</p>
            </div>
          </div>
        )}

        {/* Grid Layout for One Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Order Summary */}
          <div>
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 mb-6 h-full">
              <h2 className="text-sm font-bold text-[#0F172A] mb-4 tracking-tight">Ringkasan Konsultasi</h2>
              <div className="flex gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                  <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-sm font-bold text-slate-900">{lawyer.name}</h3>
                    {lawyer.verified && (
                      <svg className="w-4 h-4 text-[#1D64FB] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.441A3 3 0 018.5 2h3a3 3 0 012.233 1.441l.73 1.22A3 3 0 0016.925 6h1.075a3 3 0 013 3v3a3 3 0 01-3 3h-1.075a3 3 0 00-2.462 1.339l-.73 1.22A3 3 0 0111.5 18h-3a3 3 0 01-2.233-1.441l-.73-1.22A3 3 0 003.075 14H2a3 3 0 01-3-3V9a3 3 0 013-3h1.075a3 3 0 002.462-1.339l.73-1.22zM8.7 10.7l-1.4-1.4a1 1 0 00-1.4 1.4l2.1 2.1c.4.4 1 .4 1.4 0l4.2-4.2a1 1 0 10-1.4-1.4L8.7 10.7z" clipRule="evenodd"></path></svg>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{lawyer.specialty} • {lawyer.experience}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Biaya Konsultasi (60 mnt)</span><span className="font-bold text-slate-800">{lawyer.price}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Biaya Platform</span><span className="font-bold text-slate-800">Rp0</span></div>
                <div className="h-px bg-slate-200 my-2"></div>
                <div className="flex justify-between"><span className="font-bold text-slate-800">Total Pembayaran</span><span className="font-black text-[#1D64FB] text-lg">{lawyer.price}</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: QRIS Payment */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-bold text-[#0F172A] tracking-tight">Metode Pembayaran</h2>
                {/* Countdown Timer */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${timeLeft < 120 ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'}`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {formatTime(timeLeft)}
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-6">Scan QRIS menggunakan aplikasi e-wallet atau mobile banking Anda</p>

              {/* QRIS Code Mockup */}
              <div className="flex flex-col items-center py-4">
                <div className="w-56 h-56 bg-white rounded-2xl border-2 border-slate-200 p-3 mb-4 relative">
                  {/* Scanning line animation */}
                  <div className="absolute left-3 right-3 h-[3px] bg-gradient-to-r from-transparent via-[#1D64FB] to-transparent rounded-full qris-scan-line z-10"></div>
                  {/* Simulated QR Pattern */}
                  <div className="w-full h-full bg-white relative overflow-hidden rounded-lg">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Corner markers */}
                      <rect x="10" y="10" width="50" height="50" rx="8" fill="none" stroke="#0F172A" strokeWidth="6"/>
                      <rect x="20" y="20" width="30" height="30" rx="4" fill="#0F172A"/>
                      <rect x="140" y="10" width="50" height="50" rx="8" fill="none" stroke="#0F172A" strokeWidth="6"/>
                      <rect x="150" y="20" width="30" height="30" rx="4" fill="#0F172A"/>
                      <rect x="10" y="140" width="50" height="50" rx="8" fill="none" stroke="#0F172A" strokeWidth="6"/>
                      <rect x="20" y="150" width="30" height="30" rx="4" fill="#0F172A"/>
                      {/* QR data pattern */}
                      {[...Array(8)].map((_, row) => (
                        [...Array(8)].map((_, col) => {
                          const show = (row + col) % 3 !== 0 && (row * 8 + col) % 2 === 0;
                          if ((row < 3 && col < 3) || (row < 3 && col > 4) || (row > 4 && col < 3)) return null;
                          return show ? <rect key={`${row}-${col}`} x={70 + col * 9} y={70 + row * 9} width="7" height="7" rx="1" fill="#0F172A"/> : null;
                        })
                      ))}
                      {/* Center logo */}
                      <rect x="85" y="85" width="30" height="30" rx="6" fill="#1D64FB"/>
                      <text x="100" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">LC</text>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-1">QRIS • Law Consult</p>
                <p className="text-lg font-black text-[#0F172A] mb-6">{lawyer.price}</p>

                {/* Pay Button */}
                <Button 
                  onClick={handlePayment}
                  disabled={isPaying || isSuccess || timeLeft === 0}
                  className="w-full bg-[#1D64FB] hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl h-12 text-sm font-bold shadow-sm transition-all"
                >
                  {isPaying ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Memproses Pembayaran...
                    </span>
                  ) : isSuccess ? (
                    "Pembayaran Berhasil ✓"
                  ) : timeLeft === 0 ? (
                    "Waktu Habis — Kembali"
                  ) : (
                    "Konfirmasi Pembayaran"
                  )}
                </Button>
                <p className="text-center text-[11px] text-slate-400 mt-3">Untuk demo, klik tombol di atas untuk simulasi pembayaran sukses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
