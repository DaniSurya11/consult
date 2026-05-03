"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getLawyerById } from "@/lib/lawyers-data";

export default function LawyerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const lawyer = getLawyerById(Number(params.id));

  if (!lawyer) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 bg-white">
        <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>
        <h2 className="text-lg font-bold text-slate-700">Lawyer tidak ditemukan</h2>
        <button onClick={() => router.push("/dashboard")} className="mt-4 text-sm font-bold text-[#1D64FB] hover:underline">Kembali ke Dashboard</button>
      </div>
    );
  }

  const dummyReviews = [
    { name: "Andi Wirawan", date: "2 minggu lalu", rating: 5, text: "Sangat profesional dan responsif. Masalah hukum saya diselesaikan dengan cepat dan tepat." },
    { name: "Maya Sari", date: "1 bulan lalu", rating: 5, text: "Penjelasannya sangat mudah dipahami. Rekomendasi langkah hukum yang diberikan sangat membantu." },
    { name: "Budi Santoso", date: "2 bulan lalu", rating: 4, text: "Konsultasi berjalan lancar dan informatif. Lawyer sangat menguasai bidangnya." },
  ];

  return (
    <div className="bg-white min-h-full">
      {/* Back Navigation */}
      <div className="px-4 sm:px-8 pt-6 pb-4">
        <Button variant="ghost" onClick={() => router.back()} className="text-sm font-medium text-slate-500 hover:text-[#1D64FB] transition-colors -ml-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Kembali
        </Button>
      </div>

      <div className="px-4 sm:px-8 pb-10">
        {/* Profile Header Card */}
        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">{lawyer.name}</h1>
                {lawyer.verified && (
                  <svg className="w-5 h-5 text-[#1D64FB] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.441A3 3 0 018.5 2h3a3 3 0 012.233 1.441l.73 1.22A3 3 0 0016.925 6h1.075a3 3 0 013 3v3a3 3 0 01-3 3h-1.075a3 3 0 00-2.462 1.339l-.73 1.22A3 3 0 0111.5 18h-3a3 3 0 01-2.233-1.441l-.73-1.22A3 3 0 003.075 14H2a3 3 0 01-3-3V9a3 3 0 013-3h1.075a3 3 0 002.462-1.339l.73-1.22zM8.7 10.7l-1.4-1.4a1 1 0 00-1.4 1.4l2.1 2.1c.4.4 1 .4 1.4 0l4.2-4.2a1 1 0 10-1.4-1.4L8.7 10.7z" clipRule="evenodd"></path></svg>
                )}
                <span className={`ml-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${lawyer.status === "Online" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${lawyer.status === "Online" ? "bg-green-500" : "bg-slate-400"}`}></span>
                  {lawyer.status}
                </span>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-3">{lawyer.specialty} • {lawyer.experience}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <span className="text-sm font-bold text-yellow-500">{lawyer.rating}</span>
                  <span className="text-xs text-slate-500">({lawyer.reviews} ulasan)</span>
                </div>
                <div className="h-4 w-px bg-slate-200"></div>
                <span className="text-xs text-slate-500 font-medium">200+ konsultasi selesai</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {lawyer.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-500">{tag}</span>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="shrink-0 flex flex-col items-end justify-between">
              <div className="text-right mb-4">
                <p className="text-[11px] text-slate-500 font-medium">Mulai dari</p>
                <p className="text-xl font-black text-[#0F172A]">{lawyer.price} <span className="text-xs font-medium text-slate-500">/ sesi</span></p>
              </div>
              <Button 
                onClick={() => router.push(`/dashboard/checkout/${lawyer.id}`)}
                className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-11 px-8 text-sm font-bold shadow-sm transition-all"
              >
                Mulai Konsultasi
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - About & Education */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-[#0F172A] mb-3 tracking-tight">Tentang</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{lawyer.bio}</p>
            </div>

            {/* Education & License */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-[#0F172A] mb-4 tracking-tight">Pendidikan & Lisensi</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#1D64FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{lawyer.education}</p>
                    <p className="text-xs text-slate-500">Pendidikan Terakhir</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{lawyer.license}</p>
                    <p className="text-xs text-slate-500">Nomor Lisensi Advokat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-bold text-[#0F172A] mb-4 tracking-tight">Ulasan Klien</h2>
              <div className="space-y-4">
                {dummyReviews.map((review, i) => (
                  <div key={i} className={`${i < dummyReviews.length - 1 ? "pb-4 border-b border-slate-100" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">{review.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{review.name}</p>
                          <p className="text-[11px] text-slate-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <svg key={s} className={`w-3.5 h-3.5 ${s < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-6">
              <h3 className="text-sm font-bold text-[#0F172A] mb-4 tracking-tight">Jadwalkan Konsultasi</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Biaya Konsultasi</span>
                  <span className="font-bold text-[#0F172A]">{lawyer.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Durasi Sesi</span>
                  <span className="font-bold text-[#0F172A]">60 menit</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Metode</span>
                  <span className="font-bold text-[#0F172A]">Chat Online</span>
                </div>
                <div className="h-px bg-slate-100"></div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-700">Total</span>
                  <span className="font-black text-[#1D64FB] text-base">{lawyer.price}</span>
                </div>
              </div>
              <Button 
                onClick={() => router.push(`/dashboard/checkout/${lawyer.id}`)}
                className="w-full bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-11 text-sm font-bold shadow-sm transition-all"
              >
                Mulai Konsultasi Sekarang
              </Button>
              <p className="text-center text-[11px] text-slate-400 mt-3">Pembayaran aman & terenkripsi</p>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-[#0F172A] mb-4 tracking-tight">Statistik</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#F8FAFC] rounded-xl">
                  <p className="text-lg font-black text-[#0F172A]">200+</p>
                  <p className="text-[11px] text-slate-500 font-medium">Konsultasi</p>
                </div>
                <div className="text-center p-3 bg-[#F8FAFC] rounded-xl">
                  <p className="text-lg font-black text-[#0F172A]">98%</p>
                  <p className="text-[11px] text-slate-500 font-medium">Kepuasan</p>
                </div>
                <div className="text-center p-3 bg-[#F8FAFC] rounded-xl">
                  <p className="text-lg font-black text-[#0F172A]">&lt;5 mnt</p>
                  <p className="text-[11px] text-slate-500 font-medium">Respon</p>
                </div>
                <div className="text-center p-3 bg-[#F8FAFC] rounded-xl">
                  <p className="text-lg font-black text-[#0F172A]">{lawyer.rating}</p>
                  <p className="text-[11px] text-slate-500 font-medium">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
