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
  const [escrowBalance, setEscrowBalance] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState<Transaction | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [dateFilter, setDateFilter] = useState("");

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
      
      // Calculate Escrow and Clear wallet badge
      const savedBookings = localStorage.getItem("bookings");
      if (savedBookings) {
        try {
          const bookings = JSON.parse(savedBookings);
          
          let calculatedEscrow = 0;
          let updated = false;
          
          const newBookings = bookings.map((b: any) => {
            if (b.status === "pending" || b.status === "accepted" || b.status === "client_ready") {
              calculatedEscrow += parseInt((b.price || "500000").toString().replace(/[^0-9]/g, "")) || 500000;
            }
            if (b.status === "completed" && !b.walletSeen) {
              updated = true;
              return { ...b, walletSeen: true };
            }
            return b;
          });
          
          setEscrowBalance(calculatedEscrow);
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
        { id: Date.now(), clientName: "Penarikan Dana", amount: `Rp${amount.toLocaleString("id-ID")}`, date: new Date().toLocaleDateString("id-ID"), status: "processing" },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-[var(--lc-shadow-card)] bg-gradient-to-br from-[#1D64FB] to-blue-700 rounded-3xl text-white">
          <CardContent className="p-6">
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2">Saldo Aktif</p>
            <p className="text-3xl font-black">Rp{wallet.balance.toLocaleString("id-ID")}</p>
            <p className="text-blue-200 text-xs font-medium mt-2">Siap untuk ditarik</p>
          </CardContent>
        </Card>

        {/* Fase 4: Escrow UI */}
        <Card className="border-0 shadow-sm rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-slate-200">
            <svg className="w-16 h-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <CardContent className="p-6 relative z-10">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Dana Escrow
            </p>
            <p className="text-2xl font-black text-slate-800">Rp{escrowBalance.toLocaleString("id-ID")}</p>
            <p className="text-slate-400 text-[10px] font-bold mt-2 tracking-wider">TERTAHAN SEMENTARA</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-[var(--lc-shadow-card)] rounded-3xl">
          <CardContent className="p-6">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Pendapatan</p>
            <p className="text-2xl font-black text-slate-900">Rp{(wallet.balance + 250000).toLocaleString("id-ID")}</p>
            <p className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
              +12% bulan ini
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-[var(--lc-shadow-card)] rounded-3xl">
          <CardContent className="p-6">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Konsultasi Selesai</p>
            <p className="text-2xl font-black text-slate-900">{wallet.transactions.filter(t => t.status === "completed").length}</p>
            <p className="text-slate-400 text-xs font-medium mt-2">Bulan ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Mini Income Trend Chart (Audit §7.2) */}
      <Card className="border-0 shadow-[var(--lc-shadow-card)] rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Tren Pendapatan Mingguan</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">7 hari terakhir</p>
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
              Naik
            </span>
          </div>
          <div className="relative h-24">
            <svg viewBox="0 0 300 80" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              {/* Gradient fill */}
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D64FB" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1D64FB" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,65 L50,55 L100,45 L150,50 L200,30 L250,20 L300,10 L300,80 L0,80 Z" fill="url(#chartGrad)" />
              {/* Line */}
              <path d="M0,65 L50,55 L100,45 L150,50 L200,30 L250,20 L300,10" fill="none" stroke="#1D64FB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Data points */}
              {[{x:0,y:65},{x:50,y:55},{x:100,y:45},{x:150,y:50},{x:200,y:30},{x:250,y:20},{x:300,y:10}].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="white" stroke="#1D64FB" strokeWidth="2" />
              ))}
            </svg>
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="border-0 shadow-[var(--lc-shadow-card)] rounded-3xl">
        <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Riwayat Transaksi</CardTitle>
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setVisibleCount(5);
              }}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D64FB]/20 focus:border-[#1D64FB] shadow-sm transition-all"
            />
            {dateFilter && (
              <Button variant="ghost" onClick={() => { setDateFilter(""); setVisibleCount(5); }} className="text-slate-400 hover:text-slate-600 px-2 h-[30px] rounded-lg text-xs font-semibold">
                Hapus
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {wallet.transactions.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-slate-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-slate-100">
                  <svg className="w-10 h-10 text-[#1D64FB] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                </div>
                <h3 className="text-base font-bold text-slate-700 mb-1">Belum Ada Transaksi</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Transaksi akan muncul setelah Anda menyelesaikan konsultasi pertama dengan klien.</p>
              </div>
            ) : (
              (() => {
                const filteredTx = wallet.transactions.filter(tx => {
                  if (!dateFilter) return true;
                  
                  let txDateStr = tx.date;
                  const parts = tx.date.split('/');
                  if (parts.length === 3) {
                    txDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
                  } else {
                    try {
                      txDateStr = new Date(tx.date).toISOString().split('T')[0];
                    } catch(e) {}
                  }
                  
                  return txDateStr === dateFilter;
                });
                
                const displayedTx = filteredTx.slice(0, visibleCount);
                
                if (filteredTx.length === 0) {
                  return <div className="text-center py-10 text-sm text-slate-400 font-medium">Tidak ada transaksi pada tanggal ini.</div>;
                }
                
                return (
                  <>
                    {displayedTx.map((tx) => (
                      <div key={tx.id} onClick={() => tx.status === "completed" && setSelectedInvoice(tx)} className={`flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition ${tx.status === "completed" ? "cursor-pointer" : ""}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.status === "withdrawn" ? "bg-orange-50 text-orange-500" : tx.status === "processing" ? "bg-amber-50 text-amber-500" : "bg-green-50 text-green-500"}`}>
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
                          <p className={`text-[13px] font-black ${tx.status === "withdrawn" ? "text-orange-500" : tx.status === "processing" ? "text-amber-500" : "text-green-500"}`}>
                            {tx.status === "withdrawn" || tx.status === "processing" ? "-" : "+"}{tx.amount}
                          </p>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${tx.status === "withdrawn" ? "text-orange-400" : tx.status === "processing" ? "text-amber-400" : "text-green-400"}`}>
                            {tx.status === "withdrawn" ? "Ditarik" : tx.status === "processing" ? "⏳ Diproses" : "Selesai"}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {visibleCount < filteredTx.length && (
                      <div className="pt-4 flex justify-center">
                        <Button 
                          onClick={() => setVisibleCount(filteredTx.length)}
                          variant="outline"
                          className="rounded-xl font-bold text-[#1D64FB] border-blue-100 bg-blue-50/50 hover:bg-blue-100 px-8 h-10 text-xs"
                        >
                          Tampilkan Semua ({filteredTx.length})
                        </Button>
                      </div>
                    )}
                  </>
                );
              })()
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
      {/* Fase 4: Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedInvoice(null)}>
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="bg-slate-900 p-6 text-white relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-1 relative z-10">Faktur Resmi</h2>
              <p className="text-slate-400 text-xs font-medium relative z-10">INV-{selectedInvoice.id}</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Klien</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">{selectedInvoice.clientName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tanggal</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">{selectedInvoice.date}</p>
                </div>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Rincian Layanan</p>
                <div className="flex justify-between items-center py-2">
                  <p className="text-sm text-slate-700 font-medium">Sesi Konsultasi Chat</p>
                  <p className="text-sm font-bold text-slate-900">{selectedInvoice.amount}</p>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-slate-50 mt-2">
                  <p className="text-xs text-slate-500">Biaya Admin Platform</p>
                  <p className="text-xs text-slate-500">Rp0</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                <p className="text-sm font-bold text-slate-700">Total Diterima</p>
                <p className="text-xl font-black text-green-600">{selectedInvoice.amount}</p>
              </div>
              
              <Button onClick={() => setSelectedInvoice(null)} className="w-full bg-[#1D64FB] hover:bg-blue-700 text-white rounded-xl h-11 text-sm font-bold">
                Tutup Faktur
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
