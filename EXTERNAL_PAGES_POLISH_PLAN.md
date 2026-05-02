# 🚀 Polish Plan: Landing, Login & Register — ✅ COMPLETED
**Target:** Mencapai Skor 10/10 untuk Konsistensi & Premium Feel di Seluruh Aplikasi.

---

## 1. Landing Page (`src/app/page.tsx`) ✅ DONE
*   **Scroll Reveal:** Setiap section (Hero, Services, Cara Kerja, About, Team, Reviews, CTA, Footer) menggunakan `motion.section` dengan `fadeInUp`.
*   **Staggered Entrance:** 6 kartu layanan muncul satu per satu dengan `delay: i * 0.1`.
*   **Hero Animation:** Navbar slide-down, h1 fade-in, floating card slide dari kiri.
*   **Micro-interactions:** Kartu layanan `whileHover={{ y: -6 }}`, CTA button `whileHover/whileTap`.

## 2. Login Page (`src/app/login/page.tsx`) ✅ DONE
*   **Smooth Card Entry:** Kartu utama muncul dengan `scale: 0.96 -> 1`.
*   **Branding Panel:** Logo dan teks "Selamat Datang Kembali" fade-in bertahap (delay 0.3s, 0.5s).
*   **Sequential Field Reveal:** Email (delay 0.4s), Password (delay 0.5s), Checkbox (delay 0.6s), Button (delay 0.7s).
*   **Button States:** `whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`.
*   **Google Button:** Animasi hover/tap yang sama.

## 3. Register Page (`src/app/register/page.tsx`) ✅ DONE
*   **Smooth Card Entry:** Identik dengan Login.
*   **Role Selection:** `transition-all duration-300` untuk efek border/background yang halus.
*   **Checklist Stagger:** 3 item muncul satu per satu (delay 0.8s, 0.95s, 1.1s) dengan slide dari kiri.
*   **Sequential Reveal:** Role (0.4s), Nama (0.5s), Email (0.6s), Password (0.7s), Terms (0.8s), Button (0.9s).

---

## 🎨 Consistency Checklist ✅
1.  **Logo Branding:** Logo SVG identik di semua halaman ✅
2.  **Color Palette:** `#1D64FB` (Biru) & `#0F172A` (Gelap) konsisten ✅
3.  **Button States:** Semua button memiliki hover/tap scale ✅
4.  **Focus Rings:** Input menggunakan `focus:ring-[#1D64FB]/20` yang konsisten ✅

---
**Status:** ✅ COMPLETED — Seluruh ekosistem LawConsult sudah memiliki animasi dan transisi premium.
