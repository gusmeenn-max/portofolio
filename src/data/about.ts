// ====== EDIT DI SINI ======
// Semua teks bagian "About Me" ada di file ini. Satu string = satu paragraf.
export const ABOUT = {
  heading: "Junior Web Programmer. Full-stack Builder.",
  tagline: "Lulusan S1 Sistem Informasi · Universitas Gunadarma",
  education: "S1 Sistem Informasi", // tampil di baris statistik

  paragraphs: [
    "Saya Agus Abdurrahman, lulusan S1 Sistem Informasi Universitas Gunadarma yang berfokus pada pengembangan aplikasi web full-stack dan sistem informasi berbasis data. Saya terbiasa menangani pekerjaan dari hulu ke hilir: menganalisis kebutuhan, merancang database, membangun API dan logika bisnis, hingga menyusun antarmuka yang rapi, responsif, dan mudah digunakan.",
    "Pengalaman saya terbentuk dari proyek nyata: sistem pemesanan dan pembayaran berbasis QR Code Overthinkoffee dengan Next.js, Supabase, dan Midtrans; dashboard analitik yang memvisualisasikan data bisnis dan cuaca lengkap dengan ekspor CSV dan PNG; sistem persediaan barang minimarket dengan Laravel; serta sistem pendukung keputusan pemilihan jurusan dengan metode TOPSIS yang menjadi skripsi saya dan diuji pada 100+ responden.",
    "Stack utama saya adalah Next.js, TypeScript, React, dan Tailwind CSS di sisi frontend; Go, Node.js, dan RESTful API di sisi backend; serta MySQL, PostgreSQL, dan Supabase untuk database. Saya juga membekali diri dengan sembilan pelatihan bersertifikat dari Universitas Gunadarma yang mencakup pemrograman Go, C# dan ASP.NET, HTML5, perancangan dan pembuatan aplikasi web, serta dasar-dasar ERP.",
    "Di luar kode, saya terbiasa menyusun laporan dan dokumentasi, mulai dari skripsi hingga dokumentasi proyek, serta bekerja dalam tim sebagai staf kepanitiaan Olimpiade Gunadarma. Saya bekerja secara terstruktur, teliti terhadap detail, dan cepat mempelajari teknologi baru.",
    "Saya terbuka untuk kesempatan magang maupun posisi entry-level di bidang pengembangan web, rekayasa perangkat lunak, dan dukungan operasional IT, tempat saya dapat berkontribusi sejak awal sambil terus bertumbuh bersama tim.",
  ],

  // Kartu "Bidang keahlian". Tambah atau hapus objek sesuai kebutuhan.
  expertise: [
    {
      title: "Full-stack Web Development",
      text: "Membangun aplikasi web dari database hingga antarmuka pengguna.",
      tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Laravel"],
    },
    {
      title: "Backend & Database",
      text: "Merancang API dan struktur data yang rapi, aman, dan efisien.",
      tags: ["Go", "Node.js", "RESTful API", "MySQL", "PostgreSQL", "Supabase"],
    },
    {
      title: "Analisis Sistem & Data",
      text: "Menganalisis kebutuhan, merancang sistem, dan menyajikan data dalam dashboard dan laporan.",
      tags: ["Analisis Sistem", "Perancangan Database", "Dashboard Analitik", "SPK (TOPSIS)"],
    },
    {
      title: "Dokumentasi & Kolaborasi",
      text: "Menyusun laporan dan dokumentasi, serta bekerja efektif dalam tim.",
      tags: ["Penulisan Laporan", "Dokumentasi Proyek", "Kerja Tim"],
    },
  ],
};
