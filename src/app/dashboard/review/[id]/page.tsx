"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getLawyerById } from "@/lib/lawyers-data";

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const lawyer = getLawyerById(Number(params.id));
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!lawyer) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 bg-white">
        <h2 className="text-lg font-bold text-slate-700">Data tidak ditemukan</h2>
        <button onClick={() => router.push("/dashboard")} className="mt-4 text-sm font-bold text-[#1D64FB] hover:underline">Kembali ke Dashboard</button>
      </div>
    );
  }

  const handleSubmit = () => {
    if (rating === 0) return;
    setIsSubmitted(true);
    
    // 3. Save Review
    const savedReviews = localStorage.getItem("lawyer_reviews");
    const reviews = savedReviews ? JSON.parse(savedReviews) : [];
    
    // We try to get the client name from the last booking
    let clientName = "Ahmad Rizky";
    const savedBookings = localStorage.getItem("bookings");
    if (savedBookings) {
      const all = JSON.parse(savedBookings);
      const lastBooking = all.find((b: any) => b.lawyerId === lawyer.id);
      if (lastBooking) clientName = lastBooking.clientName || clientName;
    }

    reviews.unshift({
      id: Date.now(),
      name: clientName,
      rating: rating,
      date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
      text: reviewText || "Pelayanan yang sangat memuaskan.",
      reply: null
    });
    localStorage.setItem("lawyer_reviews", JSON.stringify(reviews));

    setTimeout(() => {
      sessionStorage.setItem("chat_completed", "true");
      router.push("/dashboard");
    }, 2500);
  };

  return (
    <div className="bg-white min-h-full flex items-center justify-center py-10">
      {/* Success State */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-10 text-center shadow-2xl max-w-sm mx-4">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Terima Kasih!</h2>
            <p className="text-sm text-slate-500">Ulasan Anda telah dikirim. Mengarahkan ke Dashboard...</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-lg mx-auto mb-4">
            <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] mb-1 tracking-tight">Konsultasi Selesai!</h1>
          <p className="text-sm text-slate-500 font-medium">Bagaimana pengalaman Anda bersama {lawyer.name}?</p>
        </div>

        {/* Rating Card */}
        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 mb-6">
          {/* Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="transition-all duration-200 hover:scale-125 active:scale-95"
              >
                <svg 
                  className={`w-10 h-10 transition-colors ${
                    star <= (hoverRating || rating) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-slate-200 fill-slate-200"
                  }`} 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-sm font-bold text-[#0F172A] mb-4">
              {rating === 5 ? "Luar Biasa! ⭐" : rating === 4 ? "Sangat Baik!" : rating === 3 ? "Cukup Baik" : rating === 2 ? "Kurang Memuaskan" : "Tidak Memuaskan"}
            </p>
          )}

          {/* Review Text */}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Ceritakan pengalaman konsultasi Anda (opsional)..."
            rows={4}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D64FB] focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <Button 
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full bg-[#1D64FB] hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl h-12 text-sm font-bold shadow-sm transition-all"
        >
          Kirim Ulasan
        </Button>
        <button 
          onClick={() => router.push("/dashboard")}
          className="w-full mt-3 text-sm font-medium text-slate-500 hover:text-[#1D64FB] transition-colors text-center py-2"
        >
          Lewati
        </button>
      </div>
    </div>
  );
}
