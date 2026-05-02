"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 md:p-10 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-[3rem] shadow-sm w-full max-w-[1100px] overflow-hidden grid md:grid-cols-2 min-h-[600px]"
      >
        
        {/* Left Side: Visual Branding */}
        <div className="relative hidden md:block bg-[#1D64FB] p-12 overflow-hidden">
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
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">Selamat Datang Kembali</h1>
              <p className="text-blue-100 text-[15px] font-medium leading-relaxed max-w-sm">
                Masuk untuk melanjutkan konsultasi hukum Anda dengan lawyer profesional terbaik.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-3">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-white/80 text-[13px] font-medium">+1,200 Lawyer Terverifikasi</p>
            </motion.div>
          </div>
          
          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
        </div>

        {/* Right Side: Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="p-8 md:p-16 flex flex-col justify-center"
        >
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-900">Masuk</h2>
            <p className="text-slate-500 text-[14px] font-medium">Belum punya akun? <Link href="/register" className="text-[#1D64FB] font-bold hover:underline">Daftar Sekarang</Link></p>
          </div>

          <form className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                placeholder="nama@email.com"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1D64FB]/20 focus:border-[#1D64FB] transition"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <Link href="#" className="text-[12px] font-bold text-[#1D64FB] hover:underline">Lupa Password?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1D64FB]/20 focus:border-[#1D64FB] transition"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 pt-2"
            >
              <input type="checkbox" id="remember" className="w-4 h-4 rounded-md accent-[#1D64FB]" />
              <label htmlFor="remember" className="text-[13px] text-slate-600 font-medium cursor-pointer">Ingat saya di perangkat ini</label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild className="w-full bg-[#1D64FB] hover:bg-blue-700 text-white rounded-2xl py-7 text-[15px] font-bold shadow-lg shadow-blue-500/20 transition-all mt-4">
                  <Link href="/dashboard">Masuk ke Dashboard</Link>
                </Button>
              </motion.div>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="mt-10 flex items-center gap-4">
              <div className="flex-grow h-[1px] bg-slate-100"></div>
              <span className="text-[12px] text-slate-400 font-bold uppercase tracking-widest">Atau</span>
              <div className="flex-grow h-[1px] bg-slate-100"></div>
            </div>

            <div className="mt-8">
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition font-semibold text-[14px]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Masuk dengan Google
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
