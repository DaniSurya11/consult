"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Booking {
  id: number;
  lawyerId: number;
  lawyerName: string;
  lawyerImg: string;
  lawyerSpecialty: string;
  clientName: string;
  price: string;
  status: "pending" | "accepted" | "client_ready" | "rejected" | "completed";
  createdAt: string;
}

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "info" }>({ show: false, message: "", type: "info" });

  // Load and poll bookings from localStorage
  useEffect(() => {
    const loadBookings = () => {
      const saved = localStorage.getItem("bookings");
      if (saved) {
        setBookings(JSON.parse(saved));
      }
    };
    loadBookings();
    setIsLoading(false);

    // Polling every 2 seconds for status changes
    const interval = setInterval(() => {
      const saved = localStorage.getItem("bookings");
      if (saved) {
        const current = JSON.parse(saved) as Booking[];
        setBookings(prev => {
          // Check if any booking status changed to "accepted"
          for (const booking of current) {
            const old = prev.find(b => b.id === booking.id);
            if (old && old.status === "pending" && booking.status === "accepted") {
              setToast({ show: true, message: `Booking Diterima oleh ${booking.lawyerName}! 🎉`, type: "success" });
              setTimeout(() => setToast({ show: false, message: "", type: "info" }), 5000);
            }
          }
          return current;
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending": return { label: "Menunggu Konfirmasi", color: "bg-yellow-50 text-yellow-600 border-yellow-200", dot: "bg-yellow-500", icon: "⏳" };
      case "accepted": return { label: "Diterima", color: "bg-green-50 text-green-600 border-green-200", dot: "bg-green-500", icon: "✅" };
      case "client_ready": return { label: "Menunggu Lawyer", color: "bg-blue-50 text-blue-600 border-blue-200", dot: "bg-blue-500", icon: "💬" };
      case "rejected": return { label: "Ditolak", color: "bg-red-50 text-red-500 border-red-200", dot: "bg-red-500", icon: "❌" };
      case "completed": return { label: "Selesai", color: "bg-slate-50 text-slate-500 border-slate-200", dot: "bg-slate-400", icon: "📋" };
      default: return { label: status, color: "bg-slate-50 text-slate-500 border-slate-200", dot: "bg-slate-400", icon: "📋" };
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 space-y-4 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-slate-100 rounded-xl"></div>
          {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Riwayat Booking</h1>
        <p className="text-sm text-slate-500 font-medium">Pantau status konsultasi Anda</p>
      </div>

      {/* Booking List */}
      {bookings.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className="text-lg font-bold text-slate-700 mb-1">Belum ada booking</h2>
          <p className="text-sm text-slate-500 mb-6">Mulai dengan mencari lawyer dan melakukan booking konsultasi.</p>
          <Button onClick={() => router.push("/dashboard")} className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-10 px-6 text-sm font-bold">
            Cari Lawyer
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {[...bookings].reverse().map((booking) => {
            const statusConfig = getStatusConfig(booking.status);
            return (
              <div key={booking.id} className={`bg-white rounded-2xl border p-5 transition-all ${booking.status === "pending" ? "border-yellow-200 shadow-sm shadow-yellow-100" : (booking.status === "accepted" || booking.status === "client_ready") ? "border-green-200 shadow-sm shadow-green-100" : "border-slate-200 shadow-sm"}`}>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Lawyer Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-100 shrink-0">
                      <img src={booking.lawyerImg} alt={booking.lawyerName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-[15px] font-bold text-slate-900 truncate">{booking.lawyerName}</h3>
                        <svg className="w-4 h-4 text-[#1D64FB] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.441A3 3 0 018.5 2h3a3 3 0 012.233 1.441l.73 1.22A3 3 0 0016.925 6h1.075a3 3 0 013 3v3a3 3 0 01-3 3h-1.075a3 3 0 00-2.462 1.339l-.73 1.22A3 3 0 0111.5 18h-3a3 3 0 01-2.233-1.441l-.73-1.22A3 3 0 003.075 14H2a3 3 0 01-3-3V9a3 3 0 013-3h1.075a3 3 0 002.462-1.339l.73-1.22zM8.7 10.7l-1.4-1.4a1 1 0 00-1.4 1.4l2.1 2.1c.4.4 1 .4 1.4 0l4.2-4.2a1 1 0 10-1.4-1.4L8.7 10.7z" clipRule="evenodd"></path></svg>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{booking.lawyerSpecialty}</p>
                      <p className="text-xs text-slate-400 mt-1">{new Date(booking.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} ${booking.status === "pending" ? "animate-pulse" : ""}`}></span>
                      {statusConfig.label}
                    </div>
                    <p className="text-sm font-black text-slate-900">{booking.price}</p>
                  </div>
                </div>

                {/* Pending State: Waiting message */}
                {booking.status === "pending" && (
                  <div className="mt-4 pt-4 border-t border-yellow-100">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50/50 rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                        <span className="text-sm">⏳</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-yellow-700">Menunggu Konfirmasi Lawyer...</p>
                        <p className="text-[11px] text-yellow-600/80 mt-0.5">Lawyer Anda sedang meninjau permintaan. Mohon tunggu notifikasi.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Accepted State: Enter Chat button */}
                {booking.status === "accepted" && (
                  <div className="mt-4 pt-4 border-t border-green-100">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <span className="text-sm">✅</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-green-700">Booking Anda telah diterima!</p>
                          <p className="text-[11px] text-green-600/80 mt-0.5">Silakan masuk ke ruang chat untuk memulai konsultasi.</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => {
                          const saved = localStorage.getItem("bookings");
                          if (saved) {
                            const all = JSON.parse(saved);
                            const updated = all.map((b: any) => b.id === booking.id ? { ...b, status: "client_ready" } : b);
                            localStorage.setItem("bookings", JSON.stringify(updated));
                          }
                          router.push(`/dashboard/chat/${booking.lawyerId}`);
                        }}
                        className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-10 px-6 text-[13px] font-bold shadow-sm animate-pulse w-full sm:w-auto"
                      >
                        Masuk Ruang Chat →
                      </Button>
                    </div>
                  </div>
                )}
                {/* Client Ready State */}
                {booking.status === "client_ready" && (
                  <div className="mt-4 pt-4 border-t border-blue-100">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <span className="text-sm">💬</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-blue-700">Menunggu lawyer memasuki ruang chat.</p>
                          <p className="text-[11px] text-blue-600/80 mt-0.5">Anda dapat masuk kembali ke ruang chat kapan saja.</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => router.push(`/dashboard/chat/${booking.lawyerId}`)}
                        variant="outline"
                        className="border-blue-200 text-[#1D64FB] hover:bg-blue-50 rounded-xl h-10 px-6 text-[13px] font-bold shadow-sm w-full sm:w-auto"
                      >
                        Masuk Ulang →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Rejected State */}
                {booking.status === "rejected" && (
                  <div className="mt-4 pt-4 border-t border-red-100">
                    <div className="flex items-center gap-3 p-3 bg-red-50/50 rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <span className="text-sm">❌</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-red-600">Booking ditolak oleh Lawyer.</p>
                        <p className="text-[11px] text-red-500/80 mt-0.5">Dana Anda akan dikembalikan secara otomatis (Simulasi Refund).</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white border border-green-200 rounded-xl shadow-lg p-4 flex items-start gap-3 w-80">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">Kabar Baik!</h4>
              <p className="text-[12px] text-slate-500 mt-0.5">{toast.message}</p>
            </div>
            <button onClick={() => setToast({ ...toast, show: false })} className="text-slate-400 hover:text-slate-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
