"use client";

import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { name: "Chat Saya", href: "#", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", badge: 3 },
    { name: "Jadwal Saya", href: "#", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { name: "Riwayat Booking", href: "/dashboard/bookings", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "Pembayaran", href: "#", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  ];

  const getIsActive = (item: typeof navItems[0]) => {
    return pathname === item.href 
      || (item.name === "Dashboard" && pathname === "/dashboard")
      || (item.name === "Chat Saya" && pathname.includes("/chat"))
      || (item.name === "Riwayat Booking" && pathname.includes("/bookings"));
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
              className={`flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-[14px] transition-colors ${
                isActive 
                  ? "bg-blue-50/50 text-[#1D64FB] relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1.5 before:bg-[#1D64FB] before:rounded-r-full" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className={`w-5 h-5 ${isActive ? "stroke-[#1D64FB]" : "stroke-current"}`} fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                </svg>
                {item.name}
              </div>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-[#1D64FB] text-white flex items-center justify-center text-[11px] font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="h-px bg-slate-100 my-4 mx-4"></div>

        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl font-semibold text-[14px] transition-colors">
          <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Bantuan
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl font-semibold text-[14px] transition-colors">
          <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Pengaturan
        </Link>
      </nav>

      {/* Sidebar Footer User Profile */}
      <div className="p-6 border-t border-slate-100">
        <div className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Ahmad Rizky" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <p className="text-[14px] font-bold text-slate-900 leading-tight group-hover:text-[#1D64FB] transition-colors">Ahmad Rizky</p>
              <p className="text-[12px] font-medium text-slate-500 leading-tight mt-0.5">Lihat Profil</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-slate-400 group-hover:text-[#1D64FB] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex overflow-hidden">
      
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
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
          </div>
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
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        
        {/* Dynamic Page Content - add top padding on mobile for fixed header */}
        <main className="flex-1 overflow-y-auto smooth-scroll pt-14 lg:pt-0">
          {children}
        </main>
      </div>

    </div>
  );
}
