export interface Shot {
  src: string;
  caption: string;
}

export interface ProjectMeta {
  id: string;
  folder: string; // nama folder foto di public/projects/<folder>/
  title: string;
  tagline: string;
  description: string;
  purpose: string; // tujuan proyek
  details: string[]; // penjelasan detail, 1 string = 1 paragraf
  category: "Full-stack" | "Frontend" | "Backend";
  featured: boolean;
  techStack: string[];
  highlights: string[];
  captions?: string[]; // opsional: caption foto berurutan. Kalau kosong, dipakai nama file.
  liveUrl?: string;
  githubUrl?: string;
}

// Foto TIDAK ditulis di sini. Semua gambar di public/projects/<folder>/ dibaca otomatis.
export interface Project extends ProjectMeta {
  gallery: Shot[];
}

export const PROJECTS_DATA: ProjectMeta[] = [
  {
    id: "overthinkoffee",
    folder: "overthinkoffee",
    title: "Overthinkoffee",
    tagline: "Table-side QR Code Ordering & Payment System",
    description: "Aplikasi pemesanan meja kopi berbasis QR Code dengan integrasi langsung ke payment gateway untuk pengalaman transaksi seamless.",
    purpose: "Memudahkan pelanggan memesan dan membayar langsung dari meja lewat QR Code, tanpa perlu antre di kasir.",
    details: [
      "Setiap meja memiliki QR Code. Pelanggan memindainya, memilih menu, lalu membayar lewat Midtrans tanpa perlu memanggil pelayan.",
      "Status pesanan diperbarui secara real-time, sehingga progres pesanan selalu terlihat.",
      "Dibangun dengan Next.js dan TypeScript, dengan Supabase sebagai backend dan database.",
    ],
    category: "Full-stack",
    featured: true,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Midtrans API"],
    highlights: ["QR Code Table Scanning", "Real-time Order Status", "Midtrans Payment Integration"],
    captions: ["QR Code Table Scanning", "Real-time Order Status", "Midtrans Payment Integration"],
  },
  {
    id: "dashboard-analitik",
    folder: "dashboard-analitik",
    title: "Dashboard Analitik",
    tagline: "Business & Weather Analytics Dashboard",
    description: "Aplikasi web interaktif untuk memantau metrik bisnis/e-commerce (pendapatan, pesanan, rating, kategori) serta data meteorologi berbasis Open-Meteo di berbagai kota (suhu rata-rata, curah hujan, hari hujan), lengkap dengan fitur ekspor PNG dan CSV.",
    purpose: "Menyajikan data bisnis dan data cuaca dalam satu dashboard interaktif agar mudah dipantau, dibandingkan, dan dianalisis.",
    details: [
      "Sisi bisnis menampilkan metrik e-commerce seperti pendapatan, jumlah pesanan, rating, dan performa tiap kategori.",
      "Sisi cuaca mengambil data dari Open-Meteo untuk membandingkan berbagai kota: suhu rata-rata, curah hujan, dan jumlah hari hujan.",
      "Hasil analisis bisa diekspor sebagai gambar (PNG) maupun data mentah (CSV).",
    ],
    category: "Full-stack",
    featured: true,
    techStack: ["Open-Meteo API", "Data Visualization", "Export PNG & CSV"],
    highlights: ["Metrik e-commerce: pendapatan, pesanan, rating, kategori", "Analitik cuaca Open-Meteo di berbagai kota", "Ekspor PNG dan CSV"],
  },
  {
    id: "spk-jurusan-topsis",
    folder: "spk-topsis",
    title: "SPK Pemilihan Jurusan Gunadarma",
    tagline: "Decision Support System with TOPSIS Method",
    description: "Sistem pendukung keputusan rekomendasi jurusan berbasis web menggunakan metode TOPSIS berdasarkan kriteria calon mahasiswa.",
    purpose: "Membantu calon mahasiswa memilih jurusan di Universitas Gunadarma yang paling sesuai dengan kriteria mereka.",
    details: [
      "Sistem menghitung rekomendasi jurusan dengan metode TOPSIS, yaitu mengurutkan pilihan berdasarkan kedekatannya dengan solusi ideal dari beberapa kriteria sekaligus.",
      "Dikembangkan dengan metodologi RAD (Rapid Application Development) dan diuji pada 100+ responden.",
      "Aplikasi berbasis web dengan Laravel dan MySQL.",
    ],
    category: "Full-stack",
    featured: true,
    techStack: ["Laravel", "TOPSIS Method", "MySQL", "Tailwind CSS"],
    highlights: ["Multi-Criteria Decision Making (TOPSIS)", "Tested with 100+ Respondents", "RAD Methodology"],
  },
  {
    id: "minimarket-inventory",
    folder: "inventory",
    title: "Minimarket Inventory System",
    tagline: "Sistem Persediaan Barang Minimarket",
    description: "Sistem informasi persediaan barang untuk minimarket: memantau jumlah jenis barang, total stok, barang masuk, dan stok menipis dalam satu dashboard, lengkap dengan master data kategori dan barang, manajemen pengguna, serta laporan persediaan.",
    purpose: "Membantu minimarket mencatat dan memantau stok barang secara terpusat, serta mengetahui barang yang hampir habis agar bisa segera direstok.",
    details: [
      "Dashboard merangkum total jenis barang, total stok, barang masuk, dan jumlah stok menipis, dilengkapi grafik pergerakan stok bulanan (barang masuk dan keluar per tanggal) serta daftar transaksi terbaru.",
      "Daftar \"Perlu Segera Restok\" menampilkan barang yang stoknya sudah di bawah atau sama dengan batas minimum, dengan status Aman, Menipis, atau Habis. Ada juga daftar lima barang dengan stok terbanyak.",
      "Master data terdiri dari kategori barang dan daftar barang (kode, kategori, satuan, stok, batas minimum) dengan pencarian serta tambah, ubah, dan hapus data. Tersedia juga manajemen pengguna dan laporan persediaan.",
      "Dibangun dengan Laravel 12.",
    ],
    category: "Full-stack",
    featured: false,
    techStack: ["Laravel 12", "PHP", "MySQL"],
    highlights: ["Dashboard ringkasan stok dan pergerakan barang", "Peringatan stok menipis dan perlu restok", "Master data kategori dan barang", "Manajemen pengguna dan laporan persediaan"],
    captions: ["Dashboard ringkasan stok", "Barang yang perlu restok dan stok terbanyak", "Master data kategori barang", "Master data daftar barang"],
  },
  {
    id: "task-priority-planner",
    folder: "planner",
    title: "Task Priority Planner",
    tagline: "Minimalist Task & Productivity Manager",
    description: "Aplikasi perencanaan prioritas tugas dengan fitur dark mode, inline editing, filter kategori, dan penyimpanan lokal.",
    purpose: "Membantu menyusun dan memprioritaskan tugas harian dengan tampilan yang ringkas dan nyaman dipakai.",
    details: [
      "Tugas bisa diedit langsung di tempat (inline editing) tanpa pindah halaman.",
      "Tersedia filter kategori dan dark mode.",
      "Data disimpan di local storage browser, jadi tugas tidak hilang saat halaman ditutup.",
    ],
    category: "Frontend",
    featured: false,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Local Storage"],
    highlights: ["Inline Task Editing", "Dark Mode Support", "Category Filtering"],
  },
];