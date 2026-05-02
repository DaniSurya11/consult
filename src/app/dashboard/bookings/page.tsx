"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { lawyers } from "@/lib/lawyers-data";

const bookingHistory = [
  {
    id: 1,
    lawyerId: 1,
    date: "2 Mei 2026",
    time: "14:30 - 15:30",
    status: "Selesai",
    type: "Chat Online",
    rating: 5,
  },
  {
    id: 2,
    lawyerId: 3,
    date: "28 April 2026",
    time: "10:00 - 11:00",
    status: "Selesai",
    type: "Chat Online",
    rating: 4,
  },
  {
    id: 3,
    lawyerId: 2,
    date: "25 April 2026",
    time: "16:00 - 17:00",
    status: "Selesai",
    type: "Chat Online",
    rating: 5,
  },
];

export default function BookingsPage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-full px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] mb-1 tracking-tight">Riwayat Booking</h1>
          <p className="text-sm text-slate-500 font-medium">Daftar konsultasi yang pernah Anda lakukan</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-5 text-center">
          <p className="text-2xl font-black text-[#0F172A]">3</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Total Konsultasi</p>
        </div>
        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-5 text-center">
          <p className="text-2xl font-black text-[#1D64FB]">3</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Selesai</p>
        </div>
        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-5 text-center">
          <p className="text-2xl font-black text-yellow-500">4.7</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Rata-rata Rating</p>
        </div>
      </div>

      {/* Booking List */}
      <div className="space-y-3">
        {bookingHistory.map((booking) => {
          const lawyer = lawyers.find((l) => l.id === booking.lawyerId);
          if (!lawyer) return null;

          return (
            <div key={booking.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 shrink-0">
                    <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="text-sm font-bold text-[#0F172A]">{lawyer.name}</h3>
                      <svg className="w-4 h-4 text-[#1D64FB] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.441A3 3 0 018.5 2h3a3 3 0 012.233 1.441l.73 1.22A3 3 0 0016.925 6h1.075a3 3 0 013 3v3a3 3 0 01-3 3h-1.075a3 3 0 00-2.462 1.339l-.73 1.22A3 3 0 0111.5 18h-3a3 3 0 01-2.233-1.441l-.73-1.22A3 3 0 003.075 14H2a3 3 0 01-3-3V9a3 3 0 013-3h1.075a3 3 0 002.462-1.339l.73-1.22zM8.7 10.7l-1.4-1.4a1 1 0 00-1.4 1.4l2.1 2.1c.4.4 1 .4 1.4 0l4.2-4.2a1 1 0 10-1.4-1.4L8.7 10.7z" clipRule="evenodd"></path></svg>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{lawyer.specialty}</p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-6">
                  {/* Date & Time */}
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {booking.time}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className={`w-3.5 h-3.5 ${s < booking.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    ))}
                  </div>

                  {/* Status Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-green-50 text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    {booking.status}
                  </span>

                  {/* Action */}
                  <Button 
                    onClick={() => router.push(`/dashboard/lawyers/${lawyer.id}`)}
                    variant="outline" 
                    className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#1D64FB] rounded-xl h-9 px-4 text-xs font-bold shadow-none transition-colors"
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>

              {/* Mobile Date (shown on small screens) */}
              <div className="flex items-center gap-4 mt-3 sm:hidden">
                <span className="text-xs text-slate-500 font-medium">{booking.date}</span>
                <span className="text-xs text-slate-500 font-medium">{booking.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
