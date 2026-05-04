"use client";

import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storedRole, setStoredRole] = useState<string | null>(null);
  const [globalToast, setGlobalToast] = useState<{show: boolean, message: string, url: string}>({show: false, message: "", url: ""});
  const [notificationCount, setNotificationCount] = useState(0);
  const [clientBookingsBadge, setClientBookingsBadge] = useState(0);
  const [clientCompletedBadge, setClientCompletedBadge] = useState(0);
  const [lawyerPendingBadge, setLawyerPendingBadge] = useState(0);
  const [lawyerActiveBadge, setLawyerActiveBadge] = useState(0);
  const [lawyerWalletBadge, setLawyerWalletBadge] = useState(0);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState<any[]>([]);
  // Hydration-safe: read localStorage only on client
  useEffect(() => {
    setStoredRole(localStorage.getItem("user_role"));
    
    // Cleanup corrupted notification states from the previous bug
    const saved = localStorage.getItem("bookings");
    if (saved) {
      try {
        const bookings = JSON.parse(saved);
        const fixed = bookings.map((b: any) => {
          if (b.status === "pending" && b.clientSeenAcceptedNotif) {
            delete b.clientSeenAcceptedNotif;
            delete b.clientSeenCompletedNotif;
          }
          return b;
        });
        localStorage.setItem("bookings", JSON.stringify(fixed));
      } catch(e) {}
    }
  }, []);

  const isLawyerMode = pathname === "/dashboard/lawyer" || pathname.startsWith("/dashboard/lawyer/") || (storedRole === "lawyer");

  // --- SECURITY: Role Based Access Control (RBAC) ---
  useEffect(() => {
    const userRole = localStorage.getItem("user_role") || "client"; 
    // Shared routes that both roles can access
    const sharedRoutes = ["/dashboard/chat", "/dashboard/checkout", "/dashboard/profile", "/dashboard/settings", "/dashboard/coming-soon", "/dashboard/bookings", "/dashboard/active", "/dashboard/lawyer/verification", "/dashboard/lawyer/wallet"];
    const isSharedRoute = sharedRoutes.some(r => pathname.startsWith(r));

    if (isSharedRoute) return; // Allow both roles

    if (isLawyerMode && userRole !== "lawyer") {
      router.push("/dashboard");
    } else if (!isLawyerMode && userRole === "lawyer" && pathname !== "/dashboard/chat") {
      router.push("/dashboard/lawyer");
    }
  }, [pathname, isLawyerMode, router]);

  // Dynamic header content based on route (lawyer has its own integrated header)
  const headerContent = isLawyerMode && pathname === "/dashboard/lawyer"
    ? { title: "", subtitle: "" }
    : pathname === "/dashboard"
      ? { title: "Dashboard Klien", subtitle: "Ringkasan aktivitas dan statistik Anda" }
      : pathname.includes("/bookings")
        ? { title: "Riwayat Booking", subtitle: "Lihat semua riwayat konsultasi Anda" }
        : pathname.includes("/lawyers")
          ? { title: "Daftar Lawyer", subtitle: "Temukan pengacara yang tepat" }
          : pathname.includes("/chat")
            ? { title: "Chat Konsultasi", subtitle: "Komunikasi langsung dengan lawyer" }
            : pathname.includes("/checkout")
              ? { title: "Pembayaran", subtitle: "Selesaikan transaksi Anda" }
              : pathname.includes("/review")
                ? { title: "Ulasan", subtitle: "Berikan penilaian untuk layanan" }
                : pathname.includes("/verification")
                  ? { title: "Pusat Verifikasi", subtitle: "Unggah dokumen pendukung Anda" }
                  : pathname.includes("/active")
                    ? { title: "Konsultasi Aktif", subtitle: "Pantau status konsultasi Anda" }
                    : { title: "Temukan Lawyer Terbaik", subtitle: "Pilih lawyer sesuai kebutuhan hukum Anda" };

  // Profile info
  const profileInfo = isLawyerMode
    ? { name: "Bima Pratama, S.H.", sub: "Lihat Profil", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA" }
    : { name: "Ahmad Rizky", sub: "Lihat Profil", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Global Polling for Client Notifications and Badges
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem("bookings");
      if (saved) {
        try {
          const current = JSON.parse(saved);
          
          if (storedRole === "client") {
            const newlyAccepted = current.find((b: any) => b.status === "accepted" && !b.clientToastAccepted);
            if (newlyAccepted) {
              setGlobalToast({ show: true, message: `Lawyer ${newlyAccepted.lawyerName} telah menerima booking Anda!`, url: "/dashboard/active" });
              const updated = current.map((b: any) => b.id === newlyAccepted.id ? { ...b, clientToastAccepted: true } : b);
              localStorage.setItem("bookings", JSON.stringify(updated));
              setTimeout(() => setGlobalToast({ show: false, message: "", url: "" }), 8000);
            }
            
            // Badge logic for client (Konsultasi Aktif)
            const activeBookings = current.filter((b: any) => b.status === "pending" || b.status === "accepted" || b.status === "client_ready");
            setClientBookingsBadge(activeBookings.length);
            
            // Badge logic for client (Riwayat Booking)
            const unseenCompletedClient = current.filter((b: any) => b.status === "completed" && !b.clientReviewDone && !b.clientSeenCompleted);
            setClientCompletedBadge(unseenCompletedClient.length);
            
            // Notification logic for client bell
            const unreadClientNotifs = current.filter((b: any) => 
               (b.status === "pending" && !b.clientSeenPendingNotif) || 
               (b.status === "accepted" && !b.clientSeenAcceptedNotif) ||
               (b.status === "completed" && !b.clientSeenCompletedNotif)
            );
            
            setNotificationCount(unreadClientNotifs.length);
            setNotificationsList(unreadClientNotifs.map((b: any) => ({
              id: b.id,
              title: b.status === "pending" ? "Booking Dibuat!" : b.status === "accepted" ? "Booking Diterima!" : "Sesi Selesai ✅",
              message: b.status === "pending" ? `Menunggu konfirmasi dari lawyer.` : b.status === "accepted" ? `Lawyer siap berkonsultasi.` : `Silakan berikan ulasan Anda.`,
              url: b.status === "completed" ? "/dashboard/bookings" : "/dashboard/active",
              time: "Baru saja",
              type: b.status === "completed" ? "completed" : "info",
              bookingId: b.id,
              status: b.status
            })));
          } else if (storedRole === "lawyer" || isLawyerMode) {
            // Badge logic for lawyer
            const pending = current.filter((b: any) => b.status === "pending");
            const active = current.filter((b: any) => b.status === "client_ready");
            const unreadWallet = current.filter((b: any) => b.status === "completed" && !b.walletSeen);
            
            // Notifications logic for lawyer bell
            const unseenPending = current.filter((b: any) => b.status === "pending" && !b.lawyerSeenPendingNotif);
            const unseenCompleted = current.filter((b: any) => b.status === "completed" && !b.lawyerSeenCompletedNotif);
            
            setLawyerPendingBadge(pending.length);
            setLawyerActiveBadge(active.length);
            setLawyerWalletBadge(unreadWallet.length);
            
            // Reviews logic
            let unreadReviews: any[] = [];
            const savedReviews = localStorage.getItem("lawyer_reviews");
            if (savedReviews) {
              try {
                const reviews = JSON.parse(savedReviews);
                unreadReviews = reviews.filter((r: any) => !r.seenInNotification);
              } catch(e) {}
            }
            
            setNotificationCount(unseenPending.length + unreadReviews.length + unseenCompleted.length);
            
            const notifs = [
              ...unseenPending.map((b: any) => ({
                id: b.id,
                title: "Pesanan Baru Masuk",
                message: `Klien ${b.clientName || 'Ahmad Rizky'} meminta konsultasi.`,
                url: "/dashboard/active",
                time: "Baru saja",
                type: "info",
                bookingId: b.id,
                status: b.status
              })),
              ...unseenCompleted.map((b: any) => ({
                id: b.id,
                title: "Sesi Selesai ✅",
                message: `Konsultasi dengan ${b.clientName || 'Klien'} telah selesai.`,
                url: "/dashboard/lawyer/wallet",
                time: "Baru saja",
                type: "completed"
              })),
              ...unreadReviews.map((r: any) => ({
                id: `rev-${r.id}`,
                title: "Ulasan Baru",
                message: `Klien ${r.name} memberikan bintang ${r.rating}.`,
                url: "/dashboard/lawyer",
                time: r.date || "Baru saja",
                type: "review"
              }))
            ];
            setNotificationsList(notifs);
          }
        } catch (e) {}
      }
      // Read wallet balance for hover preview (Audit §3.3)
      const walletData = localStorage.getItem("lawyer_wallet");
      if (walletData) {
        try {
          const w = JSON.parse(walletData);
          setWalletBalance(w.balance || 0);
        } catch(e) {}
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [storedRole, isLawyerMode]);

  const clientNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { name: "Daftar Lawyer", href: "/dashboard/lawyers", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
    { name: "Konsultasi Aktif", href: "/dashboard/active", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", badge: clientBookingsBadge > 0 ? clientBookingsBadge : undefined, isLive: clientBookingsBadge > 0 },
    { name: "Pesan & Chat", href: "/dashboard/chat", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
    { name: "Riwayat Booking", href: "/dashboard/bookings", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", badge: clientCompletedBadge > 0 ? clientCompletedBadge : undefined },
  ];

  const lawyerNavItems = [
    { name: "Ringkasan", href: "/dashboard/lawyer", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { name: "Konsultasi Aktif", href: "/dashboard/active", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", badge: lawyerPendingBadge > 0 ? lawyerPendingBadge : undefined, badgeType: "action" as const, isLive: lawyerPendingBadge > 0 || lawyerActiveBadge > 0 },
    { name: lawyerActiveBadge > 0 ? `Chat Klien (${lawyerActiveBadge} Aktif)` : "Pesan & Chat", href: "/dashboard/chat", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", badge: lawyerActiveBadge > 0 ? lawyerActiveBadge : undefined, badgeType: "info" as const },
    { name: "Dompet Saya", href: "/dashboard/lawyer/wallet", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", badge: lawyerWalletBadge > 0 ? lawyerWalletBadge : undefined, badgeType: "info" as const, hoverPreview: walletBalance !== null ? `Rp${walletBalance.toLocaleString("id-ID")}` : null },
    { name: "Pusat Verifikasi", href: "/dashboard/lawyer/verification", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", statusHint: "⏳ Dalam Peninjauan" },
  ];

  const bottomNavItems = [
    { name: "Bantuan", href: "#", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "Pengaturan", href: "#", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
  ];

  const navItems = isLawyerMode ? lawyerNavItems : clientNavItems;

  const getIsActive = (item: { name: string; href: string }) => {
    if (isLawyerMode) {
      if (item.name === "Ringkasan") return pathname === "/dashboard/lawyer";
      if (item.name === "Konsultasi Aktif") return pathname.includes("/dashboard/active");
      if (item.name.startsWith("Pesan") || item.name.startsWith("Chat")) return pathname.includes("/dashboard/chat");
      if (item.name === "Dompet Saya") return pathname.includes("/wallet");
      if (item.name === "Pusat Verifikasi") return pathname.includes("/verification");
      return false;
    }
    return pathname === item.href 
      || (item.name === "Dashboard" && pathname === "/dashboard")
      || (item.name === "Daftar Lawyer" && pathname.includes("/lawyers"))
      || (item.name === "Konsultasi Aktif" && pathname.includes("/dashboard/active"))
      || (item.name === "Pesan & Chat" && pathname.includes("/dashboard/chat"))
      || (item.name === "Riwayat Booking" && pathname.includes("/bookings"));
  };

  const handleLogout = () => {
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("is_logged_in");
    router.push("/login");
  };

  const SidebarContent = () => (
    <>
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = getIsActive(item);
          
          // Add a separator before "Bantuan"
          if (index === 7) return <div key="sep" className="h-px bg-slate-100 my-4 mx-4"></div>;

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-[14px] transition-all duration-200 active:scale-[0.97] relative group ${
                isActive 
                  ? "bg-blue-50/50 text-[#1D64FB] relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1.5 before:bg-[#1D64FB] before:rounded-r-full" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "stroke-[#1D64FB]" : "stroke-current"}`} fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                </svg>
                <span className="flex items-center gap-1.5">
                  {item.name}
                  {(item as any).statusHint && (
                    <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md">{(item as any).statusHint}</span>
                  )}
                  {(item as any).isLive && (
                    <span className="relative flex h-2 w-2 ml-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold badge-pulse ${
                    (item as any).badgeType === 'action' ? 'badge-action' :
                    (item as any).badgeType === 'social' ? 'badge-social' : 'badge-info'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>

            </Link>
          );
        })}

        <div className="h-px bg-slate-100 my-4 mx-4"></div>

        <Link href="/dashboard/coming-soon" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl font-semibold text-[14px] transition-colors">
          <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Bantuan
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl font-semibold text-[14px] transition-colors">
          <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Pengaturan
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl font-semibold text-[14px] transition-colors">
          <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Keluar
        </button>
      </nav>

      {/* Sidebar Footer User Profile */}
      <div className="p-6 border-t border-slate-100">
        <Link href="/dashboard/profile" className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${isLawyerMode ? 'border-[#1D64FB]' : 'border-slate-200'}`}>
              <img src={profileInfo.avatar} alt={profileInfo.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-bold text-slate-900 leading-tight group-hover:text-[#1D64FB] transition-colors">{profileInfo.name}</p>
                {isLawyerMode && (
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#1D64FB] bg-blue-50 px-1.5 py-0.5 rounded-md">Pro</span>
                )}
              </div>
              <p className="text-[12px] font-medium text-slate-500 leading-tight mt-0.5">{profileInfo.sub}</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-slate-400 group-hover:text-[#1D64FB] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] text-slate-900 font-sans flex overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[280px] bg-white border-r border-slate-200 shrink-0">
        <div className="pt-8 pb-6 px-8">
          <Link href="/" className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 text-[#0F172A] shrink-0">
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9L12 4.57 20.11 9 12 13.43 3.89 9zM12 17a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"></path>
              </svg>
            </div>
            <span className="text-[22px] font-bold tracking-tight text-[#0F172A]">Law Consult</span>
          </Link>
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 lg:hidden bg-white border-b border-slate-200">
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <Link href="/" className="flex items-center gap-1.5">
            <div className="w-6 h-6 text-[#0F172A] shrink-0">
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9L12 4.57 20.11 9 12 13.43 3.89 9zM12 17a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"></path>
              </svg>
            </div>
            <span className="text-[17px] font-bold tracking-tight text-[#0F172A]">Law Consult</span>
          </Link>
          {!isLawyerMode ? (
            <div className="flex items-center gap-3 relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-slate-500 hover:text-[#1D64FB] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Mobile Notification Dropdown */}
              {showNotifications && (
                <div className="absolute top-12 -right-2 w-[calc(100vw-2rem)] max-w-[360px] bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden z-[999] flex flex-col max-h-[80vh]">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[13px] font-bold text-slate-900">Notifikasi</h3>
                      {notificationCount > 0 && <span className="text-[10px] font-semibold text-[#1D64FB] bg-blue-50 px-1.5 py-0.5 rounded-md">{notificationCount} Baru</span>}
                    </div>
                    {notificationCount > 0 && (
                      <button 
                        onClick={() => {
                          const saved = localStorage.getItem("bookings");
                          if (saved) {
                            let updated = JSON.parse(saved).map((b: any) => {
                              let modified = { ...b };
                              if (b.status === "pending") modified.clientSeenPendingNotif = true;
                              if (b.status === "accepted") modified.clientSeenAcceptedNotif = true;
                              if (b.status === "completed") modified.clientSeenCompletedNotif = true;
                              return modified;
                            });
                            localStorage.setItem("bookings", JSON.stringify(updated));
                          }
                          setShowNotifications(false);
                        }}
                        className="text-[11px] font-bold text-slate-500 hover:text-[#1D64FB] transition-colors cursor-pointer"
                      >
                        Tandai Dibaca
                      </button>
                    )}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notificationsList.length > 0 ? (
                      notificationsList.map((notif, idx) => (
                        <div key={idx} onClick={() => { 
                          setShowNotifications(false); 
                          if (notif.bookingId) {
                            const saved = localStorage.getItem("bookings");
                            if (saved) {
                              try {
                                const updated = JSON.parse(saved).map((b: any) => {
                                  if (b.id === notif.bookingId) {
                                    if (notif.status === "pending") b.clientSeenPendingNotif = true;
                                    if (notif.status === "accepted") b.clientSeenAcceptedNotif = true;
                                    if (notif.status === "completed") b.clientSeenCompletedNotif = true;
                                  }
                                  return b;
                                });
                                localStorage.setItem("bookings", JSON.stringify(updated));
                              } catch(e) {}
                            }
                          }
                          router.push(notif.url); 
                        }} className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 cursor-pointer transition flex gap-3 text-left">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.type === "completed" ? "bg-green-50 text-green-500" : "bg-blue-50 text-blue-500"}`}>
                            {notif.type === "completed" ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-[13px] font-bold text-slate-900 mb-0.5 leading-tight">{notif.title}</p>
                            <p className="text-[11px] text-slate-500 leading-snug">{notif.message}</p>
                            <p className="text-[10px] text-slate-400 mt-1 font-medium">{notif.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <p className="text-[12px] font-medium text-slate-400">Tidak ada notifikasi baru</p>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-center">
                    <button onClick={() => setShowNotifications(false)} className="text-[11px] font-bold text-slate-500 hover:text-slate-700">Tutup</button>
                  </div>
                </div>
              )}

              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                <img src={profileInfo.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="pt-6 pb-4 px-6 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-7 h-7 text-[#0F172A] shrink-0">
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9L12 4.57 20.11 9 12 13.43 3.89 9zM12 17a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </div>
                <span className="text-[20px] font-bold tracking-tight text-[#0F172A]">Law Consult</span>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-[100dvh] overflow-hidden bg-[#F8FAFC]">
        
        {/* Dynamic Header Bar — changes based on route */}
        {headerContent.title && (
          <div className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-[#0F172A] tracking-tight">{headerContent.title}</h1>
                  {isLawyerMode && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#1D64FB] px-2 py-0.5 rounded-full">Pro</span>
                  )}
                </div>
                <p className="text-[13px] text-slate-500 font-medium">{headerContent.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 relative">
              {/* Notification bell */}
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-[#1D64FB] hover:bg-slate-50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-white text-[8px] font-bold flex items-center justify-center animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute top-12 right-12 w-80 bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[13px] font-bold text-slate-900">Notifikasi</h3>
                      {notificationCount > 0 && <span className="text-[10px] font-semibold text-[#1D64FB] bg-blue-50 px-1.5 py-0.5 rounded-md">{notificationCount} Baru</span>}
                    </div>
                    {notificationCount > 0 && (
                      <button 
                        onClick={() => {
                          const saved = localStorage.getItem("bookings");
                          if (saved) {
                            let updated = JSON.parse(saved);
                            if (storedRole === "client") {
                              updated = updated.map((b: any) => {
                                let modified = { ...b };
                                if (b.status === "pending") modified.clientSeenPendingNotif = true;
                                if (b.status === "accepted") modified.clientSeenAcceptedNotif = true;
                                if (b.status === "completed") modified.clientSeenCompletedNotif = true;
                                return modified;
                              });
                            } else {
                              updated = updated.map((b: any) => {
                                let modified = { ...b };
                                if (b.status === "pending") modified.lawyerSeenPendingNotif = true;
                                if (b.status === "completed") modified.lawyerSeenCompletedNotif = true;
                                return modified;
                              });
                            }
                            localStorage.setItem("bookings", JSON.stringify(updated));
                          }
                          const savedReviews = localStorage.getItem("lawyer_reviews");
                          if (savedReviews) {
                            const updated = JSON.parse(savedReviews).map((r: any) => ({ ...r, seenInNotification: true }));
                            localStorage.setItem("lawyer_reviews", JSON.stringify(updated));
                          }
                          setShowNotifications(false);
                        }}
                        className="text-[11px] font-bold text-slate-500 hover:text-[#1D64FB] transition-colors cursor-pointer"
                      >
                        Tandai Dibaca
                      </button>
                    )}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notificationsList.length > 0 ? (
                      notificationsList.map((notif, idx) => (
                        <div key={idx} onClick={() => { 
                          setShowNotifications(false); 
                          
                          if (notif.type === "review") {
                            const saved = localStorage.getItem("lawyer_reviews");
                            if (saved) {
                              try {
                                const reviews = JSON.parse(saved);
                                const updated = reviews.map((r: any) => `rev-${r.id}` === notif.id ? { ...r, seenInNotification: true } : r);
                                localStorage.setItem("lawyer_reviews", JSON.stringify(updated));
                              } catch(e) {}
                            }
                          } else if (notif.bookingId) {
                            const saved = localStorage.getItem("bookings");
                            if (saved) {
                              try {
                                const updated = JSON.parse(saved).map((b: any) => {
                                  if (b.id === notif.bookingId) {
                                    if (storedRole === "client") {
                                      if (notif.status === "pending") b.clientSeenPendingNotif = true;
                                      if (notif.status === "accepted") b.clientSeenAcceptedNotif = true;
                                      if (notif.status === "completed") b.clientSeenCompletedNotif = true;
                                    } else {
                                      if (notif.status === "pending") b.lawyerSeenPendingNotif = true;
                                      if (notif.status === "completed") b.lawyerSeenCompletedNotif = true;
                                    }
                                  }
                                  return b;
                                });
                                localStorage.setItem("bookings", JSON.stringify(updated));
                              } catch(e) {}
                            }
                          }
                          
                          router.push(notif.url); 
                        }} className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 cursor-pointer transition flex gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.type === "review" ? "bg-yellow-50 text-yellow-500" : notif.type === "completed" ? "bg-green-50 text-green-500" : "bg-blue-50 text-blue-500"}`}>
                            {notif.type === "review" ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            ) : notif.type === "completed" ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-[13px] font-bold text-slate-900 mb-0.5 leading-tight">{notif.title}</p>
                            <p className="text-[11px] text-slate-500 leading-snug">{notif.message}</p>
                            <p className="text-[10px] text-slate-400 mt-1 font-medium">{notif.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <p className="text-[12px] font-medium text-slate-400">Tidak ada notifikasi baru</p>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-center">
                    <button onClick={() => setShowNotifications(false)} className="text-[11px] font-bold text-slate-500 hover:text-slate-700">Tutup</button>
                  </div>
                </div>
              )}

              {/* Profile avatar */}
              <div className={`w-9 h-9 rounded-full overflow-hidden border-2 ${isLawyerMode ? 'border-[#1D64FB]' : 'border-slate-200'}`}>
                <img src={profileInfo.avatar} alt={profileInfo.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Page Content - add top padding on mobile for fixed header */}
        <main className="flex-1 overflow-y-auto pt-14 lg:pt-0 smooth-scroll">
          {children}
        </main>
      </div>

      {/* Global Toast Notification for Client */}
      {globalToast.show && (
        <div className="fixed bottom-6 right-6 z-[60] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white border border-[#1D64FB] rounded-xl shadow-xl shadow-blue-500/10 p-4 flex items-start gap-3 w-80 cursor-pointer hover:bg-blue-50/30 transition-colors" onClick={() => router.push(globalToast.url)}>
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-sm">💬</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">Kabar Baik!</h4>
              <p className="text-[12px] text-slate-500 mt-0.5">{globalToast.message}</p>
              <p className="text-[11px] font-bold text-[#1D64FB] mt-2">Klik untuk melihat →</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setGlobalToast({...globalToast, show: false}); }} className="text-slate-400 hover:text-slate-600 mt-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
