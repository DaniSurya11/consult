"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const perfData = [1,2,1,3,2,4,3,5,4,6,5,8];
const expData = [5,2,8,4]; 
const dates = ["12 Mei","13 Mei","14 Mei","15 Mei","16 Mei","17 Mei","18 Mei"];

function LineChart() {
  const w=320,h=120,max=Math.max(...perfData),min=Math.min(...perfData),r=max-min||1;
  const pts = perfData.map((p,i)=>{const x=(i/(perfData.length-1))*w;const y=h-((p-min)/r)*(h-16)-8;return{x,y};});
  const d = pts.map((p,i)=>`${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
  const area = `${d} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[120px]">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(29,100,251,0.15)"/><stop offset="100%" stopColor="rgba(29,100,251,0)"/></linearGradient></defs>
      <path d={area} fill="url(#lg)"/><path d={d} fill="none" stroke="#1D64FB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="4" fill="#1D64FB"/><circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="8" fill="#1D64FB" fillOpacity="0.15"/>
    </svg>
  );
}

function BarChart() {
  const max=Math.max(...expData);
  return (
    <div className="flex items-end gap-3 h-[130px] mt-4">
      {expData.map((v,i)=>(<div key={i} className="flex-1 flex flex-col items-center gap-2">
        <motion.div initial={{height:0}} animate={{height:`${(v/max)*100}%`}} transition={{delay:0.2+i*0.1,duration:0.5}} className="w-full bg-indigo-500 rounded-lg min-h-[8px]"/>
        <span className="text-[11px] text-slate-400 font-medium">Minggu {i+1}</span>
      </div>))}
    </div>
  );
}

const sparklines = {
  konsultasi: [1,2,1,3,2,4,3],
  menunggu: [0,1,0,2,1,0,1],
  dokumen: [2,3,4,4,5,6,6],
  pengeluaran: [1,1.5,1.2,2,1.8,2.5,2.2],
};

