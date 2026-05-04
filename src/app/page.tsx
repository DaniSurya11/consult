"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("is_logged_in") === "true");
    setUserRole(localStorage.getItem("user_role") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    setIsLoggedIn(false);
    setUserRole("");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 overflow-x-hidden font-sans p-3 sm:p-4 md:p-6 flex flex-col gap-3 sm:gap-4 md:gap-6 items-center relative">
      {/* Navbar Card */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-[2rem] shadow-sm w-full max-w-[1300px] z-50 relative"
      >
        <header className="px-5 md:px-6 py-4 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 text-[#0F172A]">
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9L12 4.57 20.11 9 12 13.43 3.89 9zM12 17a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"></path>
              </svg>
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-[#0F172A]">Law Consult</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 text-[14px] font-semibold text-slate-600">
            <Link href="#home" className="hover:text-slate-900 transition">Beranda</Link>
            <Link href="#services" className="hover:text-slate-900 transition">Layanan</Link>
            <Link href="#how-it-works" className="hover:text-slate-900 transition">Cara Kerja</Link>
            <Link href="#about" className="hover:text-slate-900 transition">Tentang</Link>
            <Link href="#team" className="hover:text-slate-900 transition">Tim Lawyer</Link>
            <Link href="#reviews" className="hover:text-slate-900 transition">Ulasan</Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="text-[14px] font-semibold text-slate-600 hover:text-slate-900 transition">
                  Login
                </Link>
                <Link href="/register" className="px-5 py-2.5 bg-[#1D64FB] text-white rounded-full text-[14px] font-semibold hover:bg-blue-700 transition shadow-sm whitespace-nowrap">
                  Mulai Konsultasi
                </Link>
              </>
            ) : (
              <>
                <button onClick={handleLogout} className="text-[14px] font-semibold text-slate-600 hover:text-slate-900 transition">
                  Keluar
                </button>
                <Link href={userRole === "lawyer" ? "/dashboard/lawyer" : "/dashboard"} className="px-5 py-2.5 bg-[#1D64FB] text-white rounded-full text-[14px] font-semibold hover:bg-blue-700 transition shadow-sm whitespace-nowrap">
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-slate-900 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </header>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white rounded-b-[2rem] shadow-xl border-t border-slate-100 p-6 flex flex-col gap-6 z-50 mt-1"
          >
            <nav className="flex flex-col gap-4 text-[15px] font-semibold text-slate-600">
              <Link href="#home" onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link>
              <Link href="#services" onClick={() => setIsMobileMenuOpen(false)}>Layanan</Link>
              <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>Cara Kerja</Link>
              <Link href="#about" onClick={() => setIsMobileMenuOpen(false)}>Tentang</Link>
              <Link href="#team" onClick={() => setIsMobileMenuOpen(false)}>Tim Lawyer</Link>
              <Link href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>Ulasan</Link>
            </nav>
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              {!isLoggedIn ? (
                <>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-3 text-[15px] font-semibold text-slate-600 border border-slate-200 rounded-full hover:bg-slate-50 transition">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-3 bg-[#1D64FB] text-white rounded-full text-[15px] font-semibold shadow-sm hover:bg-blue-700 transition">
                    Mulai Konsultasi
                  </Link>
                </>
              ) : (
                <>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-center py-3 text-[15px] font-semibold text-slate-600 border border-slate-200 rounded-full hover:bg-slate-50 transition">
                    Keluar
                  </button>
                  <Link href={userRole === "lawyer" ? "/dashboard/lawyer" : "/dashboard"} onClick={() => setIsMobileMenuOpen(false)} className="text-center py-3 bg-[#1D64FB] text-white rounded-full text-[15px] font-semibold shadow-sm hover:bg-blue-700 transition">
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      <main className="w-full max-w-[1300px] flex flex-col gap-4 md:gap-6 flex-grow">

        {/* 1. Hero Section Card */}
        <motion.section 
          id="home"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-sm w-full p-4 sm:p-6 md:p-10"
        >
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center leading-tight mb-6 sm:mb-8 md:mb-10 text-slate-900 mt-0"
          >
            Lawyer Profesional Online
          </motion.h1>
          <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[calc(100vh-20rem)] min-h-[300px] sm:min-h-[400px] max-h-[750px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-lg">
            <Image
              alt="Lawyer Profesional"
              className="object-cover object-center w-full h-full"
              src="/hero-bg.png"
              fill
              priority
            />
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-3 left-3 right-3 md:right-auto md:bottom-8 md:left-8 max-w-none md:max-w-[340px]"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/95 md:bg-white/90 backdrop-blur-xl p-5 md:p-8 rounded-3xl shadow-2xl border border-white/30"
              >
                <p className="text-[12px] md:text-[14px] text-slate-800 font-medium mb-4 md:mb-6 leading-relaxed">
                  Konsultasi hukum cepat, privat, langsung dengan lawyer terverifikasi.
                </p>
                <Link href="/register" className="w-full">
                  <Button className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-2xl px-4 py-4 md:px-6 md:py-5 text-[13px] md:text-[14px] font-semibold flex items-center gap-2 w-full justify-center h-auto">
                    Start Chat Sekarang
                    <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center ml-1 shrink-0">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* 2. Services Card */}
        <motion.section 
          id="services"
          {...fadeInUp}
          className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-sm w-full p-5 sm:p-8 md:p-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10 text-slate-900">Kategori Konsultasi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Hukum Perdata", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", desc: "Masalah kontrak, sengketa, dan hak individu." },
              { title: "Hukum Pidana", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3", desc: "Pendampingan kasus hukum pidana dan perlindungan hukum." },
              { title: "Hukum Bisnis", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", desc: "Legalitas usaha, perjanjian, dan corporate law." },
              { title: "Hukum Digital", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", desc: "Kasus online, cyber law, dan privasi data." },
              { title: "Hukum Keluarga", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", desc: "Perceraian, hak asuh, dan warisan." },
              { title: "Konsultasi Umum", icon: "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", desc: "Tanya apa saja terkait hukum secara langsung." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-slate-50 shadow-sm border border-slate-100 p-6 md:p-8 rounded-[1.5rem] hover:shadow-md hover:bg-white transition duration-300"
              >
                <div className="w-10 h-10 bg-[#1D64FB] rounded-full flex items-center justify-center text-white mb-5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon}></path></svg>
                </div>
                <h3 className="text-lg font-bold mb-2 tracking-tight">{service.title}</h3>
                <p className="text-slate-500 text-[13px] md:text-[14px] leading-relaxed mb-5">{service.desc}</p>
                <Link href="#" className="text-[#1D64FB] font-semibold text-[13px] md:text-[14px] flex items-center gap-2 group">
                  Learn More
                  <div className="w-4 h-4 bg-[#1D64FB]/10 rounded-full flex items-center justify-center group-hover:bg-[#1D64FB] group-hover:text-white transition-all">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 3. Cara Kerja Card (NEW) */}
        <motion.section 
          id="how-it-works" 
          {...fadeInUp}
          className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-sm w-full p-5 sm:p-8 md:p-16"
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">Cara Kerja Law Consult</h2>
            <p className="text-slate-600 text-[15px] font-medium max-w-xl mx-auto">
              Dapatkan solusi hukum hanya dalam 3 langkah mudah.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative max-w-5xl mx-auto">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-slate-100 z-0"></div>

            {[
              { step: "01", title: "Pilih Lawyer & Kategori", desc: "Cari lawyer profesional yang sesuai dengan masalah hukum Anda (Perdata, Pidana, Bisnis, dsb)." },
              { step: "02", title: "Mulai Chat / Konsultasi", desc: "Lakukan pembayaran aman dan langsung terhubung via chat atau video call secara privat." },
              { step: "03", title: "Dapatkan Solusi Hukum", desc: "Diskusikan masalah Anda dan dapatkan dokumen legalitas atau saran hukum yang akurat." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center px-4"
              >
                <div className="w-24 h-24 rounded-full bg-slate-50 border-8 border-white shadow-sm flex items-center justify-center mb-6">
                  <span className="text-2xl font-black text-[#1D64FB] tracking-tighter">{item.step}</span>
                </div>
                <h3 className="text-[17px] font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-[14px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 4. About Us Card */}
        <motion.section 
          id="about" 
          {...fadeInUp}
          className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-sm w-full p-5 sm:p-8 md:p-16 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
        >
          <div className="relative h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-md">
            <Image
              alt="About Us"
              className="object-cover w-full h-full"
              src="/about-bg.png"
              fill
            />
          </div>
          <div className="pr-0 lg:pr-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-slate-900">Tentang Law Consult</h2>
            <div className="text-slate-600 text-[15px] leading-relaxed mb-8 font-medium space-y-4">
              <p>
                Law Consult adalah platform konsultasi hukum digital yang menghubungkan Anda dengan lawyer profesional secara langsung.
              </p>
              <p>
                Kami membantu Anda mendapatkan solusi hukum dengan cepat, aman, dan tanpa proses yang rumit.
              </p>
            </div>
            <Button className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-2xl px-6 py-5 text-[14px] font-semibold flex items-center gap-2">
              Mulai Konsultasi
              <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center ml-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </Button>
          </div>
        </motion.section>

        {/* 5. Our Lawyers Card */}
        <motion.section 
          id="team" 
          {...fadeInUp}
          className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-sm w-full p-4 sm:p-6 md:p-10 lg:p-12"
        >
          <div className="flex justify-end mb-4">
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button className="w-8 h-8 rounded-full bg-[#1D64FB] flex items-center justify-center text-white hover:bg-blue-700 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_2fr] gap-8 lg:gap-10 items-center">
            <div className="pr-0 lg:pr-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-slate-900">Lawyer Profesional</h2>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-8 font-medium">
                Terhubung dengan lawyer berpengalaman sesuai kebutuhan masalah hukum Anda.
              </p>
              <Button className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-2xl px-6 py-5 text-[14px] font-semibold flex items-center gap-2">
                Schedule Now
                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center ml-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                </div>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Dr. Anna Latchan", role: "Corporate Lawyer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA" },
                { name: "Dr. Sebastian", role: "General Counsel", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClCtB_n6jEhhPenDhf10PmiIs8PmjS6xvS7S6iA79EqKvpcXLltq-HcFjfS1-zl-4CJ1vZMtaO7RxQj_K1uvZGQ9A3IJNDi--gc_lYrrfDsUWL9CzMuj1qOd3iYfzoFRSm2kHY7aE98a4NA0LzncBdb97lMFhUdkz-pO1c_gEOR2a6kEjm2QidX2QFdRZfsP_W20yWNnzLlt4Zoqk8fZbdqpa-lDavulAgvZAw2fG-OHaRPRJ7wUcL2pi0KpeOZSA6Lji4EnoXArg" }
              ].map((lawyer, i) => (
                <div key={i} className="text-center group">
                  <div className="relative aspect-[3/4] mb-4 rounded-[1.5rem] overflow-hidden bg-slate-100 shadow-sm">
                    <Image alt={lawyer.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" src={lawyer.img} fill />
                  </div>
                  <h4 className="font-bold text-[16px] mb-1">{lawyer.name}</h4>
                  <p className="text-slate-500 text-[13px] font-medium">{lawyer.role}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 6. Customer Reviews Card */}
        <motion.section 
          id="reviews" 
          {...fadeInUp}
          className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-sm w-full p-5 sm:p-8 md:p-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10 text-slate-900">Apa Kata Pengguna Law Consult</h2>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-md"
            >
              <Image
                alt="Happy Client"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCgx_VluFgVD7yu4yBP4FQrb_xDlmAmveieFQgTikabobIh8d-Xd6zNCKlW9M0bWzNw5U6_aKYHfDy4NXVixDYzDlpcQLfajZO98Oeg5MboCgUs0oRL-NZ4COFB3GKwN41a_qMNmhMfhITtn0_6oJQKRihUYKvj4FsaXZoBsr7wba0dQ_9yHBs64IA_PT_RpPaaQ3lrYIvSHY633RjiSrZuQYNG46KUp-oTw-nAtsGhsgIEH5xxIxOi2PgItKqq46pyBy95hJydVk"
                fill
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col justify-center pr-0 lg:pr-8"
            >
              <svg className="w-10 h-10 text-slate-200 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg md:text-xl text-slate-800 leading-[1.6] font-medium mb-6 tracking-tight">
                &quot;Law Consult membantu saya mendapatkan solusi hukum dengan cepat tanpa harus datang ke kantor lawyer. Sangat praktis dan profesional.&quot;
              </p>
              <h4 className="font-bold text-[16px] mb-6">Pengguna Law Consult</h4>
              <div className="flex justify-end gap-2">
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1D64FB] flex items-center justify-center text-white hover:bg-blue-700 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 7. CTA Section Card */}
        <motion.section 
          {...fadeInUp}
          className="bg-[#1D64FB] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 text-center text-white relative overflow-hidden shadow-sm"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight"
            >
              Butuh Jawaban Hukum Sekarang?
            </motion.h2>
            <p className="text-blue-100/90 mb-8 text-[15px] max-w-xl mx-auto leading-relaxed">
              Jangan biarkan masalah hukum berlarut. Konsultasikan sekarang juga dengan lawyer profesional.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button className="bg-white text-[#1D64FB] hover:bg-slate-50 rounded-full px-8 py-5 text-[14px] font-bold w-full sm:w-auto">
                    Start Chat Sekarang
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" className="border-2 border-white/30 text-white bg-transparent hover:bg-white/10 rounded-full px-8 py-5 text-[14px] font-bold w-full sm:w-auto">
                  Lihat Cara Kerja
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* 8. Footer Card */}
      <motion.footer 
        {...fadeInUp}
        className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-sm w-full max-w-[1300px] px-5 py-8 sm:px-8 sm:py-10 md:px-16 md:py-16 mt-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 pr-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 text-[#0F172A]">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9L12 4.57 20.11 9 12 13.43 3.89 9zM12 17a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#0F172A]">Law Consult</span>
            </Link>
            <p className="text-[14px] text-slate-500 mb-6 leading-relaxed max-w-sm font-medium">
              Platform Konsultasi Hukum Digital. Konsultasi cepat, aman, dan terpercaya langsung dengan lawyer profesional.
            </p>
            <div className="flex gap-3">
              {['M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z'].map((path, i) => (
                <Link key={i} href="#" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-bold text-[14px] mb-4 text-slate-900">Company</h5>
            <ul className="space-y-3 text-[14px] font-medium text-slate-500">
              <li><Link href="#" className="hover:text-slate-900 transition">Metablog</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition">Womup</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition">About</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[14px] mb-4 text-slate-900">Resources</h5>
            <ul className="space-y-3 text-[14px] font-medium text-slate-500">
              <li><Link href="#" className="hover:text-slate-900 transition">Request a Quote</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition">Salesforce HQ</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition">Help Desk</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition">Book Online</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[14px] mb-4 text-slate-900">About</h5>
            <ul className="space-y-3 text-[14px] font-medium text-slate-500">
              <li><Link href="#" className="hover:text-slate-900 transition">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition">Terms</Link></li>
              <li><Link href="#" className="hover:text-slate-900 transition">Condition</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-[13px] font-medium text-slate-400 mb-8 border-t border-slate-100 pt-8">
          <p>Copyright © Law Consult 2024. All Rights Reserved.</p>
        </div>
        {/* Giant Watermark Logo */}
        <div className="w-full flex justify-center mt-12 pb-4 overflow-hidden">
          <span className="text-[2.5rem] sm:text-[4rem] md:text-[11rem] lg:text-[14rem] font-bold text-slate-100/70 leading-none tracking-tighter whitespace-nowrap select-none">
            Law Consult
          </span>
        </div>
      </motion.footer>
    </div>
  );
}
