"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const lawyers = [
  { 
    id: 1, 
    name: "Bima Pratama, S.H.", 
    verified: true,
    specialty: "Hukum Bisnis", 
    experience: "10+ tahun exp",
    rating: 4.9,
    reviews: 128,
    tags: ["Kontrak", "Perusahaan", "Investasi"],
    status: "Online",
    price: "Rp500.000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA" 
  },
  { 
    id: 2, 
    name: "Siti Halimah, S.H.", 
    verified: true,
    specialty: "Hukum Keluarga", 
    experience: "7+ tahun exp",
    rating: 4.8,
    reviews: 96,
    tags: ["Perceraian", "Hak Asuh Anak", "Harta Gono-gini"],
    status: "Online",
    price: "Rp400.000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClCtB_n6jEhhPenDhf10PmiIs8PmjS6xvS7S6iA79EqKvpcXLltq-HcFjfS1-zl-4CJ1vZMtaO7RxQj_K1uvZGQ9A3IJNDi--gc_lYrrfDsUWL9CzMuj1qOd3iYfzoFRSm2kHY7aE98a4NA0LzncBdb97lMFhUdkz-pO1c_gEOR2a6kEjm2QidX2QFdRZfsP_W20yWNnzLlt4Zoqk8fZbdqpa-lDavulAgvZAw2fG-OHaRPRJ7wUcL2pi0KpeOZSA6Lji4EnoXArg" 
  },
  { 
    id: 3, 
    name: "Reza Fahlevi, S.H.", 
    verified: true,
    specialty: "Hukum Pidana", 
    experience: "8+ tahun exp",
    rating: 4.9,
    reviews: 112,
    tags: ["Pidana Umum", "Narkotika", "Cyber Crime"],
    status: "Online",
    price: "Rp600.000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA" 
  },
  { 
    id: 4, 
    name: "Nadia Putri, S.H.", 
    verified: true,
    specialty: "Properti & Real Estate", 
    experience: "6+ tahun exp",
    rating: 4.7,
    reviews: 78,
    tags: ["Properti", "Sewa Menyewa", "Sertifikat"],
    status: "Offline",
    price: "Rp450.000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClCtB_n6jEhhPenDhf10PmiIs8PmjS6xvS7S6iA79EqKvpcXLltq-HcFjfS1-zl-4CJ1vZMtaO7RxQj_K1uvZGQ9A3IJNDi--gc_lYrrfDsUWL9CzMuj1qOd3iYfzoFRSm2kHY7aE98a4NA0LzncBdb97lMFhUdkz-pO1c_gEOR2a6kEjm2QidX2QFdRZfsP_W20yWNnzLlt4Zoqk8fZbdqpa-lDavulAgvZAw2fG-OHaRPRJ7wUcL2pi0KpeOZSA6Lji4EnoXArg" 
  },
  { 
    id: 5, 
    name: "Arif Rahman, S.H.", 
    verified: true,
    specialty: "Hukum Tenaga Kerja", 
    experience: "9+ tahun exp",
    rating: 4.8,
    reviews: 61,
    tags: ["PHK", "Perjanjian Kerja", "Pesangon"],
    status: "Online",
    price: "Rp350.000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA" 
  },
  { 
    id: 6, 
    name: "Dewi Sartika, S.H.", 
    verified: true,
    specialty: "Hukum Perdata", 
    experience: "5+ tahun exp",
    rating: 4.6,
    reviews: 44,
    tags: ["Perjanjian", "Gugatan", "Wanprestasi"],
    status: "Offline",
    price: "Rp300.000",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClCtB_n6jEhhPenDhf10PmiIs8PmjS6xvS7S6iA79EqKvpcXLltq-HcFjfS1-zl-4CJ1vZMtaO7RxQj_K1uvZGQ9A3IJNDi--gc_lYrrfDsUWL9CzMuj1qOd3iYfzoFRSm2kHY7aE98a4NA0LzncBdb97lMFhUdkz-pO1c_gEOR2a6kEjm2QidX2QFdRZfsP_W20yWNnzLlt4Zoqk8fZbdqpa-lDavulAgvZAw2fG-OHaRPRJ7wUcL2pi0KpeOZSA6Lji4EnoXArg" 
  }
];

