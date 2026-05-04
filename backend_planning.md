# 🏗️ LawConsult Backend & Database Planning (Phase 5)

Dokumen ini merincikan rencana teknis untuk memigrasikan LawConsult dari sistem *Local Storage* ke sistem **Backend Riil** yang mendukung sinkronisasi multi-user, database persisten, dan keamanan tingkat produksi.

---

## 1. Stack Teknologi Rekomendasi

| Layer | Teknologi | Alasan |
| :--- | :--- | :--- |
| **Database** | PostgreSQL (Supabase) | Relasional, sangat cocok untuk data transaksi & booking. |
| **ORM** | Prisma | Mempermudah manajemen skema database di Next.js. |
| **Authentication** | Supabase Auth / NextAuth | Keamanan login riil, Session Management, & JWT. |
| **Real-time** | Supabase Realtime | Pengganti polling localStorage untuk Chat & Notifikasi. |
| **Storage** | Supabase Storage | Tempat menyimpan file lampiran chat (PDF/Gambar) secara permanen. |

---

## 2. Skema Database (Prisma Schema)

Rencana struktur tabel utama:

### A. Tabel `User`
- `id` (UUID), `email`, `password_hash`, `role` (CLIENT/LAWYER), `full_name`, `avatar_url`.

### B. Tabel `LawyerProfile` (Relasi 1:1 ke User)
- `specialty`, `price_per_session`, `rating`, `is_online`, `bio`.

### C. Tabel `Booking`
- `id`, `client_id`, `lawyer_id`, `status` (PENDING, ACCEPTED, REJECTED, COMPLETED), `amount`, `created_at`.

### D. Tabel `ChatMessage`
- `id`, `booking_id`, `sender_id`, `content`, `file_url`, `created_at`.

### E. Tabel `Transaction` (Wallet)
- `id`, `user_id`, `amount`, `type` (INCOME/WITHDRAWAL), `status` (ESCROW/SUCCESS), `invoice_id`.

---

## 3. Strategi Migrasi (Langkah demi Langkah)

### Langkah 1: Inisialisasi Database
- Setup proyek Supabase dan instalasi Prisma di dalam Next.js.
- Push skema awal ke database.

### Langkah 2: Authentication & Middleware
- Mengganti logika login demo di `src/app/login` dengan login riil menggunakan `supabase.auth.signInWithPassword`.
- Menambahkan Middleware untuk memproteksi route `/dashboard`.

### Langkah 3: Refactoring Data Fetching
- Mengganti semua `localStorage.getItem` menjadi API Call (Server Components) atau `useQuery` (Client Components).
- Contoh: Halaman "Konsultasi Aktif" akan mengambil data langsung dari tabel `Booking`.

### Langkah 4: Real-time Chat Upgrade
- Mengaktifkan fitur Realtime pada tabel `ChatMessage`.
- Chat room tidak lagi memantau localStorage, tapi mendengarkan *event* `INSERT` dari database.

### Langkah 5: Storage Integration
- Saat user upload file < 5MB di chat, file dikirim ke Supabase Storage, lalu URL-nya disimpan di database.

---

## 4. Keuntungan Backend Riil vs Local Storage

1.  **Multi-Device:** Anda bisa login di Laptop dan HP secara bersamaan dengan data yang sama.
2.  **Keamanan:** Data tidak bisa dimanipulasi dengan mudah melalui Console Browser.
3.  **Integrasi Pembayaran:** Siap untuk diintegrasikan dengan Payment Gateway asli (seperti Midtrans atau Stripe) karena ada server-side validation.
4.  **Skalabilitas:** Mendukung ribuan user tanpa lemot.

---

**Pertanyaan untuk Review:**
- Apakah Anda ingin menggunakan **Supabase** (paling cepat dideploy) atau **PostgreSQL Mandiri**?
- Apakah kita perlu menambahkan fitur **Admin Dashboard** untuk memantau semua transaksi secara global?

---
*Dokumen ini disusun untuk transisi LawConsult ke tahap Produksi.*