function MiniSparkline({data,color}:{data:number[],color:string}) {
  const w=60,h=20,max=Math.max(...data),min=Math.min(...data),r=max-min||1;
  const pts=data.map((v,i)=>({x:(i/(data.length-1))*w,y:h-((v-min)/r)*(h-4)-2}));
  const d=pts.map((p,i)=>`${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ');
  return <svg viewBox={`0 0 ${w} ${h}`} className="w-[60px] h-[20px]"><path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

const quickActions = [
  {name:"Cari Spesialis Hukum",icon:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",url:"/dashboard/lawyers"},
  {name:"Lihat Jadwal Booking",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",url:"/dashboard/bookings"},
  {name:"Konsultasi Aktif Anda",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",url:"/dashboard/active"},
  {name:"Pusat Bantuan Klien",icon:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",url:"/dashboard/coming-soon"},
];

export default function ClientDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("Ahmad Rizky");
  const [isLoading, setIsLoading] = useState(true);
  const [activeBookings, setActiveBookings] = useState<any[]>([]);
  const [completedBookings, setCompletedBookings] = useState<any[]>([]);
  const [pendingBookings, setPendingBookings] = useState<any[]>([]);
  const fade = {initial:{opacity:0,y:12},animate:{opacity:1,y:0}};

  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(1);

  useEffect(() => {
    setUserName(localStorage.getItem("user_name") || "Ahmad Rizky");
    const saved = localStorage.getItem("bookings");
    if (saved) {
      try {
        const bookings = JSON.parse(saved);
        setActiveBookings(bookings.filter((b: any) => ["pending", "accepted", "client_ready"].includes(b.status)));
        setCompletedBookings(bookings.filter((b: any) => b.status === "completed"));
        setPendingBookings(bookings.filter((b: any) => b.status === "pending"));
      } catch (e) {}
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    if (!localStorage.getItem("has_seen_tour")) {
      setTimeout(() => setShowTour(true), 1500);
    }
    return () => clearTimeout(timer);
  }, []);

  const nextTourStep = () => {
    if (tourStep < 3) {
      setTourStep(prev => prev + 1);
    } else {
      setShowTour(false);
      localStorage.setItem("has_seen_tour", "true");
    }
  };

  const skipTour = () => {
    setShowTour(false);
    localStorage.setItem("has_seen_tour", "true");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] h-auto sm:h-[120px] shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
          <div className="space-y-3">
            <div className="h-6 w-48 bg-slate-100 rounded-lg animate-pulse"></div>
            <div className="h-4 w-72 bg-slate-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-slate-100 rounded-xl animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-full bg-slate-100 rounded-md animate-pulse"></div>
                  <div className="h-6 w-1/2 bg-slate-100 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl h-[300px] shadow-sm border border-slate-100 p-6 space-y-4">
            <div className="h-5 w-40 bg-slate-100 rounded-lg animate-pulse"></div>
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-16 w-full bg-slate-50 rounded-xl animate-pulse"></div>)}
            </div>
          </div>
          <div className="bg-white rounded-3xl h-[300px] shadow-sm border border-slate-100 p-6 space-y-4">
            <div className="h-5 w-32 bg-slate-100 rounded-lg animate-pulse"></div>
            <div className="w-full h-40 bg-slate-50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Tour Modal */}
      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {showTour && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <Badge className="bg-blue-50 text-[#1D64FB] hover:bg-blue-100 font-bold border-0">Panduan Cepat {tourStep}/3</Badge>
                    <button onClick={skipTour} className="text-slate-400 hover:text-slate-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                  
                  {tourStep === 1 && (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1D64FB] mb-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Temukan Lawyer Anda</h3>
                      <p className="text-slate-500 text-[14px] leading-relaxed">Gunakan menu <b>Cari Lawyer Baru</b> untuk menelusuri ratusan pengacara profesional yang sesuai dengan masalah hukum Anda.</p>
                    </div>
                  )}
                  {tourStep === 2 && (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mb-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Konsultasi Live Chat</h3>
                      <p className="text-slate-500 text-[14px] leading-relaxed">Pantau status pesanan dan langsung mengobrol di ruang privasi pada menu <b>Konsultasi Aktif</b>.</p>
                    </div>
                  )}
                  {tourStep === 3 && (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Pantau Statistik Anda</h3>
                      <p className="text-slate-500 text-[14px] leading-relaxed">Lihat total pengeluaran dan riwayat aktivitas hukum Anda langsung dari Dashboard ini.</p>
                    </div>
                  )}
  
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex gap-2">
                      {[1, 2, 3].map(step => (
                        <div key={step} className={`w-2 h-2 rounded-full transition-colors ${tourStep === step ? 'bg-[#1D64FB]' : 'bg-slate-200'}`} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={skipTour} className="text-slate-500 hover:bg-slate-50 font-semibold text-[13px]">Lewati</Button>
                      <Button onClick={nextTourStep} className="bg-[#1D64FB] hover:bg-blue-700 text-white font-bold px-6 rounded-xl text-[13px]">
                        {tourStep === 3 ? "Mulai Sekarang" : "Lanjut"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* 1. Welcome Hero */}
      <motion.div {...fade} className="relative z-20">
        <Card className="border-0 shadow-sm bg-white rounded-[1.5rem] sm:rounded-[2rem]">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-5">
              <div>
                <p className="text-[13px] text-slate-400 font-medium mb-1">Selamat datang kembali,</p>
                <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{userName}</h1>
                </div>
                <p className="text-slate-500 text-[14px]">Pantau aktivitas konsultasi, pengeluaran, dan temukan lawyer terbaik.</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
                <Button onClick={() => router.push("/dashboard/lawyers")} className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-full font-bold px-6 h-11 transition-all">
                  Cari Lawyer Baru
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 2. Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {label:"Konsultasi Aktif",value:activeBookings.length.toString(),sub:"Dari seluruh pesanan",subColor:"text-green-500",iconBg:"bg-blue-50",iconColor:"text-[#1D64FB]",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",spark:sparklines.konsultasi,sparkColor:"#1D64FB"},
          {label:"Menunggu Respon",value:pendingBookings.length.toString(),sub:"Pesanan pending",subColor:"text-orange-500",iconBg:"bg-orange-50",iconColor:"text-orange-500",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",spark:sparklines.menunggu,sparkColor:"#f97316"},
          {label:"Sesi Selesai",value:(3 + completedBookings.length).toString(),sub:"Kasus telah ditutup",subColor:"text-green-500",iconBg:"bg-green-50",iconColor:"text-green-500",icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",spark:sparklines.dokumen,sparkColor:"#22c55e"},
          {label:"Total Pengeluaran",value:"Rp 2.150k",sub:"Estimasi bulan ini",subColor:"text-indigo-500",iconBg:"bg-indigo-50",iconColor:"text-indigo-500",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",spark:sparklines.pengeluaran,sparkColor:"#6366f1"},
        ].map((s,i)=>(
          <motion.div key={i} {...fade} transition={{delay:0.1+i*0.05}} whileHover={{y:-5,transition:{duration:0.2}}}>
            <Card className="border-0 shadow-sm bg-white rounded-xl sm:rounded-2xl h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-3 sm:p-5 flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                <div className={`w-9 h-9 sm:w-11 sm:h-11 ${s.iconBg} ${s.iconColor} rounded-lg sm:rounded-xl flex items-center justify-center shrink-0`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.icon}/></svg>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] sm:text-[12px] text-slate-400 font-semibold mb-1 leading-tight">{s.label}</p>
                  <div className="flex items-end justify-between gap-1 sm:gap-2">
                    <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-none">{s.value}</h3>
                    <div className="hidden sm:block"><MiniSparkline data={s.spark} color={s.sparkColor}/></div>
                  </div>
                  <p className={`text-[10px] sm:text-[11px] font-semibold ${s.subColor} mt-1 leading-tight`}>{s.sub}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 3. Middle Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Performance Chart */}
        <motion.div {...fade} transition={{delay:0.3}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-900">Ringkasan Aktivitas</CardTitle>
              <Badge variant="outline" className="text-[11px] font-semibold text-slate-500 rounded-lg">7 hari terakhir</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#1D64FB]"/><span className="text-[11px] text-slate-400 font-medium">Interaksi Chat</span></div>
              </div>
              <LineChart/>
              <Separator className="my-4"/>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-[11px] text-slate-400 font-semibold mb-1">Total Interaksi</p><h4 className="text-xl font-black text-slate-900">24</h4><p className="text-[11px] text-green-500 font-semibold">↑ 10% dari minggu lalu</p></div>
                <div><p className="text-[11px] text-slate-400 font-semibold mb-1">Dokumen Dikirim</p><h4 className="text-lg font-black text-slate-900">5</h4><p className="text-[11px] text-slate-400 font-semibold">- Tetap sama</p></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Konsultasi Aktif */}
        <motion.div {...fade} transition={{delay:0.4}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-900">Konsultasi Aktif</CardTitle>
              <button className="text-[12px] font-bold text-[#1D64FB] hover:underline" onClick={() => router.push('/dashboard/active')}>Kelola Semua</button>
            </CardHeader>
            <CardContent className="space-y-1">
              {activeBookings.length > 0 ? (
                activeBookings.slice(0,4).map((c,i)=>(
                  <div key={i} onClick={() => router.push(c.status === "pending" ? "/dashboard/active" : `/dashboard/chat/${c.lawyerId}`)} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer group">
                    <Avatar className="w-9 h-9 shrink-0 border border-slate-100"><AvatarImage src={`https://i.pravatar.cc/150?u=${c.lawyerId}`} alt={c.lawyerName}/><AvatarFallback>{c.lawyerName?.charAt(0) || "L"}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-bold text-slate-900 truncate group-hover:text-[#1D64FB] transition">{c.lawyerName}</p>
                        <Badge className={`text-[9px] px-1.5 py-0 font-bold rounded-md border-0 ${c.status === "pending" ? "bg-orange-50 text-orange-500" : "bg-blue-50 text-[#1D64FB]"}`}>{c.status === "pending" ? "Menunggu" : "Aktif"}</Badge>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{c.topic || "Konsultasi Hukum"}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-[#1D64FB] mt-2 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-[12px]">Belum ada konsultasi yang aktif.</div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Promo / Info */}
        <motion.div {...fade} transition={{delay:0.5}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-900">Jadwal Mendatang</CardTitle>
              <button className="text-[12px] font-bold text-[#1D64FB] hover:underline" onClick={() => router.push('/dashboard/bookings')}>Riwayat</button>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#1D64FB] to-blue-600 text-white mb-3">
                <h3 className="font-bold text-[14px] mb-1">Cari Spesialis Hukum?</h3>
                <p className="text-[11px] text-blue-100 mb-3">Dapatkan potongan 20% untuk konsultasi pertama Anda di Law Consult.</p>
                <Button onClick={() => router.push('/dashboard/lawyers')} className="bg-white text-[#1D64FB] hover:bg-blue-50 text-[11px] h-7 px-3 rounded-lg font-bold w-full">Gunakan Promo</Button>
              </div>
              <div className="p-3 text-center border border-dashed border-slate-200 rounded-xl">
                 <p className="text-[12px] font-medium text-slate-500">Tidak ada jadwal Vicon / Tatap muka dalam waktu dekat.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 4. Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Riwayat Selesai */}
        <motion.div {...fade} transition={{delay:0.6}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-900">Konsultasi Selesai</CardTitle>
              <button className="text-[12px] font-bold text-[#1D64FB] hover:underline" onClick={() => router.push('/dashboard/bookings')}>Lihat semua</button>
            </CardHeader>
            <CardContent>
              {completedBookings.length > 0 ? (
                <div className="space-y-3">
                  {completedBookings.slice(0, 3).map((b: any, idx: number) => (
                    <div key={idx} className="flex gap-3 relative p-2">
                      {idx !== Math.min(completedBookings.length, 3) - 1 && <div className="absolute left-[19px] top-8 bottom-[-8px] w-px bg-slate-100"></div>}
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 z-10 border-2 border-white mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <div className="pt-0.5 pb-2">
                        <p className="text-[13px] font-bold text-slate-900 leading-tight mb-0.5">Sesi dengan {b.lawyerName}</p>
                        <p className="text-[11px] text-slate-500">Selesai pada {b.date || "Beberapa waktu lalu"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 text-center">
                  <p className="text-[12px] text-slate-500 leading-relaxed">Anda belum memiliki riwayat konsultasi yang selesai.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Pengeluaran Bulanan */}
        <motion.div {...fade} transition={{delay:0.7}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-0 flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-900">Pengeluaran Bulanan</CardTitle>
              <Badge variant="outline" className="text-[11px] font-semibold text-slate-500 rounded-lg">Mei 2024</Badge>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-2">Rp 2.150.000</h3>
              <BarChart/>
            </CardContent>
          </Card>
        </motion.div>

        {/* Aksi Cepat */}
        <motion.div {...fade} transition={{delay:0.8}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-[15px] font-bold text-slate-900">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {quickActions.map((a,i)=>(
                <button key={i} onClick={() => router.push(a.url)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition text-left group">
                  <div className="w-9 h-9 bg-slate-50 group-hover:bg-blue-50 rounded-lg flex items-center justify-center shrink-0 transition">
                    <svg className="w-4.5 h-4.5 text-slate-400 group-hover:text-[#1D64FB] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={a.icon}/></svg>
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700 group-hover:text-[#1D64FB] transition flex-1">{a.name}</span>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-[#1D64FB] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
