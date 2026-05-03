"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const perfData = [3,5,4,7,6,8,7,9,8,10,9,12.5];
const revData = [4,8,12,10];
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
  const max=Math.max(...revData);
  return (
    <div className="flex items-end gap-3 h-[130px] mt-4">
      {revData.map((v,i)=>(<div key={i} className="flex-1 flex flex-col items-center gap-2">
        <motion.div initial={{height:0}} animate={{height:`${(v/max)*100}%`}} transition={{delay:0.2+i*0.1,duration:0.5}} className="w-full bg-[#1D64FB] rounded-lg min-h-[8px]"/>
        <span className="text-[11px] text-slate-400 font-medium">Minggu {i+1}</span>
      </div>))}
    </div>
  );
}

// Sparkline data untuk stat cards
const sparklines = {
  konsultasi: [6,8,7,10,9,11,12],
  jadwal: [2,3,1,4,2,3,3],
  kasus: [5,6,5,7,8,7,8],
  rating: [4.7,4.8,4.8,4.9,4.9,4.9,4.9],
};

function MiniSparkline({data,color}:{data:number[],color:string}) {
  const w=60,h=20,max=Math.max(...data),min=Math.min(...data),r=max-min||1;
  const pts=data.map((v,i)=>({x:(i/(data.length-1))*w,y:h-((v-min)/r)*(h-4)-2}));
  const d=pts.map((p,i)=>`${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ');
  return <svg viewBox={`0 0 ${w} ${h}`} className="w-[60px] h-[20px]"><path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

const consultations = [
  {name:"Andi Wijaya",type:"Chat",time:"10:32",msg:"Terima kasih atas penjelasannya, sangat membantu.",unread:2,avatar:"https://i.pravatar.cc/100?u=andi"},
  {name:"Siti Nurhaliza",type:"Chat",time:"09:15",msg:"Saya ingin menjadwalkan konsultasi lebih lanjut.",unread:0,avatar:"https://i.pravatar.cc/100?u=siti"},
  {name:"PT Maju Bersama",type:"Chat",time:"Kemarin",msg:"Mohon bantuannya terkait review kontrak kerja sama.",unread:1,avatar:"https://i.pravatar.cc/100?u=ptmaju"},
  {name:"Rudi Hartono",type:"Chat",time:"Kemarin",msg:"Baik dok, saya akan kirimkan dokumennya.",unread:0,avatar:"https://i.pravatar.cc/100?u=rudi"},
];

const schedule = [
  {time:"10:00 - 11:00",name:"Andi Wijaya",desc:"Konsultasi Hukum Bisnis",status:"Selesai",color:"bg-green-50 text-green-600"},
  {time:"13:00 - 14:00",name:"Siti Nurhaliza",desc:"Konsultasi Hukum Keluarga",status:"Berlangsung",color:"bg-blue-50 text-[#1D64FB]"},
  {time:"15:00 - 16:00",name:"PT Maju Bersama",desc:"Review Kontrak",status:"Menunggu",color:"bg-orange-50 text-orange-500"},
];

// Saran #2: Micro-copy otoritatif — bahasa profesional untuk lawyer
const quickActions = [
  {name:"Atur Jadwal Konsultasi",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},
  {name:"Kelola Layanan Hukum",icon:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"},
  {name:"Unggah Dokumen Legal",icon:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"},
  {name:"Pengaturan Profil Profesional",icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"},
];

export default function LawyerDashboard() {
  const router = useRouter();
  // Saran #4: State Persistence — localStorage untuk status online
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showVerifiedTip, setShowVerifiedTip] = useState(false);
  const [countdown, setCountdown] = useState(15*60); // 15 min countdown for active session
  const [pendingBookings, setPendingBookings] = useState<any[]>([]);
  const [activeBookings, setActiveBookings] = useState<any[]>([]);
  const [completedBookingsCount, setCompletedBookingsCount] = useState(8);
  const [averageRating, setAverageRating] = useState("4.9");
  const [totalReviews, setTotalReviews] = useState(128);
  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const [bookingToast, setBookingToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadReviews, setUnreadReviews] = useState<any[]>([]);
  const fade = {initial:{opacity:0,y:12},animate:{opacity:1,y:0}};

  useEffect(() => {
    // Load persisted online status
    const saved = localStorage.getItem('lawyer_online_status');
    if (saved !== null) setIsOnline(JSON.parse(saved));
    // Saran #1: Skeleton loading simulation
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Poll for new bookings
  useEffect(() => {
    const loadBookings = () => {
      const saved = localStorage.getItem("bookings");
      if (saved) {
        try {
          const all = JSON.parse(saved);
          const pending = all.filter((b: any) => b.status === "pending");
          setPendingBookings(prev => {
            if (pending.length > prev.length && prev.length > 0) {
              setBookingToast({ show: true, message: `Pesanan baru dari ${pending[pending.length - 1]?.clientName}!` });
              setTimeout(() => setBookingToast({ show: false, message: "" }), 5000);
            }
            return pending;
          });
          const active = all.filter((b: any) => b.status === "accepted" || b.status === "client_ready");
          setActiveBookings(active);
          
          const completedCount = all.filter((b: any) => b.status === "completed").length;
          // Set to base 8 + newly completed
          setCompletedBookingsCount(8 + completedCount);

          // Check if there's a newly completed session to notify the lawyer
          const newlyCompleted = all.find((b: any) => b.status === "completed" && !b.lawyerNotifiedCompleted);
          if (newlyCompleted) {
            setBookingToast({ show: true, message: `Sesi dengan ${newlyCompleted.clientName || 'Klien'} telah selesai!` });
            setTimeout(() => setBookingToast({ show: false, message: "" }), 5000);
            
            const updated = all.map((b: any) => b.id === newlyCompleted.id ? { ...b, lawyerNotifiedCompleted: true } : b);
            localStorage.setItem("bookings", JSON.stringify(updated));
          }

        } catch (e) {
          console.error("Failed to parse bookings", e);
          localStorage.setItem("bookings", "[]");
        }
      }
      
      const savedReviews = localStorage.getItem("lawyer_reviews");
      if (savedReviews) {
        try {
          const reviews = JSON.parse(savedReviews);
          setRecentReviews(reviews);
          setTotalReviews(128 + reviews.length);
          
          // calculate average
          let sum = 4.9 * 128;
          for (let r of reviews) sum += r.rating;
          setAverageRating((sum / (128 + reviews.length)).toFixed(1));
          
          setUnreadReviews(reviews.filter((r: any) => !r.seenInNotification));
        } catch (e) {}
      }
    };
    loadBookings();
    const interval = setInterval(loadBookings, 2000);
    return () => clearInterval(interval);
  }, []);

  const acceptBooking = (bookingId: number) => {
    const saved = localStorage.getItem("bookings");
    if (!saved) return;
    const all = JSON.parse(saved);
    const updated = all.map((b: any) => b.id === bookingId ? { ...b, status: "accepted" } : b);
    localStorage.setItem("bookings", JSON.stringify(updated));
    // Also update paid_sessions
    const booking = all.find((b: any) => b.id === bookingId);
    if (booking) {
      const paidSessions = JSON.parse(localStorage.getItem("paid_sessions") || "[]");
      const updatedPaid = paidSessions.map((s: any) => s.lawyerId === booking.lawyerId && s.status === "pending" ? { ...s, status: "active" } : s);
      localStorage.setItem("paid_sessions", JSON.stringify(updatedPaid));
    }
    setPendingBookings(prev => prev.filter(b => b.id !== bookingId));
    setBookingToast({ show: true, message: "Booking diterima! Menunggu klien masuk ke ruang chat..." });
    setTimeout(() => setBookingToast({ show: false, message: "" }), 5000);
  };

  const rejectBooking = (bookingId: number) => {
    const saved = localStorage.getItem("bookings");
    if (!saved) return;
    const all = JSON.parse(saved);
    const updated = all.map((b: any) => b.id === bookingId ? { ...b, status: "rejected" } : b);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setPendingBookings(prev => prev.filter(b => b.id !== bookingId));
    setBookingToast({ show: true, message: "Booking telah ditolak. Refund akan diproses." });
    setTimeout(() => setBookingToast({ show: false, message: "" }), 4000);
  };

  // Ronde 2: Countdown timer untuk sesi berlangsung
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoading]);

  const formatCountdown = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const toggleOnline = () => {
    const next = !isOnline;
    setIsOnline(next);
    localStorage.setItem('lawyer_online_status', JSON.stringify(next));
  };

  // Saran #1: Skeleton Loader component
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 animate-pulse">
        {/* Skeleton Hero */}
        <div className="bg-white rounded-[2rem] h-[120px] shadow-sm" />
        {/* Skeleton Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-2xl h-[100px] shadow-sm" />)}
        </div>
        {/* Skeleton Middle Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-2xl h-[300px] shadow-sm" />)}
        </div>
        {/* Skeleton Bottom Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-2xl h-[260px] shadow-sm" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* 1. Welcome Hero — Integrated Header */}
      <motion.div {...fade} className="relative z-20">
        <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
              {/* Left: Welcome Text */}
              <div>
                <p className="text-[13px] text-slate-400 font-medium mb-1">Selamat datang kembali,</p>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Dr. Bima Pratama, S.H.</h1>
                  {/* Saran #3: Verified badge dengan tooltip interaktif */}
                  <div className="relative" onMouseEnter={() => setShowVerifiedTip(true)} onMouseLeave={() => setShowVerifiedTip(false)}>
                    <motion.svg whileHover={{scale:1.2,rotate:10}} transition={{type:"spring",stiffness:400}} className="w-6 h-6 text-[#1D64FB] cursor-pointer" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></motion.svg>
                    <AnimatePresence>
                      {showVerifiedTip && (
                        <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0,y:4}} className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap z-50 shadow-lg">
                          Lawyer Terverifikasi ✓
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                {/* Saran #2: Micro-copy lebih otoritatif */}
                <p className="text-slate-500 text-[14px]">Kelola konsultasi, jadwal, dan layanan hukum Anda dengan mudah.</p>
              </div>

              {/* Right: Online Toggle + Notification + Profile */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Online/Offline Toggle */}
                {/* Saran #4: toggleOnline menggunakan localStorage */}
                <motion.button onClick={toggleOnline} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-[13px] transition-all border ${isOnline?'bg-green-50 border-green-200 text-green-600':'bg-slate-100 border-slate-200 text-slate-400'}`}>
                  <motion.div className={`w-2.5 h-2.5 rounded-full ${isOnline?'bg-green-500':'bg-slate-400'}`} animate={isOnline?{scale:[1,1.3,1]}:{}} transition={isOnline?{repeat:Infinity,duration:2}:{}}/>
                  <AnimatePresence mode="wait"><motion.span key={isOnline?"on":"off"} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>{isOnline?"Siap Menerima":"Tidak Tersedia"}</motion.span></AnimatePresence>
                </motion.button>

                {/* Notification Bell */}
                <div className="relative">
                  <button onClick={() => setShowNotifications(!showNotifications)} className="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-[#1D64FB] hover:bg-slate-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    {(pendingBookings.length + unreadReviews.length) > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-white text-[8px] font-bold flex items-center justify-center animate-pulse">
                        {pendingBookings.length + unreadReviews.length}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute top-12 right-0 w-80 bg-white border border-slate-100 shadow-xl rounded-2xl z-[999]">
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
                        <h3 className="text-[13px] font-bold text-slate-900">Notifikasi</h3>
                        <span className="text-[11px] font-semibold text-[#1D64FB] bg-blue-50 px-2 py-0.5 rounded-md">{pendingBookings.length + unreadReviews.length} Baru</span>
                      </div>
                      <div className="max-h-[320px] overflow-y-auto">
                        {pendingBookings.length === 0 && unreadReviews.length === 0 ? (
                          <div className="px-4 py-10 text-center flex flex-col items-center gap-2">
                            <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                            <p className="text-[12px] font-medium text-slate-400">Semua notifikasi sudah dibaca</p>
                          </div>
                        ) : (
                          <>
                            {pendingBookings.map((notif: any, idx: number) => (
                              <div key={`b-${idx}`} onClick={() => setShowNotifications(false)} className="px-4 py-3 hover:bg-blue-50/40 border-b border-slate-100 cursor-pointer transition flex gap-3">
                                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-700 font-bold text-[13px]">
                                  {notif.clientName?.charAt(0) || "A"}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-bold text-slate-900 mb-0.5">Pesanan Masuk</p>
                                  <p className="text-[11px] text-slate-500">Klien <span className="font-semibold text-slate-700">{notif.clientName || "Ahmad Rizky"}</span> menunggu konfirmasi.</p>
                                  <span className="inline-block mt-1 text-[10px] bg-blue-50 text-blue-500 font-bold px-2 py-0.5 rounded-full">Baru saja</span>
                                </div>
                              </div>
                            ))}
                            {unreadReviews.map((r: any, idx: number) => (
                              <div key={`r-${idx}`} onClick={() => {
                                setShowNotifications(false);
                                try {
                                  const saved = localStorage.getItem("lawyer_reviews");
                                  if (saved) {
                                    const reviews = JSON.parse(saved);
                                    const updated = reviews.map((rev: any, i: number) => i === idx ? { ...rev, seenInNotification: true } : rev);
                                    localStorage.setItem("lawyer_reviews", JSON.stringify(updated));
                                    setUnreadReviews(prev => prev.filter((_, i) => i !== idx));
                                  }
                                } catch(e) {}
                              }} className="px-4 py-3 hover:bg-yellow-50/40 border-b border-slate-100 cursor-pointer transition flex gap-3">
                                <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-bold text-slate-900 mb-0.5">Ulasan Baru Masuk</p>
                                  <p className="text-[11px] text-slate-500">Klien <span className="font-semibold text-slate-700">{r.name}</span> memberi <span className="text-yellow-500 font-bold">{r.rating} bintang</span>.</p>
                                  <span className="inline-block mt-1 text-[10px] bg-yellow-50 text-yellow-600 font-bold px-2 py-0.5 rounded-full">{r.date || "Baru saja"}</span>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-center rounded-b-2xl">
                        <button onClick={() => setShowNotifications(false)} className="text-[11px] font-bold text-slate-400 hover:text-slate-700 transition">Tutup</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Avatar + Name */}
                <div className="flex items-center gap-3 pl-2 border-l border-slate-100 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#1D64FB] ring-2 ring-blue-50">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA" alt="Dr. Bima Pratama" className="w-full h-full object-cover" />
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-[13px] font-bold text-slate-900 group-hover:text-[#1D64FB] transition leading-tight">Dr. Bima Pratama, S.H.</p>
                    <p className="text-[11px] text-slate-400 font-medium">Lihat Profil</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* NEW: Permintaan Booking Baru */}
      {pendingBookings.length > 0 && (
        <motion.div {...fade} transition={{delay:0.05}}>
          <Card className="border-2 border-yellow-200 shadow-sm shadow-yellow-100 bg-white rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></div>
                <CardTitle className="text-[15px] font-bold text-slate-900">Permintaan Baru ({pendingBookings.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingBookings.map((booking) => (
                <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-yellow-50/50 rounded-xl border border-yellow-100">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#1D64FB] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {booking.clientName?.charAt(0) || "A"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-900">{booking.clientName || "Ahmad Rizky"}</p>
                      <p className="text-[11px] text-slate-500">{booking.lawyerSpecialty} • {booking.price}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{new Date(booking.createdAt).toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                    <Button onClick={() => rejectBooking(booking.id)} variant="outline" className="flex-1 sm:flex-initial border-red-200 text-red-500 hover:bg-red-50 rounded-xl h-9 text-xs font-bold px-4">
                      Tolak
                    </Button>
                    <Button onClick={() => acceptBooking(booking.id)} className="flex-1 sm:flex-initial bg-green-500 hover:bg-green-600 text-white rounded-xl h-9 text-xs font-bold px-4">
                      ✓ Terima
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* NEW: Sesi Aktif (Berlangsung) */}
      {activeBookings.length > 0 && (
        <motion.div {...fade} transition={{delay:0.07}}>
          <Card className="border-2 border-green-200 shadow-sm shadow-green-100 bg-white rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <CardTitle className="text-[15px] font-bold text-slate-900">Sesi Menunggu Chat ({activeBookings.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeBookings.map((booking) => (
                <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-green-50/50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#1D64FB] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {booking.clientName?.charAt(0) || "A"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-900">{booking.clientName || "Ahmad Rizky"}</p>
                      <p className="text-[11px] text-slate-500">{booking.lawyerSpecialty} • {booking.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                    {booking.status === "accepted" ? (
                      <div className="px-3 py-1.5 bg-yellow-50 text-yellow-600 rounded-lg text-[11px] font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                        Menunggu Klien...
                      </div>
                    ) : (
                      <Button onClick={() => router.push(`/dashboard/chat/${booking.lawyerId}`)} className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-9 text-xs font-bold px-4 animate-bounce">
                        Masuk Ruang Chat
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Booking Toast */}
      <AnimatePresence>
        {bookingToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-white border border-yellow-200 rounded-xl shadow-lg p-4 flex items-start gap-3 w-80">
              <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-sm">🔔</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">Notifikasi</h4>
                <p className="text-[12px] text-slate-500 mt-0.5">{bookingToast.message}</p>
              </div>
              <button onClick={() => setBookingToast({ show: false, message: "" })} className="text-slate-400 hover:text-slate-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Stat Cards Row — Ronde 2: Tactile + Sparklines */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {label:"Konsultasi Aktif",value:"12",sub:"↑ 20% dari bulan lalu",subColor:"text-green-500",iconBg:"bg-blue-50",iconColor:"text-[#1D64FB]",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",spark:sparklines.konsultasi,sparkColor:"#1D64FB"},
          {label:"Jadwal Hari Ini",value:"3",sub:"Lihat jadwal Anda",subColor:"text-[#1D64FB]",iconBg:"bg-blue-50",iconColor:"text-[#1D64FB]",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",spark:sparklines.jadwal,sparkColor:"#1D64FB"},
          {label:"Konsultasi Selesai",value:completedBookingsCount.toString(),sub:"Lihat semua kasus",subColor:"text-[#1D64FB]",iconBg:"bg-green-50",iconColor:"text-green-500",icon:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",spark:sparklines.kasus,sparkColor:"#22c55e"},
          {label:"Rating Saya",value:averageRating,sub:`Dari ${totalReviews} ulasan`,subColor:"text-slate-400",iconBg:"bg-yellow-50",iconColor:"text-yellow-500",icon:"M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",spark:sparklines.rating,sparkColor:"#eab308"},
        ].map((s,i)=>(
          <motion.div key={i} {...fade} transition={{delay:0.1+i*0.05}} whileHover={{y:-5,transition:{duration:0.2}}}>
            <Card className="border-0 shadow-sm bg-white rounded-2xl h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5 flex items-start gap-4">
                <div className={`w-11 h-11 ${s.iconBg} ${s.iconColor} rounded-xl flex items-center justify-center shrink-0`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.icon}/></svg>
                </div>
                <div className="flex-1">
                  <p className="text-[12px] text-slate-400 font-semibold mb-1">{s.label}</p>
                  <div className="flex items-end justify-between gap-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{s.value}</h3>
                    <MiniSparkline data={s.spark} color={s.sparkColor}/>
                  </div>
                  <p className={`text-[11px] font-semibold ${s.subColor} mt-1`}>{s.sub}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 3. Middle Row: Performance Chart + Recent Consultations + Schedule */}
      {/* Saran #5: Responsive breakpoints — md:grid-cols-2 untuk tablet */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Performance Chart */}
        <motion.div {...fade} transition={{delay:0.3}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-900">Ringkasan Performa</CardTitle>
              <Badge variant="outline" className="text-[11px] font-semibold text-slate-500 rounded-lg">7 hari terakhir</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#1D64FB]"/><span className="text-[11px] text-slate-400 font-medium">Konsultasi</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500"/><span className="text-[11px] text-slate-400 font-medium">Pendapatan</span></div>
              </div>
              <LineChart/>
              <Separator className="my-4"/>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-[11px] text-slate-400 font-semibold mb-1">Total Konsultasi</p><h4 className="text-xl font-black text-slate-900">45</h4><p className="text-[11px] text-green-500 font-semibold">↑ 18% dari minggu lalu</p></div>
                <div><p className="text-[11px] text-slate-400 font-semibold mb-1">Total Pendapatan</p><h4 className="text-lg font-black text-slate-900">Rp 12.450.000</h4><p className="text-[11px] text-green-500 font-semibold">↑ 22% dari minggu lalu</p></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Consultations */}
        <motion.div {...fade} transition={{delay:0.4}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-900">Konsultasi Terbaru</CardTitle>
              <button className="text-[12px] font-bold text-[#1D64FB] hover:underline">Kelola Semua</button>
            </CardHeader>
            <CardContent className="space-y-1">
              {consultations.map((c,i)=>(
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer group">
                  <Avatar className="w-9 h-9 shrink-0"><AvatarImage src={c.avatar} alt={c.name} loading="lazy"/><AvatarFallback>{c.name[0]}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-bold text-slate-900 truncate group-hover:text-[#1D64FB] transition">{c.name}</p>
                      <Badge className="text-[9px] px-1.5 py-0 font-bold rounded-md bg-blue-50 text-[#1D64FB] border-blue-100">{c.type}</Badge>
                      <span className="text-[10px] text-slate-400 ml-auto font-medium shrink-0">{c.time}</span>
                    </div>
                    <p className="text-[12px] text-slate-400 truncate mt-0.5">{c.msg}</p>
                  </div>
                  {c.unread>0&&<div className="w-5 h-5 rounded-full bg-[#1D64FB] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">{c.unread}</div>}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div {...fade} transition={{delay:0.5}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-900">Jadwal Hari Ini</CardTitle>
              <button className="text-[12px] font-bold text-[#1D64FB] hover:underline">Lihat semua</button>
            </CardHeader>
            <CardContent className="space-y-1">
              {schedule.map((s,i)=>(
                <div key={i} className="p-3 rounded-xl hover:bg-slate-50 transition">
                  <p className="text-[11px] text-slate-400 font-semibold mb-1">{s.time}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-bold text-slate-900">{s.name}</p>
                      <p className="text-[11px] text-slate-400">{s.desc}</p>
                      {/* Ronde 2: Live Countdown untuk sesi berlangsung */}
                      {s.status==="Berlangsung"&&<p className="text-[10px] text-[#1D64FB] font-bold mt-0.5 animate-pulse">⏱ Selesai dalam {formatCountdown(countdown)}</p>}
                    </div>
                    <Badge className={`text-[10px] font-bold rounded-lg border-0 ${s.color}`}>{s.status}</Badge>
                  </div>
                </div>
              ))}
              <Separator className="my-2"/>
              {/* Saran #2: Micro-copy otoritatif */}
              <Button variant="outline" className="w-full rounded-xl border-dashed border-slate-200 text-slate-500 hover:text-[#1D64FB] hover:border-[#1D64FB] font-bold text-[13px] h-10">+ Tambah Jadwal Konsultasi</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 4. Bottom Row: Reviews + Monthly Revenue + Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Ulasan Terbaru */}
        <motion.div {...fade} transition={{delay:0.6}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-900">Ulasan Terbaru</CardTitle>
              <button className="text-[12px] font-bold text-[#1D64FB] hover:underline">Lihat semua</button>
            </CardHeader>
            <CardContent>
              {recentReviews.length > 0 ? (
                <div className="space-y-4">
                  {recentReviews.slice(0, 2).map((r, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 relative">
                      {i === 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#1D64FB] flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {r.name?.charAt(0) || "A"}
                        </div>
                        <div className="flex-1"><p className="text-[13px] font-bold text-slate-900">{r.name}</p></div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s=><svg key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-yellow-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                          <span className="text-[11px] text-slate-400 font-medium ml-1">{r.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{r.date}</span>
                      </div>
                      <p className="text-[12px] text-slate-600 leading-relaxed mb-3">{r.text}</p>
                      {r.reply && (
                        <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                          <p className="text-[11px] text-green-700 italic">&ldquo;{r.reply}&rdquo;</p>
                          <p className="text-[10px] text-green-500 mt-1 font-medium">Dibalas</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-8 h-8"><AvatarImage src="https://i.pravatar.cc/100?u=andi" alt="Andi"/><AvatarFallback>A</AvatarFallback></Avatar>
                    <div className="flex-1"><p className="text-[13px] font-bold text-slate-900">Andi Wijaya</p></div>
                    <div className="flex items-center gap-1">{[1,2,3,4,5].map(s=><svg key={s} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}<span className="text-[11px] text-slate-400 font-medium ml-1">5.0</span></div>
                    <span className="text-[10px] text-slate-400">16 Mei 2024</span>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-relaxed mb-3">Penjelasannya sangat detail dan mudah dipahami. Solusi yang diberikan juga sangat membantu masalah bisnis saya. Sangat profesional!</p>
                </div>
              )}
              <div className="flex justify-center gap-1.5 mt-4">
                {Array.from({ length: Math.max(1, Math.min(recentReviews.length || 1, 2)) }).map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#1D64FB]' : 'bg-slate-200'}`}/>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pendapatan Bulanan */}
        <motion.div {...fade} transition={{delay:0.7}}>
          <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
            <CardHeader className="pb-0 flex-row items-center justify-between">
              <CardTitle className="text-[15px] font-bold text-slate-900">Pendapatan Bulanan</CardTitle>
              <Badge variant="outline" className="text-[11px] font-semibold text-slate-500 rounded-lg">Mei 2024</Badge>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-2">Rp 12.450.000</h3>
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
                <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition text-left group">
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
