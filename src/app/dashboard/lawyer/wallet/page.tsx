"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  id: number;
  clientName: string;
  amount: string;
  date: string;
  status: string;
}

export default function LawyerWallet() {
  const [wallet, setWallet] = useState({ balance: 0, transactions: [] as Transaction[] });
  const [isLoading, setIsLoading] = useState(true);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const saved = localStorage.getItem("lawyer_wallet");
      if (saved) {
        setWallet(JSON.parse(saved));
      } else {
        // Default data for demo
        const defaultWallet = {
          balance: 2500000,
          transactions: [
            { id: 1, clientName: "Andi Wijaya", amount: "Rp500.000", date: "01/05/2026", status: "completed" },
            { id: 2, clientName: "Siti Nurhaliza", amount: "Rp500.000", date: "30/04/2026", status: "completed" },
            { id: 3, clientName: "PT Maju Bersama", amount: "Rp750.000", date: "28/04/2026", status: "completed" },
            { id: 4, clientName: "Rudi Hartono", amount: "Rp500.000", date: "25/04/2026", status: "completed" },
            { id: 5, clientName: "Maya Sari", amount: "Rp250.000", date: "22/04/2026", status: "withdrawn" },
          ]
        };
        localStorage.setItem("lawyer_wallet", JSON.stringify(defaultWallet));
        setWallet(defaultWallet);
      }
      setIsLoading(false);
      
      // Clear wallet badge by marking all completed bookings as seen
      const savedBookings = localStorage.getItem("bookings");
      if (savedBookings) {
        try {
          const bookings = JSON.parse(savedBookings);
          let updated = false;
          const newBookings = bookings.map((b: any) => {
            if (b.status === "completed" && !b.walletSeen) {
              updated = true;
              return { ...b, walletSeen: true };
            }
            return b;
          });
          if (updated) {
            localStorage.setItem("bookings", JSON.stringify(newBookings));
          }
        } catch (e) {}
      }
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount.replace(/[^0-9]/g, ""));
    if (!amount || amount <= 0 || amount > wallet.balance) return;

    const updated = {
      balance: wallet.balance - amount,
      transactions: [
        { id: Date.now(), clientName: "Penarikan Dana", amount: `Rp${amount.toLocaleString("id-ID")}`, date: new Date().toLocaleDateString("id-ID"), status: "withdrawn" },
        ...wallet.transactions
      ]
    };
    setWallet(updated);
    localStorage.setItem("lawyer_wallet", JSON.stringify(updated));
    setWithdrawSuccess(true);
    setTimeout(() => {
      setShowWithdraw(false);
      setWithdrawSuccess(false);
      setWithdrawAmount("");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-slate-100 rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-2xl"></div>)}
          </div>
          <div className="h-64 bg-slate-100 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dompet Saya</h1>
          <p className="text-sm text-slate-500 font-medium">Kelola pendapatan dan penarikan dana Anda</p>
        </div>
        <Button onClick={() => setShowWithdraw(true)} className="bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-10 px-6 text-[13px] font-bold shadow-sm">
          Tarik Saldo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-[#1D64FB] to-blue-700 rounded-2xl text-white">
          <CardContent className="p-6">
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2">Saldo Aktif</p>
            <p className="text-3xl font-black">Rp{wallet.balance.toLocaleString("id-ID")}</p>
            <p className="text-blue-200 text-xs font-medium mt-2">Siap untuk ditarik</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Pendapatan</p>
            <p className="text-2xl font-black text-slate-900">Rp{(wallet.balance + 250000).toLocaleString("id-ID")}</p>
            <p className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
              +12% bulan ini
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Konsultasi Selesai</p>
            <p className="text-2xl font-black text-slate-900">{wallet.transactions.filter(t => t.status === "completed").length}</p>
            <p className="text-slate-400 text-xs font-medium mt-2">Bulan ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Riwayat Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {wallet.transactions.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                </div>
                <p className="text-sm font-bold text-slate-600">Belum ada transaksi</p>
                <p className="text-xs text-slate-400 mt-1">Transaksi akan muncul setelah konsultasi pertama Anda.</p>
              </div>
            ) : (
              wallet.transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.status === "withdrawn" ? "bg-orange-50 text-orange-500" : "bg-green-50 text-green-500"}`}>
                      {tx.status === "withdrawn" ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                      )}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-900">{tx.clientName}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-[13px] font-black ${tx.status === "withdrawn" ? "text-orange-500" : "text-green-500"}`}>
                      {tx.status === "withdrawn" ? "-" : "+"}{tx.amount}
                    </p>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${tx.status === "withdrawn" ? "text-orange-400" : "text-green-400"}`}>
                      {tx.status === "withdrawn" ? "Ditarik" : "Selesai"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4 w-full">
            {withdrawSuccess ? (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-xl font-bold text-[#0F172A] mb-2">Penarikan Berhasil!</h2>
                <p className="text-sm text-slate-500">Dana sedang diproses ke rekening Anda.</p>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-[#0F172A] mb-1">Tarik Saldo</h2>
                <p className="text-xs text-slate-500 mb-6">Saldo tersedia: <span className="font-bold text-[#1D64FB]">Rp{wallet.balance.toLocaleString("id-ID")}</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Jumlah Penarikan</label>
                    <input
                      type="text"
                      value={withdrawAmount}
                      onChange={e => setWithdrawAmount(e.target.value)}
                      placeholder="Masukkan jumlah"
                      className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1D64FB]/20 focus:border-[#1D64FB] transition"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Bank Tujuan</label>
                    <select className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1D64FB]/20 transition">
                      <option>BCA - **** 4521</option>
                      <option>Mandiri - **** 7890</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button onClick={() => setShowWithdraw(false)} variant="outline" className="flex-1 rounded-xl h-11 text-sm font-bold">
                      Batal
                    </Button>
                    <Button onClick={handleWithdraw} className="flex-1 bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-11 text-sm font-bold">
                      Tarik Sekarang
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
