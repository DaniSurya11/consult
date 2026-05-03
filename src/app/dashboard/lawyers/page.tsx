"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Scale, 
  Briefcase, 
  Star,
  ChevronDown
} from "lucide-react";

// Mock Data Lawyer
const lawyers = [
  {
    id: "1",
    name: "Dr. Bima Pratama, S.H.",
    title: "Spesialis Hukum Bisnis & Kontrak",
    category: "Bisnis",
    rating: 4.9,
    reviews: 128,
    price: 250000,
    experience: "12 Tahun",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA",
    isOnline: true,
    isVerified: true,
    tags: ["M&A", "HAKI", "Startup"]
  },
  {
    id: "2",
    name: "Siska Amelia, S.H., M.H.",
    title: "Pakar Hukum Keluarga & Perceraian",
    category: "Keluarga",
    rating: 4.8,
    reviews: 95,
    price: 200000,
    experience: "8 Tahun",
    avatar: "https://i.pravatar.cc/150?u=siska",
    isOnline: true,
    isVerified: true,
    tags: ["Hak Asuh", "Warisan", "Mediasi"]
  },
  {
    id: "3",
    name: "Andrianto Wijaya, S.H.",
    title: "Pengacara Pidana & Hak Asasi",
    category: "Pidana",
    rating: 4.7,
    reviews: 210,
    price: 300000,
    experience: "15 Tahun",
    avatar: "https://i.pravatar.cc/150?u=andri",
    isOnline: false,
    isVerified: true,
    tags: ["Litigasi", "Banding", "Narkotika"]
  },
  {
    id: "4",
    name: "Dr. Hendra Saputra, S.H.",
    title: "Konsultan Hukum Properti & Agraria",
    category: "Properti",
    rating: 4.9,
    reviews: 64,
    price: 225000,
    experience: "10 Tahun",
    avatar: "https://i.pravatar.cc/150?u=hendra",
    isOnline: true,
    isVerified: true,
    tags: ["Tanah", "Sengketa", "Sertifikasi"]
  },
  {
    id: "5",
    name: "Maria Ulfa, S.H.",
    title: "Ahli Hukum Ketenagakerjaan",
    category: "Bisnis",
    rating: 4.6,
    reviews: 42,
    price: 180000,
    experience: "6 Tahun",
    avatar: "https://i.pravatar.cc/150?u=maria",
    isOnline: true,
    isVerified: false,
    tags: ["PHK", "Kontrak Kerja", "HR"]
  }
];

const categories = ["Semua", "Bisnis", "Keluarga", "Pidana", "Properti", "Perdata"];

export default function LawyerMarketplace() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredLawyers = useMemo(() => {
    return lawyers.filter(l => {
      const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                          l.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "Semua" || l.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* 1. Header & Search — Premium Focus */}
      <section className="text-center space-y-6 py-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Temukan Solusi Hukum <span className="text-[#1D64FB]">Terbaik</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-sm md:text-base">
            Konsultasi langsung dengan ribuan lawyer profesional terverifikasi di seluruh Indonesia.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute inset-0 bg-[#1D64FB]/5 blur-2xl rounded-full group-hover:bg-[#1D64FB]/10 transition-colors duration-500" />
          <div className="relative flex items-center bg-white border border-slate-200 shadow-xl shadow-blue-900/5 rounded-[2rem] p-1.5 focus-within:ring-2 ring-[#1D64FB]/20 transition-all">
            <div className="pl-4 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              placeholder="Cari nama lawyer atau spesialisasi hukum..."
              className="flex-1 border-0 outline-none text-slate-900 font-medium placeholder:text-slate-400 h-12 md:h-14 bg-transparent text-base px-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="hidden md:flex bg-[#1D64FB] hover:bg-[#1D64FB]/90 text-white rounded-full px-8 h-12 md:h-14 font-bold text-[15px] gap-2">
              Cari Sekarang
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Categories & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat 
                ? "bg-[#1D64FB] border-[#1D64FB] text-white shadow-lg shadow-blue-500/20" 
                : "bg-white border-slate-200 text-slate-600 hover:border-[#1D64FB] hover:text-[#1D64FB]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="rounded-full border-slate-200 text-slate-600 font-bold gap-2 px-6 h-11 shrink-0"
        >
          <Filter className="w-4 h-4" />
          Filter
          <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* 3. Lawyer Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredLawyers.map((lawyer) => (
            <motion.div 
              key={lawyer.id} 
              variants={item}
              layout
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="border-0 shadow-[var(--lc-shadow-card)] bg-white rounded-3xl overflow-hidden hover:shadow-[var(--lc-shadow-hover)] transition-all duration-300 h-full flex flex-col">
                <CardContent className="p-0 flex-1 flex flex-col">
                  {/* Card Header: Avatar & Top Info */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-50">
                          <img src={lawyer.avatar} alt={lawyer.name} className="w-full h-full object-cover" />
                        </div>
                        {lawyer.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white ring-2 ring-green-100" />
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1 text-[#1D64FB] font-black text-sm">
                          <Star className="w-4 h-4 fill-current" />
                          {lawyer.rating}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lawyer.reviews} Ulasan</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#1D64FB] transition-colors">{lawyer.name}</h3>
                        {lawyer.isVerified && (
                          <CheckCircle2 className="w-5 h-5 text-[#1D64FB]" />
                        )}
                      </div>
                      <p className="text-[13px] text-slate-500 font-medium leading-relaxed">{lawyer.title}</p>
                    </div>
                  </div>

                  {/* Badges/Tags */}
                  <div className="px-6 pb-4 flex flex-wrap gap-1.5">
                    {lawyer.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/30 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#1D64FB] shadow-sm">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-none mb-1">Pengalaman</p>
                        <p className="text-[12px] font-extrabold text-slate-900">{lawyer.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-green-500 shadow-sm">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-none mb-1">Kategori</p>
                        <p className="text-[12px] font-extrabold text-slate-900">{lawyer.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & CTA */}
                  <div className="p-6 pt-4 mt-auto flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Mulai dari</p>
                      <p className="text-lg font-black text-[#1D64FB]">Rp {lawyer.price.toLocaleString("id-ID")}<span className="text-xs text-slate-400 font-bold"> /sesi</span></p>
                    </div>
                    <Link href={`/dashboard/detail-profile/${lawyer.id}`}>
                      <Button className="bg-slate-900 hover:bg-[#1D64FB] text-white rounded-2xl h-11 px-6 font-bold text-[13px] transition-all group-hover:shadow-xl group-hover:shadow-blue-500/20 border-0">
                        Pesan Sesi
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 4. Empty State */}
      {filteredLawyers.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="py-20 text-center space-y-4"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Lawyer tidak ditemukan</h3>
            <p className="text-slate-500 font-medium">Coba gunakan kata kunci lain atau ubah kategori filter.</p>
          </div>
          <Button 
            variant="link" 
            onClick={() => {setSearch(""); setActiveCategory("Semua");}}
            className="text-[#1D64FB] font-bold"
          >
            Reset Semua Filter
          </Button>
        </motion.div>
      )}

      {/* 5. Pagination Placeholder */}
      <div className="flex justify-center pt-8">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map(p => (
            <button key={p} className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${p===1 ? 'bg-[#1D64FB] text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-[#1D64FB] hover:text-[#1D64FB]'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
