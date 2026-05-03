"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ActiveConsultationPage() {
  const router = useRouter();
  const [role, setRole] = useState("client");
  const [activeBookings, setActiveBookings] = useState<any[]>([]);
  const [toast, setToast] = useState<{show: boolean, message: string}>({ show: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("user_role") || "client";
    setRole(storedRole);
    
    const loadBookings = () => {
      const saved = localStorage.getItem("bookings");
      if (saved) {
        const all = JSON.parse(saved);
        // Filter out completed and rejected
        const active = all.filter((b: any) => 
          b.status === "pending" || 
          b.status === "accepted" || 
          b.status === "client_ready"
        );
        
        // If lawyer, filter by their ID (mock using all for now since it's demo)
        // If client, show all their bookings
        setActiveBookings(active);
      }
      setIsLoading(false);
    };

    loadBookings();
    const interval = setInterval(loadBookings, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLawyerAction = (id: number, action: "accepted" | "rejected") => {
    const saved = localStorage.getItem("bookings");
    if (saved) {
      const all = JSON.parse(saved);
      const updated = all.map((b: any) => b.id === id ? { ...b, status: action } : b);
      localStorage.setItem("bookings", JSON.stringify(updated));
      if (action === "accepted") {
        setToast({ show: true, message: "Berhasil menerima konsultasi. Menunggu klien masuk ke ruang chat." });
      } else {
        setToast({ show: true, message: "Konsultasi ditolak." });
      }
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
    }
  };

  const handleClientEnterChat = (id: number, lawyerId: number) => {
    const saved = localStorage.getItem("bookings");
    if (saved) {
      const all = JSON.parse(saved);
      const updated = all.map((b: any) => b.id === id ? { ...b, status: "client_ready" } : b);
      localStorage.setItem("bookings", JSON.stringify(updated));
    }
    router.push(`/dashboard/chat/${lawyerId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
        <div>
          <div className="h-7 w-48 bg-slate-100 rounded-lg mb-2 animate-pulse"></div>
          <div className="h-4 w-72 bg-slate-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <div className="h-5 w-40 bg-slate-100 rounded-lg animate-pulse"></div>
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 shrink-0 animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 w-1/3 bg-slate-100 rounded-lg animate-pulse"></div>
                <div className="h-4 w-1/4 bg-slate-100 rounded-lg animate-pulse"></div>
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-4">
                  <div className="h-3 w-24 bg-slate-100 rounded-lg animate-pulse"></div>
                  <div className="space-y-4 pl-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-4 w-1/2 bg-slate-100 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const pendingCount = activeBookings.filter(b => b.status === "pending").length;
  const acceptedCount = activeBookings.filter(b => b.status === "accepted" || b.status === "client_ready").length;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Konsultasi Aktif</h1>
        <p className="text-sm text-slate-500 font-medium">
          {role === "lawyer" 
            ? "Kelola permintaan masuk dan sesi yang sedang berjalan."
            : "Pantau status konsultasi Anda dan masuk ke ruang chat."}
        </p>
      </div>

      {activeBookings.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
            <svg className="w-12 h-12 text-[#1D64FB] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Konsultasi Aktif</h2>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mb-8">
            {role === "lawyer" ? "Belum ada permintaan konsultasi baru." : "Anda belum memiliki sesi konsultasi aktif."}
          </p>
          {role === "client" && (
            <Button onClick={() => router.push("/dashboard/lawyers")} className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-11 px-8 text-sm font-bold shadow-sm">
              Cari Lawyer
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Lawyer: Pending Requests */}
          {role === "lawyer" && pendingCount > 0 && (
            <Card className="border-2 border-yellow-200 shadow-sm shadow-yellow-100 bg-white rounded-[2rem] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></div>
                  <CardTitle className="text-[15px] font-bold text-slate-900">Permintaan Baru ({pendingCount})</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeBookings.filter(b => b.status === "pending").map((booking) => (
                  <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-yellow-50/50 rounded-xl border border-yellow-100">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-[#1D64FB] flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {booking.clientName?.charAt(0) || "A"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-slate-900">{booking.clientName || "Ahmad Rizky"}</p>
                        <p className="text-[11px] text-slate-500">{booking.lawyerSpecialty} • {booking.price}</p>
                        <p className="text-[10px] text-yellow-600 font-bold mt-0.5">⏱️ Menunggu respon Anda</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                      <Button onClick={() => handleLawyerAction(booking.id, "rejected")} variant="outline" className="flex-1 sm:flex-none border-red-200 text-red-600 hover:bg-red-50 rounded-xl h-9 text-xs font-bold px-4">
                        Tolak
                      </Button>
                      <Button onClick={() => handleLawyerAction(booking.id, "accepted")} className="flex-1 sm:flex-none bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-9 text-xs font-bold px-5 shadow-sm">
                        Terima
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Client: Pending Requests */}
          {role === "client" && pendingCount > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></span>
                Menunggu Konfirmasi Lawyer
              </h2>
              {activeBookings.filter(b => b.status === "pending").map((booking) => (
                <div key={booking.id} className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-100 shrink-0">
                      <img src={booking.lawyerImg} alt={booking.lawyerName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-slate-900">{booking.lawyerName}</h3>
                      <p className="text-[12px] text-slate-500">{booking.lawyerSpecialty}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Component */}
                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">Status Progres</h4>
                    <div className="relative border-l-2 border-slate-100 ml-2.5 space-y-6">
                      
                      <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-green-500 border-green-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <p className="text-[13px] font-bold text-slate-700 -mt-0.5">Pembayaran Sukses</p>
                        <p className="text-[11px] text-slate-400">Dana diamankan di Escrow</p>
                      </div>

                      <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white border-[#1D64FB] ring-4 ring-blue-50 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-[#1D64FB] rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-[13px] font-bold text-[#1D64FB] -mt-0.5">Konfirmasi Lawyer</p>
                        <p className="text-[11px] text-[#1D64FB]/70">Lawyer sedang meninjau kasus Anda</p>
                      </div>

                      <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white border-slate-200"></div>
                        <p className="text-[13px] font-bold text-slate-400 -mt-0.5">Sesi Chat Berlangsung</p>
                      </div>

                      <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white border-slate-200"></div>
                        <p className="text-[13px] font-bold text-slate-400 -mt-0.5">Konsultasi Selesai</p>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ongoing/Accepted */}
          {acceptedCount > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                Sesi Disetujui & Berjalan
              </h2>
              {activeBookings.filter(b => b.status === "accepted" || b.status === "client_ready").map((booking) => (
                <div key={booking.id} className="bg-white rounded-[2rem] border-2 border-green-200 p-6 shadow-sm shadow-green-100">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      {role === "client" ? (
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-100 shrink-0">
                          <img src={booking.lawyerImg} alt={booking.lawyerName} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-[#1D64FB] flex items-center justify-center text-white font-bold text-xl shrink-0">
                          {booking.clientName?.charAt(0) || "A"}
                        </div>
                      )}
                      <div>
                        <h3 className="text-[15px] font-bold text-slate-900">
                          {role === "client" ? booking.lawyerName : booking.clientName || "Ahmad Rizky"}
                        </h3>
                        {role === "client" ? (
                          <p className="text-[12px] text-green-600 font-bold mt-0.5">✅ Booking Anda Diterima</p>
                        ) : (
                          <p className="text-[12px] text-green-600 font-bold mt-0.5">
                            {booking.status === "client_ready" ? "💬 Klien sudah masuk chat" : "⏳ Menunggu Klien..."}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full sm:w-auto shrink-0">
                      {role === "client" ? (
                        <Button 
                          onClick={() => handleClientEnterChat(booking.id, booking.lawyerId)}
                          className={`w-full sm:w-auto ${booking.status === "client_ready" ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-[#1D64FB] text-white hover:bg-blue-700 animate-pulse"} rounded-xl h-11 px-6 text-[13px] font-bold shadow-sm`}
                        >
                          {booking.status === "client_ready" ? "Kembali ke Chat" : "Masuk Ruang Chat →"}
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => router.push(`/dashboard/chat/${booking.lawyerId}`)}
                          disabled={booking.status !== "client_ready"}
                          className={`w-full sm:w-auto ${booking.status === "client_ready" ? "bg-[#1D64FB] text-white hover:bg-blue-700 animate-bounce" : "bg-slate-100 text-slate-400 cursor-not-allowed"} rounded-xl h-11 px-6 text-[13px] font-bold`}
                        >
                          {booking.status === "client_ready" ? "Masuk Ruang Chat" : "Menunggu Klien"}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Timeline Component untuk Client */}
                  {role === "client" && (
                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">Status Progres</h4>
                      <div className="relative border-l-2 border-slate-100 ml-2.5 space-y-6">
                        
                        <div className="relative pl-6">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-green-500 border-green-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                          <p className="text-[13px] font-bold text-slate-700 -mt-0.5">Pembayaran Sukses</p>
                        </div>

                        <div className="relative pl-6">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-green-500 border-green-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                          <p className="text-[13px] font-bold text-slate-700 -mt-0.5">Konfirmasi Lawyer</p>
                        </div>

                        <div className="relative pl-6">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white border-[#1D64FB] ring-4 ring-blue-50 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-[#1D64FB] rounded-full animate-pulse"></div>
                          </div>
                          <p className="text-[13px] font-bold text-[#1D64FB] -mt-0.5">Sesi Chat Berlangsung</p>
                          <p className="text-[11px] text-[#1D64FB]/70">Lawyer siap mendengarkan masalah Anda</p>
                        </div>

                        <div className="relative pl-6">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white border-slate-200"></div>
                          <p className="text-[13px] font-bold text-slate-400 -mt-0.5">Konsultasi Selesai</p>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white border border-green-200 rounded-xl shadow-lg p-4 flex items-start gap-3 w-80">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">Notifikasi</h4>
              <p className="text-[12px] text-slate-500 mt-0.5">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
