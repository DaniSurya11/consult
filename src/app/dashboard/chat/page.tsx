"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ChatListPage() {
  const router = useRouter();
  const [role, setRole] = useState("client");
  const [activeChats, setActiveChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("user_role") || "client";
    setRole(storedRole);
    
    const loadChats = () => {
      const saved = localStorage.getItem("bookings");
      if (saved) {
        const all = JSON.parse(saved);
        // Only show chats where client is ready (meaning the room is active)
        const active = all.filter((b: any) => 
          b.status === "client_ready" || (storedRole === "lawyer" ? false : b.status === "accepted")
        );
        setActiveChats(active);
      }
      setIsLoading(false);
    };

    loadChats();
    const interval = setInterval(loadChats, 2000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Memuat data...</div>;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Pesan & Chat</h1>
        <p className="text-sm text-slate-500 font-medium">Ruang konsultasi aktif Anda.</p>
      </div>

      {activeChats.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
            <svg className="w-12 h-12 text-[#1D64FB] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Tidak Ada Chat Aktif</h2>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mb-8">
            Saat ini tidak ada sesi konsultasi yang sedang berlangsung.
          </p>
          <Button onClick={() => router.push(role === "client" ? "/dashboard/lawyers" : "/dashboard/active")} className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-11 px-8 text-sm font-bold shadow-sm">
            {role === "client" ? "Cari Lawyer" : "Lihat Permintaan"}
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {activeChats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => router.push(`/dashboard/chat/${chat.lawyerId}`)}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-[#1D64FB] hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  {role === "client" ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100">
                      <img src={chat.lawyerImg} alt={chat.lawyerName} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#1D64FB] flex items-center justify-center text-white font-bold text-lg">
                      {chat.clientName?.charAt(0) || "A"}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-[#1D64FB] transition-colors">
                    {role === "client" ? chat.lawyerName : chat.clientName || "Ahmad Rizky"}
                  </h3>
                  <p className="text-[12px] text-green-600 font-bold mt-0.5">Online • Sedang Aktif</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-[#1D64FB] transition-colors text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
