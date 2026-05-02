import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 md:p-10 flex items-center justify-center">
      <div className="bg-white rounded-[3rem] shadow-sm w-full max-w-[1100px] overflow-hidden grid md:grid-cols-2 min-h-[700px]">
        
        {/* Left Side: Register Info */}
        <div className="relative hidden md:block bg-slate-900 p-12 overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center gap-2 text-white">
              <div className="w-6 h-6">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9L12 4.57 20.11 9 12 13.43 3.89 9zM12 17a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">Law Consult</span>
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">Bergabung Sekarang</h1>
              <p className="text-slate-400 text-[15px] font-medium leading-relaxed max-w-sm">
                Dapatkan akses ke jaringan lawyer terbaik atau mulai berikan konsultasi profesional Anda.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Konsultasi Cepat & Aman",
                "Lawyer Terverifikasi",
                "Privasi Terjamin 100%"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/90 text-[14px] font-semibold">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </div>

        {/* Right Side: Register Form */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-900">Buat Akun Baru</h2>
            <p className="text-slate-500 text-[14px] font-medium">Sudah punya akun? <Link href="/login" className="text-[#1D64FB] font-bold hover:underline">Masuk Di Sini</Link></p>
          </div>

          <form className="space-y-5">
            {/* Role Selection */}
            <div className="space-y-3 mb-6">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Mendaftar Sebagai:</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input type="radio" name="role" id="client" className="peer absolute opacity-0" defaultChecked />
                  <label htmlFor="client" className="flex flex-col items-center justify-center p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl cursor-pointer peer-checked:border-[#1D64FB] peer-checked:bg-blue-50/50 transition duration-300">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
                    </div>
                    <span className="text-[13px] font-bold text-slate-600">Klien</span>
                  </label>
                </div>
                <div className="relative">
                  <input type="radio" name="role" id="lawyer" className="peer absolute opacity-0" />
                  <label htmlFor="lawyer" className="flex flex-col items-center justify-center p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl cursor-pointer peer-checked:border-[#1D64FB] peer-checked:bg-blue-50/50 transition duration-300">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 104.1 0h-4.1z" clipRule="evenodd"></path></svg>
                    </div>
                    <span className="text-[13px] font-bold text-slate-600">Lawyer</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Nama Depan</label>
                <input type="text" placeholder="Budi" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:border-[#1D64FB] transition" />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Nama Belakang</label>
                <input type="text" placeholder="Santoso" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:border-[#1D64FB] transition" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Email</label>
              <input type="email" placeholder="nama@email.com" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:border-[#1D64FB] transition" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:border-[#1D64FB] transition" />
            </div>

            <p className="text-[12px] text-slate-500 font-medium text-center px-4 leading-relaxed">
              Dengan mendaftar, Anda menyetujui <Link href="#" className="text-[#1D64FB] font-bold">Syarat & Ketentuan</Link> serta <Link href="#" className="text-[#1D64FB] font-bold">Kebijakan Privasi</Link> Law Consult.
            </p>

            <Button asChild className="w-full bg-[#1D64FB] hover:bg-blue-700 text-white rounded-2xl py-7 text-[15px] font-bold shadow-lg shadow-blue-500/20 transition-all mt-2">
              <Link href="/dashboard">Buat Akun Sekarang</Link>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
