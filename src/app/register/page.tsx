"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const [role, setRole] = useState<"client" | "lawyer">("client");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration by saving to localStorage
    localStorage.setItem("user_role", role);
    localStorage.setItem("user_name", `${firstName} ${lastName}`.trim() || (role === "client" ? "User Baru" : "Lawyer Baru"));
    localStorage.setItem("user_email", email || "newuser@example.com");
    localStorage.setItem("is_logged_in", "true");
    
    // Redirect based on role
    router.push(role === "lawyer" ? "/dashboard/lawyer" : "/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 md:p-10 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-[3rem] shadow-sm w-full max-w-[1100px] overflow-hidden grid md:grid-cols-2 min-h-[700px]"
      >
        
        {/* Left Side: Register Info */}
        <motion.div 
          className="relative hidden md:block p-12 overflow-hidden transition-colors duration-700"
          animate={{ backgroundColor: role === "client" ? "#1D64FB" : "#0F172A" }}
        >
          <div className="relative z-10 h-full flex flex-col justify-between">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-white"
            >
              <div className="w-6 h-6">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9L12 4.57 20.11 9 12 13.43 3.89 9zM12 17a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">Law Consult</span>
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                  {role === "client" ? "Cari Solusi Hukum" : "Mulai Berpraktik"}
                </h1>
                <p className={`text-[15px] font-medium leading-relaxed max-w-sm ${role === "client" ? "text-blue-100" : "text-slate-400"}`}>
                  {role === "client" 
                    ? "Dapatkan akses ke jaringan lawyer terbaik untuk konsultasi hukum cepat dan aman." 
                    : "Bergabunglah dengan platform kami dan berikan konsultasi profesional kepada ribuan klien."}
                </p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div 
                key={role + "-list"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {(role === "client" 
                  ? ["Konsultasi Cepat & Aman", "Lawyer Terverifikasi", "Privasi Terjamin 100%"]
                  : ["Kelola Jadwal Fleksibel", "Sistem Pembayaran Escrow", "Jangkauan Klien Luas"]
                ).map((item, i) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="flex items-center gap-3 text-white/90 text-[14px] font-semibold"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${role === "client" ? "bg-white/20" : "bg-blue-500"}`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <motion.div 
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 blur-3xl"
            animate={{ backgroundColor: role === "client" ? "rgba(255,255,255,0.2)" : "rgba(59,130,246,0.2)" }}
          ></motion.div>
        </motion.div>

        {/* Right Side: Register Form */}
        <motion.div 
          layout
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="p-8 md:p-14 flex flex-col justify-center"
        >
          <motion.div layout className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-900">Buat Akun Baru</h2>
            <p className="text-slate-500 text-[14px] font-medium">Sudah punya akun? <Link href="/login" className="text-[#1D64FB] font-bold hover:underline">Masuk Di Sini</Link></p>
          </motion.div>

          <form className="space-y-5" onSubmit={handleRegister}>
            {/* Role Selection */}
            <motion.div 
              layout
              className="space-y-3 mb-6"
            >
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Mendaftar Sebagai:</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="radio" 
                    name="role" 
                    id="client" 
                    className="peer absolute opacity-0" 
                    checked={role === "client"} 
                    onChange={() => setRole("client")}
                  />
                  <motion.label 
                    layout
                    htmlFor="client" 
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-colors duration-300 ${role === "client" ? "border-[#1D64FB] bg-blue-50/50" : "bg-slate-50 border-slate-100"}`}
                  >
                    <div className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center mb-2 transition-colors ${role === "client" ? "bg-blue-100" : "bg-white"}`}>
                      <svg className={`w-4 h-4 transition-colors ${role === "client" ? "text-[#1D64FB]" : "text-slate-400"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
                    </div>
                    <span className={`text-[13px] font-bold transition-colors ${role === "client" ? "text-[#1D64FB]" : "text-slate-600"}`}>Klien</span>
                  </motion.label>
                </div>
                <div className="relative">
                  <input 
                    type="radio" 
                    name="role" 
                    id="lawyer" 
                    className="peer absolute opacity-0" 
                    checked={role === "lawyer"} 
                    onChange={() => setRole("lawyer")}
                  />
                  <motion.label 
                    layout
                    htmlFor="lawyer" 
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-colors duration-300 ${role === "lawyer" ? "border-slate-900 bg-slate-900/5" : "bg-slate-50 border-slate-100"}`}
                  >
                    <div className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center mb-2 transition-colors ${role === "lawyer" ? "bg-slate-200" : "bg-white"}`}>
                      <svg className={`w-4 h-4 transition-colors ${role === "lawyer" ? "text-slate-900" : "text-slate-400"}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 104.1 0h-4.1z" clipRule="evenodd"></path></svg>
                    </div>
                    <span className={`text-[13px] font-bold transition-colors ${role === "lawyer" ? "text-slate-900" : "text-slate-600"}`}>Lawyer</span>
                  </motion.label>
                </div>
              </div>
            </motion.div>

            <motion.div 
              layout
              className="grid grid-cols-2 gap-4"
              transition={{ layout: { duration: 0.4 } }}
            >
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Nama Depan</label>
                <input 
                  type="text" 
                  placeholder="Budi" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:ring-2 transition ${role === 'lawyer' ? 'focus:ring-slate-900/10 focus:border-slate-900' : 'focus:ring-[#1D64FB]/20 focus:border-[#1D64FB]'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Nama Belakang</label>
                <input 
                  type="text" 
                  placeholder="Santoso" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:ring-2 transition ${role === 'lawyer' ? 'focus:ring-slate-900/10 focus:border-slate-900' : 'focus:ring-[#1D64FB]/20 focus:border-[#1D64FB]'}`}
                />
              </div>
            </motion.div>

            {/* Lawyer Degree Field - Conditional */}
            <AnimatePresence mode="popLayout">
              {role === "lawyer" && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ 
                    opacity: { duration: 0.2 },
                    height: { duration: 0.4, ease: "easeOut" },
                    y: { duration: 0.4 }
                  }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Gelar Akademik</label>
                  <input 
                    type="text" 
                    placeholder="S.H., M.H." 
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition" 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              layout
              className="space-y-2"
              transition={{ layout: { duration: 0.4 } }}
            >
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                placeholder="nama@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:ring-2 transition ${role === 'lawyer' ? 'focus:ring-slate-900/10 focus:border-slate-900' : 'focus:ring-[#1D64FB]/20 focus:border-[#1D64FB]'}`}
              />
            </motion.div>
            
            <motion.div 
              layout
              className="space-y-2"
              transition={{ layout: { duration: 0.4 } }}
            >
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <input type="password" placeholder="••••••••" className={`w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:ring-2 transition ${role === 'lawyer' ? 'focus:ring-slate-900/10 focus:border-slate-900' : 'focus:ring-[#1D64FB]/20 focus:border-[#1D64FB]'}`} />
            </motion.div>

            <motion.p 
              layout
              className="text-[12px] text-slate-500 font-medium text-center px-4 leading-relaxed"
              transition={{ layout: { duration: 0.4 } }}
            >
              Dengan mendaftar, Anda menyetujui <Link href="#" className="text-[#1D64FB] font-bold">Syarat &amp; Ketentuan</Link> serta <Link href="#" className="text-[#1D64FB] font-bold">Kebijakan Privasi</Link> Law Consult.
            </motion.p>

            <motion.div layout transition={{ layout: { duration: 0.4 } }}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className={`w-full text-white rounded-2xl py-7 text-[15px] font-bold shadow-lg transition-all mt-2 ${role === "lawyer" ? "bg-slate-900 hover:bg-slate-800 shadow-slate-900/20" : "bg-[#1D64FB] hover:bg-blue-700 shadow-blue-500/20"}`}>
                  Buat Akun Sekarang
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
