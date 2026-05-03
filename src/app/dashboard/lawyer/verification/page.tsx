"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function VerificationCenter() {
  const [activeTab, setActiveTab] = useState<"ktp" | "sia" | "ijazah">("ktp");
  const [uploads, setUploads] = useState<Record<string, File | null>>({
    ktp: null,
    sia: null,
    ijazah: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const tabs = [
    { id: "ktp", label: "KTP", desc: "Kartu Tanda Penduduk" },
    { id: "sia", label: "SIA", desc: "Surat Izin Advokat" },
    { id: "ijazah", label: "Ijazah", desc: "Ijazah Hukum Terakhir" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploads(prev => ({ ...prev, [type]: file }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploads(prev => ({ ...prev, [type]: file }));
    }
  };

  const removeFile = (type: string) => {
    setUploads(prev => ({ ...prev, [type]: null }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const isAllUploaded = uploads.ktp && uploads.sia && uploads.ijazah;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Pusat Verifikasi Lawyer</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Unggah dokumen profesional Anda untuk mendapatkan badge "Terverifikasi" dan tampil di pencarian Klien.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Progress & Tabs */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-0 shadow-sm bg-white rounded-2xl">
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle className="text-[15px] font-bold text-slate-900">Status Verifikasi</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                  Belum Lengkap
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 p-0">
              <div className="flex flex-col">
                {tabs.map((tab) => {
                  const hasFile = !!uploads[tab.id];
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-3 p-4 text-left transition-colors border-l-2 ${
                        activeTab === tab.id 
                          ? "bg-blue-50/50 border-[#1D64FB]" 
                          : "border-transparent hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        hasFile ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                      }`}>
                        {hasFile ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <span className="text-xs font-bold">{tabs.indexOf(tab) + 1}</span>
                        )}
                      </div>
                      <div>
                        <p className={`text-[13px] font-bold ${activeTab === tab.id ? "text-[#1D64FB]" : "text-slate-700"}`}>
                          {tab.label}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">{tab.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Upload Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="upload-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-slate-900">
                      Unggah {tabs.find(t => t.id === activeTab)?.desc}
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      Pastikan dokumen terlihat jelas, tidak terpotong, dan ukurannya maksimal 5MB (JPG, PNG, PDF).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Upload Dropzone */}
                    <div 
                      className={`relative w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
                        uploads[activeTab] 
                          ? "border-green-300 bg-green-50/50" 
                          : "border-slate-300 bg-slate-50 hover:bg-slate-100/50 hover:border-[#1D64FB]/50"
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, activeTab)}
                    >
                      <input 
                        type="file" 
                        id="file-upload" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e, activeTab)}
                      />
                      
                      {!uploads[activeTab] ? (
                        <div className="text-center pointer-events-none px-4">
                          <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                          </div>
                          <p className="text-sm font-bold text-slate-700 mb-1">Klik untuk unggah atau seret file ke sini</p>
                          <p className="text-xs text-slate-500">Mendukung JPG, PNG, atau PDF (Maks. 5MB)</p>
                        </div>
                      ) : (
                        <div className="text-center z-10">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </div>
                          <p className="text-sm font-bold text-slate-900 mb-1">{uploads[activeTab]?.name}</p>
                          <p className="text-xs text-slate-500 mb-4">{(uploads[activeTab]?.size! / 1024 / 1024).toFixed(2)} MB</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={(e) => { e.preventDefault(); removeFile(activeTab); }}
                            className="relative z-20 text-red-500 border-red-200 hover:bg-red-50"
                          >
                            Hapus & Ganti File
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <Button 
                        variant="ghost" 
                        onClick={() => {
                          const currentIndex = tabs.findIndex(t => t.id === activeTab);
                          if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1].id as any);
                        }}
                        disabled={activeTab === "ktp"}
                        className="text-slate-500"
                      >
                        ← Sebelumnya
                      </Button>
                      
                      {activeTab !== "ijazah" ? (
                        <Button 
                          onClick={() => {
                            const currentIndex = tabs.findIndex(t => t.id === activeTab);
                            setActiveTab(tabs[currentIndex + 1].id as any);
                          }}
                          className="bg-[#1D64FB] hover:bg-blue-700 text-white"
                        >
                          Lanjut →
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleSubmit}
                          disabled={!isAllUploaded || isSubmitting}
                          className="bg-green-500 hover:bg-green-600 text-white min-w-[140px]"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Memproses...
                            </span>
                          ) : "Kirim Pengajuan"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="success-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center"
              >
                <Card className="border-0 shadow-sm bg-white rounded-2xl w-full h-full flex flex-col items-center justify-center p-10 text-center min-h-[400px]">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Dokumen Berhasil Terkirim!</h2>
                  <p className="text-slate-500 mb-8 max-w-sm">
                    Tim kami akan meninjau dokumen Anda dalam waktu 1x24 jam kerja. Anda akan menerima notifikasi jika verifikasi berhasil.
                  </p>
                  <Button 
                    onClick={() => {
                      setIsSuccess(false);
                      setUploads({ ktp: null, sia: null, ijazah: null });
                      setActiveTab("ktp");
                    }}
                    variant="outline" 
                    className="border-slate-200"
                  >
                    Kirim Dokumen Baru
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
