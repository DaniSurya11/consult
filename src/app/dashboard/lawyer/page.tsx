import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LawyerDashboard() {
  return (
    <>
      {/* Welcome Hero Card */}
      <section className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Selamat Datang, Dr. Anna! ⚖️</h1>
            <p className="text-slate-400 text-[15px] max-w-xl leading-relaxed">
              Anda memiliki 3 permintaan konsultasi baru hari ini. Pastikan untuk merespons dalam waktu 24 jam untuk menjaga rating Anda.
            </p>
          </div>
          <Button className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-full px-6 py-5 text-[14px] font-bold shrink-0">
            Mulai Sesi Online
          </Button>
        </div>
        
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D64FB]/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </section>

      {/* Grid for Stats / Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white rounded-[2rem] shadow-sm p-8 flex flex-col justify-between">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wider mb-1">Menunggu Respons</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">3</h3>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-[#1D64FB] rounded-[2rem] shadow-sm p-8 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p className="text-blue-100/80 text-[13px] font-bold uppercase tracking-wider mb-1">Pendapatan Bulan Ini</p>
            <h3 className="text-3xl font-black tracking-tight mb-1">Rp 12.500.000</h3>
            <p className="text-[12px] font-medium text-blue-200">+15% dari bulan lalu</p>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mb-10 blur-2xl"></div>
        </div>

        {/* Rating Card */}
        <div className="bg-white rounded-[2rem] shadow-sm p-8 flex flex-col justify-between">
          <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
          </div>
          <div>
            <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wider mb-1">Rating Klien</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">4.9</h3>
              <span className="text-[14px] font-bold text-slate-400">/ 5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Incoming Requests Card */}
      <section className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-sm w-full p-8 md:p-12 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Permintaan Masuk</h2>
          <Link href="#" className="text-[#1D64FB] font-bold text-[14px] hover:underline">Kelola Semua</Link>
        </div>
        
        <div className="space-y-4">
          {[
            { name: "PT. Maju Mundur", type: "Hukum Perusahaan", status: "Baru", time: "10 menit yang lalu" },
            { name: "Andi Saputra", type: "Sengketa Tanah", status: "Baru", time: "1 jam yang lalu" },
            { name: "Siti Aminah", type: "Hukum Keluarga", status: "Baru", time: "2 jam yang lalu" }
          ].map((req, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition group gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                  {req.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[15px] text-slate-900 group-hover:text-[#1D64FB] transition">{req.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[13px] font-medium text-slate-500">{req.type}</p>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <p className="text-[12px] font-bold text-slate-400">{req.time}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none rounded-xl border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold text-[13px]">
                  Tolak
                </Button>
                <Button className="flex-1 sm:flex-none rounded-xl bg-[#1D64FB] hover:bg-blue-700 text-white font-bold text-[13px]">
                  Terima & Chat
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
