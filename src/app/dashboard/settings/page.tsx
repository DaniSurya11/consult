"use client";

import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const role = typeof window !== "undefined" ? localStorage.getItem("user_role") || "client" : "client";
  const name = typeof window !== "undefined" ? localStorage.getItem("user_name") || "User" : "User";

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Pengaturan</h1>
        <p className="text-sm text-slate-500 font-medium">Kelola preferensi akun Anda</p>
      </div>

      {/* Account Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">Akun</h3>
        {[
          { label: "Nama", value: name, action: "Ubah" },
          { label: "Email", value: typeof window !== "undefined" ? localStorage.getItem("user_email") || "" : "", action: "Ubah" },
          { label: "Kata Sandi", value: "••••••••••", action: "Ubah" },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
              <p className="text-sm text-slate-700 font-medium mt-0.5">{item.value}</p>
            </div>
            <Button variant="ghost" className="text-xs font-bold text-[#1D64FB] hover:bg-blue-50 rounded-lg h-8 px-3">{item.action}</Button>
          </div>
        ))}
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">Notifikasi</h3>
        {[
          { label: "Notifikasi Email", desc: "Terima pemberitahuan via email" },
          { label: "Notifikasi Push", desc: "Terima notifikasi langsung di browser" },
          { label: "Notifikasi Promo", desc: "Penawaran khusus dan diskon" },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <div>
              <p className="text-sm font-bold text-slate-700">{item.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" defaultChecked={i < 2} />
              <div className={`block w-10 h-5 rounded-full transition-colors ${i < 2 ? "bg-[#1D64FB]" : "bg-slate-300"}`}></div>
              <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${i < 2 ? "translate-x-5" : ""}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Privacy Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">Privasi & Keamanan</h3>
        <div className="flex items-center justify-between py-3 border-b border-slate-50">
          <div>
            <p className="text-sm font-bold text-slate-700">Autentikasi Dua Faktor</p>
            <p className="text-xs text-slate-400 mt-0.5">Lapisan keamanan tambahan untuk akun Anda</p>
          </div>
          <span className="text-[11px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">Aktif</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-bold text-slate-700">Riwayat Login</p>
            <p className="text-xs text-slate-400 mt-0.5">Lihat semua aktivitas login terbaru</p>
          </div>
          <Button variant="ghost" className="text-xs font-bold text-[#1D64FB] hover:bg-blue-50 rounded-lg h-8 px-3">Lihat</Button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-3">Tentang</h3>
        <div className="space-y-2 text-sm text-slate-500">
          <p>LawConsult v1.0.0</p>
          <p>© 2026 LawConsult. All rights reserved.</p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-[#1D64FB] font-bold text-xs hover:underline">Syarat & Ketentuan</a>
            <a href="#" className="text-[#1D64FB] font-bold text-xs hover:underline">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </div>
  );
}
