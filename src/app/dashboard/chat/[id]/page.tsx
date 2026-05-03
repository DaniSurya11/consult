"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getLawyerById } from "@/lib/lawyers-data";

interface ChatMessage {
  id: number;
  sender: "client" | "lawyer";
  text: string;
  time: string;
  type: "text" | "image" | "document";
  fileName?: string;
}

export default function ChatRoom() {
  const params = useParams();
  const router = useRouter();
  const lawyerId = Number(params.id);
  const lawyer = getLawyerById(lawyerId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const userRole = typeof window !== "undefined" ? localStorage.getItem("user_role") || "client" : "client";

  // Check payment AND acceptance status (Gatekeeper)
  useEffect(() => {
    if (userRole === "client") {
      const paidSessions = JSON.parse(localStorage.getItem("paid_sessions") || "[]");
      const hasPaid = paidSessions.some((s: any) => s.lawyerId === lawyerId);
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const isAccepted = bookings.some((b: any) => b.lawyerId === lawyerId && b.status === "accepted");
      if (!hasPaid && !isAccepted) {
        router.push(`/dashboard/checkout/${lawyerId}`);
      }
    }
  }, [lawyerId, router, userRole]);

  // Load messages from localStorage
  useEffect(() => {
    const chatKey = `chat_${lawyerId}`;
    const saved = localStorage.getItem(chatKey);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const initial: ChatMessage[] = [
        {
          id: 1,
          sender: "lawyer",
          text: `Selamat datang! Saya ${lawyer?.name || "Lawyer"}. Ada yang bisa saya bantu terkait masalah hukum Anda?`,
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          type: "text"
        }
      ];
      setMessages(initial);
      localStorage.setItem(chatKey, JSON.stringify(initial));
    }
  }, [lawyerId, lawyer?.name]);

  // Save messages
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${lawyerId}`, JSON.stringify(messages));
    }
  }, [messages, lawyerId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim() || sessionEnded) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      sender: userRole as "client" | "lawyer",
      text: input.trim(),
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      type: "text"
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    if (userRole === "client") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replies = [
          "Baik, saya akan menelaah hal tersebut lebih lanjut.",
          "Terima kasih atas informasinya. Berdasarkan pasal yang berlaku, saya menyarankan langkah berikut...",
          "Saya mengerti situasi Anda. Mari kita bahas opsi hukum yang tersedia.",
          "Dokumen yang Anda sebutkan sangat penting. Bisakah Anda mengirimkan salinannya?",
          "Dari segi hukum, posisi Anda cukup kuat. Saya akan membantu menyusun kronologis kasusnya."
        ];
        const reply: ChatMessage = {
          id: Date.now() + 1,
          sender: "lawyer",
          text: replies[Math.floor(Math.random() * replies.length)],
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          type: "text"
        };
        setMessages(prev => [...prev, reply]);
      }, 1500 + Math.random() * 1500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || sessionEnded) return;
    const isImage = file.type.startsWith("image/");
    const newMsg: ChatMessage = {
      id: Date.now(),
      sender: userRole as "client" | "lawyer",
      text: isImage ? "[Gambar dikirim]" : `[Dokumen: ${file.name}]`,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      type: isImage ? "image" : "document",
      fileName: file.name
    };
    setMessages(prev => [...prev, newMsg]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const endSession = () => {
    setSessionEnded(true);
    
    // 1. Update Booking status to "completed"
    const savedBookings = localStorage.getItem("bookings");
    let bookingAmount = lawyer?.price || "Rp500.000";
    let clientName = "Ahmad Rizky";
    if (savedBookings) {
      const all = JSON.parse(savedBookings);
      const bIndex = all.findIndex((b: any) => b.lawyerId === lawyerId && (b.status === "client_ready" || b.status === "accepted"));
      if (bIndex !== -1) {
        all[bIndex].status = "completed";
        bookingAmount = all[bIndex].price || bookingAmount;
        clientName = all[bIndex].clientName || clientName;
        localStorage.setItem("bookings", JSON.stringify(all));
      }
    }

    // 2. Add earnings to lawyer wallet
    const wallet = JSON.parse(localStorage.getItem("lawyer_wallet") || '{"balance":0,"transactions":[]}');
    wallet.balance += parseInt(bookingAmount.replace(/[^0-9]/g, "") || "0");
    wallet.transactions.unshift({
      id: Date.now(),
      clientName: clientName,
      amount: bookingAmount,
      date: new Date().toLocaleDateString("id-ID", { day: '2-digit', month: '2-digit', year: 'numeric' }),
      status: "completed"
    });
    localStorage.setItem("lawyer_wallet", JSON.stringify(wallet));

    // 3. Redirect Client to Review Page
    if (userRole === "client") {
      router.push(`/dashboard/review/${lawyerId}`);
    } else {
      router.push("/dashboard/lawyer");
    }
  };

  const submitRating = () => {
    setRatingSubmitted(true);
    sessionStorage.setItem("chat_completed", "true");
    setTimeout(() => router.push("/dashboard/bookings"), 1500);
  };

  if (!lawyer) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 bg-white">
        <h2 className="text-lg font-bold text-slate-700">Data tidak ditemukan</h2>
        <button onClick={() => router.push("/dashboard")} className="mt-4 text-sm font-bold text-[#1D64FB] hover:underline">Kembali ke Dashboard</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.back()} className="w-9 h-9 p-0 text-slate-400 hover:text-[#1D64FB]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </Button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-100">
              <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover" />
            </div>
            {!sessionEnded && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-[14px] font-bold text-slate-900">{lawyer.name}</h2>
              <svg className="w-4 h-4 text-[#1D64FB]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.441A3 3 0 018.5 2h3a3 3 0 012.233 1.441l.73 1.22A3 3 0 0016.925 6h1.075a3 3 0 013 3v3a3 3 0 01-3 3h-1.075a3 3 0 00-2.462 1.339l-.73 1.22A3 3 0 0111.5 18h-3a3 3 0 01-2.233-1.441l-.73-1.22A3 3 0 003.075 14H2a3 3 0 01-3-3V9a3 3 0 013-3h1.075a3 3 0 002.462-1.339l.73-1.22zM8.7 10.7l-1.4-1.4a1 1 0 00-1.4 1.4l2.1 2.1c.4.4 1 .4 1.4 0l4.2-4.2a1 1 0 10-1.4-1.4L8.7 10.7z" clipRule="evenodd"></path></svg>
            </div>
            <p className="text-[11px] text-green-600 font-bold">{sessionEnded ? "Sesi Berakhir" : "Online • Sedang Aktif"}</p>
          </div>
        </div>
        {!sessionEnded && (
          <Button onClick={endSession} variant="outline" className="border-red-200 text-red-500 hover:bg-red-50 rounded-xl h-9 text-xs font-bold px-4">
            Akhiri Sesi
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3 bg-[#F8FAFC]">
        {/* Security Indicator */}
        <div className="flex justify-center mb-2">
          <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-3 py-1 rounded-full flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            🛡️ Enkripsi End-to-End • Percakapan hukum Anda terlindungi
          </span>
        </div>
        <div className="flex justify-center mb-4">
          <span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">Hari Ini</span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender === userRole;
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                isMe ? "bg-[#1D64FB] text-white rounded-br-md" : "bg-white text-slate-800 border border-slate-100 rounded-bl-md shadow-sm"
              }`}>
                {msg.type === "document" && (
                  <div className={`flex items-center gap-2 mb-1.5 ${isMe ? "text-blue-100" : "text-slate-500"}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <span className="text-[11px] font-bold truncate">{msg.fileName}</span>
                  </div>
                )}
                {msg.type === "image" && (
                  <div className={`flex items-center gap-2 mb-1.5 ${isMe ? "text-blue-100" : "text-slate-500"}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span className="text-[11px] font-bold">{msg.fileName}</span>
                  </div>
                )}
                <p className="text-[13px] leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${isMe ? "text-blue-200" : "text-slate-400"} text-right font-medium`}>{msg.time}</p>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-slate-500 border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Session Ended Banner */}
      {sessionEnded && !showRating && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-sm font-bold text-slate-600">Sesi konsultasi telah berakhir.</p>
          <p className="text-xs text-slate-400 mt-1">Terima kasih telah menggunakan LawConsult.</p>
        </div>
      )}

      {/* Rating Modal */}
      {showRating && !ratingSubmitted && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm mx-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#1D64FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Bagaimana Konsultasinya?</h2>
            <p className="text-sm text-slate-500 mb-6">Berikan rating untuk {lawyer.name}</p>
            <div className="flex justify-center gap-2 mb-6">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setRating(s)} className="transition-transform hover:scale-110">
                  <svg className={`w-10 h-10 ${s <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                </button>
              ))}
            </div>
            <Button onClick={submitRating} disabled={rating === 0} className="w-full bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-11 text-sm font-bold disabled:opacity-50">
              Kirim Rating
            </Button>
          </div>
        </div>
      )}

      {ratingSubmitted && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-10 text-center shadow-2xl max-w-sm mx-4">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Terima Kasih!</h2>
            <p className="text-sm text-slate-500">Mengalihkan ke Riwayat Booking...</p>
          </div>
        </div>
      )}

      {/* Chat Input */}
      {!sessionEnded && (
        <div className="px-4 sm:px-6 py-3 border-t border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*,.pdf,.doc,.docx" onChange={handleFileUpload} />
            <button onClick={() => fileInputRef.current?.click()} className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-[#1D64FB] hover:bg-slate-50 transition-colors shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
            </button>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ketik pesan..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#1D64FB]/20 focus:border-[#1D64FB] transition placeholder:text-slate-400"
            />
            <button onClick={sendMessage} disabled={!input.trim()} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1D64FB] text-white hover:bg-blue-700 transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