// Helper: highlight matched text in search results
const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query || query.length < 1) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return <>{parts.map((part, i) => regex.test(part) ? <span key={i} className="text-[#1D64FB] font-black">{part}</span> : part)}</>;
};

// Skeleton card component
const SkeletonCard = () => (
  <div className="bg-white rounded-3xl border border-slate-200 p-5 flex flex-col h-full animate-pulse">
    <div className="flex justify-between items-center mb-4"><div className="h-3 w-14 bg-slate-100 rounded"></div><div className="h-5 w-5 bg-slate-100 rounded"></div></div>
    <div className="flex gap-4 mb-4"><div className="w-16 h-16 rounded-full bg-slate-100 shrink-0"></div><div className="flex-1 space-y-2 pt-1"><div className="h-4 w-3/4 bg-slate-100 rounded"></div><div className="h-3 w-1/2 bg-slate-100 rounded"></div><div className="h-3 w-1/3 bg-slate-100 rounded"></div></div></div>
    <div className="flex gap-1.5 mb-5"><div className="h-5 w-16 bg-slate-100 rounded"></div><div className="h-5 w-20 bg-slate-100 rounded"></div><div className="h-5 w-14 bg-slate-100 rounded"></div></div>
    <div className="mb-4 space-y-1"><div className="h-3 w-16 bg-slate-100 rounded"></div><div className="h-5 w-28 bg-slate-100 rounded"></div></div>
    <div className="flex gap-2.5 mt-auto"><div className="h-10 flex-1 bg-slate-100 rounded-xl"></div><div className="h-10 flex-1 bg-slate-100 rounded-xl"></div></div>
  </div>
);

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Cari Lawyer");
  const [isOnlineOnly, setIsOnlineOnly] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const [showNotification, setShowNotification] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  // Filter states
  const [priceFilter, setPriceFilter] = useState("Semua");
  const [ratingFilter, setRatingFilter] = useState("Semua");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Selamat datang di Law Consult!", desc: "Temukan lawyer terbaik untuk kebutuhan hukum Anda.", time: "1 jam lalu", read: true },
    { id: 2, title: "Promo Konsultasi Pertama", desc: "Dapatkan diskon 20% untuk konsultasi pertama Anda.", time: "3 jam lalu", read: true },
  ]);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Pro-Active Onboarding: Welcome Modal (Audit §7.5)
  useEffect(() => {
    if (!localStorage.getItem("lc_onboarded")) {
      setTimeout(() => setShowWelcome(true), 1200);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("chat_completed")) {
      const newNotif = { id: Date.now(), title: "Konsultasi Selesai", desc: "Sesi konsultasi Anda telah berhasil diselesaikan. Terima kasih atas ulasan Anda!", time: "Baru saja", read: false };
      setNotifications(prev => [newNotif, ...prev]);
      setShowNotification(true);
      setShowToast(true);
      sessionStorage.removeItem("chat_completed");
      setTimeout(() => setShowToast(false), 5000);
    }
  }, []);

  // Close popovers on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifPopover(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSuggestions(false);
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setOpenFilter(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifPopover(!showNotifPopover);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setShowNotification(false);
  };

  const searchSuggestions = searchQuery.length > 0 ? lawyers.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 4) : [];

  // Parse price string to number for filtering
  const parsePrice = (p: string) => parseInt(p.replace(/[^0-9]/g, ''));

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesCategory = activeCategory === "Semua" || lawyer.specialty.includes(activeCategory);
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) || lawyer.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnline = isOnlineOnly ? lawyer.status === "Online" : true;
    const price = parsePrice(lawyer.price);
    const matchesPrice = priceFilter === "Semua" || (priceFilter === "< 400rb" && price < 400000) || (priceFilter === "400rb - 500rb" && price >= 400000 && price <= 500000) || (priceFilter === "> 500rb" && price > 500000);
    const matchesRating = ratingFilter === "Semua" || (ratingFilter === "4.9+" && lawyer.rating >= 4.9) || (ratingFilter === "4.8+" && lawyer.rating >= 4.8) || (ratingFilter === "4.5+" && lawyer.rating >= 4.5);
    return matchesCategory && matchesSearch && matchesOnline && matchesPrice && matchesRating;
  });

  return (
    <div className="flex flex-col h-full bg-white px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      
          {/* Search Bar with Auto-complete */}
          <div ref={searchRef} className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              placeholder="Cari spesialisasi atau nama lawyer..." 
              className="w-full pl-10 pr-24 py-2.5 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D64FB] focus:border-transparent transition-all shadow-sm" 
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#1D64FB] hover:bg-blue-700 text-white font-medium text-sm px-6 rounded-md transition-colors">
              Cari
            </button>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-lg z-40 overflow-hidden">
                {searchSuggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSearchQuery(s.name); setShowSuggestions(false); router.push(`/dashboard/detail-profile/${s.id}`); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100 shrink-0">
                      <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-800 truncate"><HighlightText text={s.name} query={searchQuery} /></p>
                      <p className="text-[11px] text-slate-500"><HighlightText text={s.specialty} query={searchQuery} /> • {s.price}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Pills Row */}
          <div className="min-w-0 w-full mb-6">
            <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
              <button 
                onClick={() => setActiveCategory("Semua")}
                className={`inline-flex items-center gap-2 shrink-0 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors whitespace-nowrap ${
                  activeCategory === "Semua" ? "bg-[#1D64FB] text-white hover:bg-blue-700" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}>
                Semua
              </button>
              {[
                { name: "Perdata", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                { name: "Pidana", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
                { name: "Bisnis", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                { name: "Digital", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                { name: "Keluarga", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
              ].map((cat) => {
                const isActive = activeCategory === cat.name;
                return (
                  <button 
                    key={cat.name} 
                    onClick={() => setActiveCategory(cat.name)}
                    className={`inline-flex items-center gap-2 shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm whitespace-nowrap ${
                      isActive ? "bg-[#1D64FB] text-white hover:bg-blue-700" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}>
                    <svg className="w-4 h-4 shrink-0" style={{ minWidth: 16, minHeight: 16 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} /></svg>
                    {cat.name}
                  </button>
                );
              })}
              <button 
                onClick={() => setActiveCategory("Lainnya")}
                className={`inline-flex items-center gap-2 shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm whitespace-nowrap ${
                  activeCategory === "Lainnya" ? "bg-[#1D64FB] text-white hover:bg-blue-700" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}>
                Lainnya
                <svg className="w-4 h-4 shrink-0" style={{ minWidth: 16, minHeight: 16 }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div ref={filterRef} className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center gap-2">

              {/* Harga Filter */}
              <div className="relative">
                <button onClick={() => setOpenFilter(openFilter === 'harga' ? null : 'harga')} className={`px-3 py-1.5 shrink-0 border rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm ${priceFilter !== 'Semua' ? 'bg-blue-50 border-[#1D64FB] text-[#1D64FB]' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}>
                  Harga{priceFilter !== 'Semua' && `: ${priceFilter}`}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {openFilter === 'harga' && (
                  <div className="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl border border-slate-200 shadow-lg z-40 overflow-hidden">
                    {['Semua', '< 400rb', '400rb - 500rb', '> 500rb'].map(opt => (
                      <button key={opt} onClick={() => { setPriceFilter(opt); setOpenFilter(null); }} className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${priceFilter === opt ? 'text-[#1D64FB] bg-blue-50/50 font-bold' : 'text-slate-700'}`}>{opt === 'Semua' ? 'Semua Harga' : opt}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating Filter */}
              <div className="relative">
                <button onClick={() => setOpenFilter(openFilter === 'rating' ? null : 'rating')} className={`px-3 py-1.5 shrink-0 border rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm ${ratingFilter !== 'Semua' ? 'bg-blue-50 border-[#1D64FB] text-[#1D64FB]' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}>
                  Rating{ratingFilter !== 'Semua' && `: ${ratingFilter}`}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {openFilter === 'rating' && (
                  <div className="absolute left-0 top-full mt-1 w-36 bg-white rounded-xl border border-slate-200 shadow-lg z-40 overflow-hidden">
                    {['Semua', '4.9+', '4.8+', '4.5+'].map(opt => (
                      <button key={opt} onClick={() => { setRatingFilter(opt); setOpenFilter(null); }} className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5 ${ratingFilter === opt ? 'text-[#1D64FB] bg-blue-50/50 font-bold' : 'text-slate-700'}`}>
                        {opt !== 'Semua' && <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>}
                        {opt === 'Semua' ? 'Semua Rating' : opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Lokasi (static placeholder) */}
              <button className="px-3 py-1.5 shrink-0 bg-white hover:bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors shadow-sm">
                Lokasi
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              <div className="h-5 w-px bg-slate-200 mx-1"></div>

              {/* Online Toggle */}
              <label className="flex items-center gap-2 cursor-pointer ml-1">
                <span className="text-xs font-medium text-slate-700">Hanya yang Online</span>
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={isOnlineOnly} onChange={() => setIsOnlineOnly(!isOnlineOnly)} />
                  <div className={`block w-8 h-4 rounded-full transition-colors ${isOnlineOnly ? 'bg-[#1D64FB]' : 'bg-slate-300'}`}></div>
                  <div className={`absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition-transform ${isOnlineOnly ? 'transform translate-x-4 shadow-sm' : 'shadow-sm'}`}></div>
                </div>
              </label>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 h-8 px-3 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
              <span className="text-xs text-slate-500 font-medium">Urutkan:</span>
              <span className="text-xs font-bold text-[#1D64FB] flex items-center gap-1.5">
                Paling Relevan
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
              </span>
            </div>
          </div>

          {/* Lawyer Marketplace Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mb-8">
              {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filteredLawyers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mb-8">
              {filteredLawyers.map((lawyer) => (
                <div key={lawyer.id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-[var(--lc-shadow-card)] hover:shadow-[var(--lc-shadow-hover)] hover:scale-[1.01] transition-all duration-300 flex flex-col h-full relative">
                  
                  {/* Card Top: Status & Favorite */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${lawyer.status === 'Online' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                      <span className={`text-[11px] font-bold ${lawyer.status === 'Online' ? 'text-green-600' : 'text-slate-500'}`}>{lawyer.status}</span>
                    </div>
                    <button className="text-slate-300 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>
                  </div>

                  {/* Card Info */}
                  <div className="flex gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                      <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="font-bold text-[15px] text-slate-900 truncate">{lawyer.name}</h3>
                        {lawyer.verified && (
                          <svg className="w-4 h-4 text-[#1D64FB] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.441A3 3 0 018.5 2h3a3 3 0 012.233 1.441l.73 1.22A3 3 0 0016.925 6h1.075a3 3 0 013 3v3a3 3 0 01-3 3h-1.075a3 3 0 00-2.462 1.339l-.73 1.22A3 3 0 0111.5 18h-3a3 3 0 01-2.233-1.441l-.73-1.22A3 3 0 003.075 14H2a3 3 0 01-3-3V9a3 3 0 013-3h1.075a3 3 0 002.462-1.339l.73-1.22zM8.7 10.7l-1.4-1.4a1 1 0 00-1.4 1.4l2.1 2.1c.4.4 1 .4 1.4 0l4.2-4.2a1 1 0 10-1.4-1.4L8.7 10.7z" clipRule="evenodd"></path></svg>
                        )}
                      </div>
                      <p className="text-[12px] text-slate-500 font-medium mb-1.5">{lawyer.specialty} • {lawyer.experience}</p>
                      <div className="flex items-center gap-1 text-[12px]">
                        <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span className="text-yellow-500 font-bold">{lawyer.rating}</span> 
                        <span className="text-slate-500">({lawyer.reviews} ulasan)</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
                    {lawyer.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[11px] font-bold text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-[11px] text-slate-500 font-medium leading-tight">Mulai dari</p>
                    <p className="text-[14px] text-slate-900 font-black"><span className="text-slate-900">{lawyer.price}</span> <span className="text-[12px] font-medium text-slate-500">/ sesi chat</span></p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2.5">
                    <Button onClick={() => router.push(`/dashboard/detail-profile/${lawyer.id}`)} variant="outline" className="flex-1 bg-white border-blue-200 text-[#1D64FB] hover:bg-blue-50 rounded-xl h-10 text-[13px] font-bold shadow-none transition-colors">
                      Lihat Profil
                    </Button>
                    <Button onClick={() => router.push(`/dashboard/checkout/${lawyer.id}`)} className="flex-1 bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-10 text-[13px] font-bold shadow-sm transition-all">
                      Chat Sekarang
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 mb-8 bg-white rounded-2xl border border-slate-200 border-dashed">
              <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <h3 className="text-lg font-bold text-slate-700 mb-1">Lawyer Tidak Ditemukan</h3>
              <p className="text-sm text-slate-500 text-center max-w-md">Maaf, kami tidak menemukan lawyer yang sesuai dengan pencarian atau filter Anda.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Semua");
                  setIsOnlineOnly(false);
                }}
                className="mt-6 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-[#1D64FB] hover:bg-slate-50 transition-colors shadow-sm"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-slate-100 pt-4 sm:pt-6 gap-3">
            <span className="text-[13px] text-slate-500 font-medium">Menampilkan 1 - 6 dari 32 lawyer</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1D64FB] text-white font-bold text-[13px] transition-colors">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] transition-colors">3</button>
              <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-[13px]">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[13px] transition-colors">6</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
          
      {/* Global Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-4 flex items-start gap-3 w-80">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">Konsultasi Selesai</h4>
              <p className="text-[12px] text-slate-500 mt-0.5">Terima kasih atas ulasan Anda. Sesi telah ditambahkan ke Riwayat Booking.</p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-slate-400 hover:text-slate-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>
      )}

      {/* Welcome Modal (Audit §7.5 - Pro-Active Onboarding) */}
      {showWelcome && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1D64FB] to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9L12 4.57 20.11 9 12 13.43 3.89 9zM12 17a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Selamat Datang di LawConsult! 🎉</h2>
              <p className="text-sm text-slate-400">Platform konsultasi hukum digital terpercaya</p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4 mb-8">
              {[
                { icon: "🔍", title: "Cari Lawyer Terbaik", desc: "Temukan lawyer terverifikasi sesuai spesialisasi yang Anda butuhkan." },
                { icon: "💬", title: "Konsultasi via Chat", desc: "Berkomunikasi langsung dengan lawyer secara real-time dan aman." },
                { icon: "🛡️", title: "Pembayaran Aman", desc: "Sistem pembayaran terlindungi dengan enkripsi end-to-end." }
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-800">{feature.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => { setShowWelcome(false); localStorage.setItem("lc_onboarded", "true"); }}
              className="w-full bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-12 text-sm font-bold shadow-sm transition-all active:scale-[0.98]"
            >
              Mulai Jelajahi →
            </button>
            <p className="text-center text-[10px] text-slate-300 mt-4 font-medium">Anda tidak akan melihat ini lagi</p>
          </div>
        </div>
      )}
    </div>
  );
}
