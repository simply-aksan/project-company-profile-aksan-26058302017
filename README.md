# REKAVANTA — Technology & Product Studio

> **Build Solutions. Create Possibilities.**  
> Rekavanta adalah hybrid technology & product studio modern yang menggabungkan layanan rekayasa perangkat lunak kustom (*Digital Services*) dengan inkubasi produk digital mandiri (*Digital Products*).

---

## 🌟 Tentang Rekavanta

Rekavanta dirancang dengan pendekatan arsitektur digital dan desain editorial monokromatik bergaya Swiss/Brutalist modern yang presisi, performan tinggi, serta minimalis. Website ini merepresentasikan visi studio teknologi dalam menciptakan solusi perangkat lunak yang fungsional, elegan, dan berdampak nyata.

---

## 🚀 Fitur Unggulan

### 1. **Arsitektur Clean Code & Berbasis React 19**
- Kode dibangun dengan modularitas tinggi, memisahkan logika antarmuka (*UI Components*), penataan data (*Studio Data*), serta *Type Definitions* yang *type-safe*.
- Menggunakan **Vite**, **TypeScript**, dan **Tailwind CSS** untuk kecepatan proses *build* dan *hot module replacement* (HMR).

### 2. **Dynamic Reveal Hover Effect (Minimalist Aesthetic)**
- Pada bagian **Selected Initiatives**, kartu proyek mengusung konsep *quiet editorial*: deskripsi dan tombol *call-to-action* memudar masuk secara halus (*smooth fade-in*) dengan sedikit akselerasi ke atas hanya saat kursor diarahkan ke kartu.
- Dilengkapi dukungan penuh aksesibilitas keyboard (`:focus-within`), *zero layout shift* (tanpa pergeseran tata letak), serta *fallback* adaptif untuk perangkat layar sentuh (*touchscreen/mobile*).

### 3. **Interaktivitas & Efek Visual Presisi**
- **Sliding Glider Navigation**: Indikator pill navigasi hitam dinamis yang meluncur mengikuti posisi mouse dan section yang aktif saat di-scroll.
- **Scroll Progress Tracker**: Indikator progres scroll atas halaman berbasis akselerasi GPU (`scaleX`).
- **Word-by-Word Manifesto Lighting**: Efek iluminasi teks filosofi brand kata-demi-kata seiring pengguna menggulir halaman.
- **Parallax Hero Stage**: Efek gerak kedalaman halus pada potret figur utama berlatar monokromatik dengan *Dark Glass Brand Plate*.
- **Interactive Modals**:
  - *Initiative Brief Dialog*: Tinjauan lengkap spesifikasi inisiatif proyek dengan integrasi langsung ke sesi diskusi.
  - *Studio Contact Modal*: Formulir konsultasi interaktif dengan validasi komprehensif dan umpan balik pengiriman instan.

### 4. **Dual Engine Studio Model**
- **Pillar 01 — Digital Services**: Rekayasa perangkat lunak kustom, pengembangan web & aplikasi mobile, integrasi kecerdasan buatan (AI), automasi proses bisnis, dan rekayasa UI/UX.
- **Pillar 02 — Digital Products**: Inkubasi platform SaaS, *business applications*, *productivity systems*, dan solusi software berbasis AI.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite](https://vite.dev/)
- **Styling**: Vanilla Design Tokens (`--u` proportional scaling artboard) + [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Vector Geometry
- **Typography**: Inter Tight (Body & UI) & Archivo (Display)

---

## 📂 Struktur Direktori

```text
profile-company-aksan/
├── public/
│   └── images/               # Aset statis & foto publik (mis. hero_founder.png)
├── src/
│   ├── assets/
│   │   └── images/           # Aset visual bawaan dan fallback image
│   ├── components/
│   │   ├── common/           # Komponen utilitas (ProgressBar, ContactModal, ProjectModal)
│   │   └── sections/         # Modul section halaman (Navbar, Hero, Manifesto, Studio, dsb.)
│   ├── data/
│   │   └── studioData.ts     # Data inisiatif proyek, pilar, dan konten teks studio
│   ├── types/
│   │   └── index.ts          # Definisi interface & tipe TypeScript
│   ├── App.tsx               # Komponen utama & state management modal
│   ├── main.tsx              # React mounting root
│   └── index.css             # Desain token, tipografi, reset, dan keyframes animasi
├── index.html                # Entry HTML shell standar Vite
├── package.json              # Konfigurasi dependensi & scripts
├── tsconfig.json             # Konfigurasi TypeScript
└── vite.config.ts            # Konfigurasi Vite & build plugins
```

---

## ⚡ Panduan Instalasi & Menjalankan Lokal

Pastikan Anda telah menginstal **Node.js** (versi 18+ disarankan).

1. **Clone repositori**:
   ```bash
   git clone https://github.com/simply-aksan/project-company-profile-aksan-26058302017.git
   cd project-company-profile-aksan-26058302017
   ```

2. **Instal dependensi**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Jalankan local development server**:
   ```bash
   npm run dev
   ```
   Buka peramban Anda di `http://localhost:3000` (atau port yang tertera pada terminal).

4. **Kompilasi produksi (Build)**:
   ```bash
   npm run build
   ```

---

## 🖼️ Penggantian Foto Figur Hero (Anti-Crash)

Aplikasi telah dilengkapi sistem *safe fallback*:
1. Taruh foto baru Anda di folder `public/images/`.
2. Buka file [`src/components/sections/Hero.tsx`](src/components/sections/Hero.tsx), sesuaikan konstanta di baris atas:
   ```tsx
   const HERO_PHOTO_PATH = '/images/nama-foto-anda.png';
   ```
   *Jika foto baru tidak ditemukan atau salah ketik, sistem akan otomatis menampilkan fallback foto cadangan tanpa menyebabkan web error/crash.*

---

## 📄 Lisensi & Hak Cipta

&copy; 2026 **REKAVANTA Studio**. Seluruh hak cipta dilindungi undang-undang.
