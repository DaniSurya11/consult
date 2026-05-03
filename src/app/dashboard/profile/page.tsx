"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const role = typeof window !== "undefined" ? localStorage.getItem("user_role") || "client" : "client";
  const name = typeof window !== "undefined" ? localStorage.getItem("user_name") || "User" : "User";
  const email = typeof window !== "undefined" ? localStorage.getItem("user_email") || "" : "";

  const isLawyer = role === "lawyer";

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Profil Saya</h1>
        <p className="text-sm text-slate-500 font-medium">Kelola informasi profil Anda</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative">
            <div className={`w-24 h-24 rounded-2xl overflow-hidden border-2 ${isLawyer ? "border-[#1D64FB]" : "border-slate-200"}`}>
              <img 
                src={isLawyer ? "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA" : "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                alt={name} className="w-full h-full object-cover" 
              />
            </div>
            {isLawyer && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#1D64FB] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.441A3 3 0 018.5 2h3a3 3 0 012.233 1.441l.73 1.22A3 3 0 0016.925 6h1.075a3 3 0 013 3v3a3 3 0 01-3 3h-1.075a3 3 0 00-2.462 1.339l-.73 1.22A3 3 0 0111.5 18h-3a3 3 0 01-2.233-1.441l-.73-1.22A3 3 0 003.075 14H2a3 3 0 01-3-3V9a3 3 0 013-3h1.075a3 3 0 002.462-1.339l.73-1.22zM8.7 10.7l-1.4-1.4a1 1 0 00-1.4 1.4l2.1 2.1c.4.4 1 .4 1.4 0l4.2-4.2a1 1 0 10-1.4-1.4L8.7 10.7z" clipRule="evenodd"></path></svg>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-slate-900">{name}</h2>
              {isLawyer && <span className="text-[9px] font-black uppercase tracking-widest text-[#1D64FB] bg-blue-50 px-1.5 py-0.5 rounded-md">Pro</span>}
            </div>
            <p className="text-sm text-slate-500 mb-4">{email}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg">{isLawyer ? "Lawyer Terverifikasi" : "Klien"}</span>
              <span className="text-[11px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">Aktif sejak 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Fields */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">Informasi Pribadi</h3>
        {[
          { label: "Nama Lengkap", value: name },
          { label: "Email", value: email },
          { label: "Telepon", value: "+62 812 XXXX XXXX" },
          { label: "Alamat", value: "Jakarta, Indonesia" },
        ].map(field => (
          <div key={field.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-32 shrink-0">{field.label}</span>
            <span className="text-sm text-slate-700 font-medium">{field.value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="rounded-xl h-10 px-6 text-sm font-bold text-slate-700 border-slate-200">
          Edit Profil
        </Button>
        <Button variant="outline" className="rounded-xl h-10 px-6 text-sm font-bold text-red-500 border-red-200 hover:bg-red-50">
          Hapus Akun
        </Button>
      </div>
    </div>
  );
}
