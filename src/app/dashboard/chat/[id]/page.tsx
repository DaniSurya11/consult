"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getLawyerById } from "@/lib/lawyers-data";

interface Message {
  id: number;
  sender: "user" | "lawyer";
  text: string;
  time: string;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const lawyer = getLawyerById(Number(params.id));
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEndModal, setShowEndModal] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "lawyer", text: `Selamat datang di sesi konsultasi! Saya ${lawyer?.name || "Lawyer"}. Ada yang bisa saya bantu hari ini?`, time: "Baru saja" },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!lawyer) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 bg-white">
        <h2 className="text-lg font-bold text-slate-700">Sesi tidak ditemukan</h2>
        <button onClick={() => router.push("/dashboard")} className="mt-4 text-sm font-bold text-[#1D64FB] hover:underline">Kembali ke Dashboard</button>
      </div>
    );
  }

  const autoReplies = [
    "Baik, saya memahami permasalahan Anda. Berdasarkan pengalaman saya, kasus seperti ini memiliki beberapa opsi penyelesaian.",
    "Dari sudut pandang hukum, langkah pertama yang perlu Anda lakukan adalah mengumpulkan bukti-bukti pendukung terlebih dahulu.",
    "Saya sarankan untuk membuat kronologis kejadian secara tertulis. Ini akan sangat membantu dalam proses selanjutnya.",
    "Untuk langkah selanjutnya, kita bisa mengajukan somasi terlebih dahulu sebelum membawa kasus ini ke jalur litigasi.",
    "Apakah ada dokumen lain yang ingin Anda tanyakan? Saya siap membantu hingga sesi konsultasi ini selesai.",
  ];

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const userMsg: Message = { id: messages.length + 1, sender: "user", text: inputText, time: timeStr };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Auto reply after a delay
    setTimeout(() => {
      const replyIndex = Math.min(messages.length - 1, autoReplies.length - 1);
      const replyTime = new Date();
      const replyTimeStr = `${replyTime.getHours().toString().padStart(2, '0')}:${replyTime.getMinutes().toString().padStart(2, '0')}`;
      const lawyerMsg: Message = { id: messages.length + 2, sender: "lawyer", text: autoReplies[replyIndex >= 0 ? replyIndex : 0], time: replyTimeStr };
      setMessages((prev) => [...prev, lawyerMsg]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEndSession = () => {
    setShowEndModal(false);
    router.push(`/dashboard/review/${lawyer.id}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="shrink-0 px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/dashboard")} className="text-slate-400 hover:text-[#1D64FB] transition-colors mr-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
            <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-[#0F172A]">{lawyer.name}</h2>
              <svg className="w-4 h-4 text-[#1D64FB] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.441A3 3 0 018.5 2h3a3 3 0 012.233 1.441l.73 1.22A3 3 0 0016.925 6h1.075a3 3 0 013 3v3a3 3 0 01-3 3h-1.075a3 3 0 00-2.462 1.339l-.73 1.22A3 3 0 0111.5 18h-3a3 3 0 01-2.233-1.441l-.73-1.22A3 3 0 003.075 14H2a3 3 0 01-3-3V9a3 3 0 013-3h1.075a3 3 0 002.462-1.339l.73-1.22zM8.7 10.7l-1.4-1.4a1 1 0 00-1.4 1.4l2.1 2.1c.4.4 1 .4 1.4 0l4.2-4.2a1 1 0 10-1.4-1.4L8.7 10.7z" clipRule="evenodd"></path></svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-[11px] font-medium text-green-600">Sedang Aktif</span>
            </div>
          </div>
        </div>
        <Button 
          onClick={() => setShowEndModal(true)}
          variant="outline"
          className="bg-white border-red-200 text-red-500 hover:bg-red-50 rounded-xl h-9 px-4 text-xs font-bold shadow-none transition-colors"
        >
          Selesaikan Sesi
        </Button>
      </div>

      {/* Session Info Banner */}
      <div className="shrink-0 px-6 py-2.5 bg-blue-50 border-b border-blue-100">
        <p className="text-[11px] text-[#1D64FB] font-medium text-center">
          🔒 Sesi konsultasi aktif • {lawyer.specialty} • Durasi: 60 menit
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 smooth-scroll">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] ${msg.sender === "user" ? "order-2" : ""}`}>
              {msg.sender === "lawyer" && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-100 shrink-0">
                    <img src={lawyer.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600">{lawyer.name}</span>
                </div>
              )}
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user" 
                  ? "bg-[#1D64FB] text-white rounded-br-md" 
                  : "bg-[#F8FAFC] border border-slate-200 text-slate-700 rounded-bl-md"
              }`}>
                {msg.text}
              </div>
              <p className={`text-[10px] text-slate-400 mt-1 ${msg.sender === "user" ? "text-right" : ""}`}>{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 px-6 py-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-[#1D64FB] transition-colors shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan Anda..."
              className="w-full pl-4 pr-12 py-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D64FB] focus:border-transparent transition-all"
            />
            <button 
              onClick={sendMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#1D64FB] hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* End Session Modal */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Selesaikan Konsultasi?</h3>
            <p className="text-sm text-slate-500 mb-6">Sesi konsultasi ini akan ditutup dan Anda akan diminta untuk memberikan ulasan.</p>
            <div className="flex gap-3">
              <Button onClick={() => setShowEndModal(false)} variant="outline" className="flex-1 rounded-xl h-10 text-sm font-bold border-slate-200 text-slate-700">
                Batal
              </Button>
              <Button onClick={handleEndSession} className="flex-1 bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-10 text-sm font-bold">
                Ya, Selesaikan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
