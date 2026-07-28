# SIMMAGANG-SMK v2.0

Sistem Informasi Manajemen PKL terintegrasi untuk Sekolah Menengah Kejuruan (SMK).

## 🚀 Struktur Direktori
```text
simmagang-smk/
├── index.html                  # Landing Page Publik
├── login.html                  # Unified Multi-Role Login Page
├── unauthorized.html           # Halaman Akses Ditolak
├── assets/
│   ├── css/                    # Custom Stylesheet & Glassmorphism UI
│   └── js/                     # ES Modules (Supabase, Auth, UI Helpers)
├── pages/                      # Dashboard Spesifik Per-Role
│   ├── admin/
│   ├── siswa/
│   ├── guru/
│   └── hubin/
└── database/
    └── schema_clean.sql        # Consolidated PostgreSQL & RLS Policies
```

## 🛠️ Cara Menjalankan Aplikasi
1. Ekstrak seluruh folder ini ke direktori web server Anda (misal `htdocs` XAMPP, Live Server VSCode, atau GitHub Pages).
2. Untuk mengaktifkan koneksi Supabase asli:
   - Jalankan script `database/schema_clean.sql` di SQL Editor dashboard Supabase Anda.
   - Buka file `assets/js/config.js`, masukkan `SUPABASE_URL` dan `SUPABASE_ANON_KEY` milik proyek Supabase Anda.
   - Ubah `DEMO_MODE: false`.
3. Buka `index.html` atau `login.html` di browser Anda.

## 👥 Fitur Login Simulasi Cepat (Demo Mode)
Pada halaman login, Anda dapat menggunakan tombol *Quick Login* (Admin, Siswa, Guru, Hubin) untuk menguji navigasi aplikasi tanpa perlu memasukkan kredensial database.
