export interface Certificate {
  id: string;
  title: string;
  titleEn: string;
  issuer: string;
  date: string;
  image: string; // halaman sertifikat (public/certs/)
  imageDetail?: string; // halaman daftar materi
  description: string; // penjelasan singkat
  topics: string[]; // materi yang dipelajari
  credentialUrl?: string; // isi jika punya link verifikasi
}

const ISSUER = "Universitas Gunadarma";

// Urutan: terbaru di atas.
export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "cert-1", title: "Dasar Pembuatan Aplikasi Web", titleEn: "Basic Web Application Development", issuer: ISSUER,
    date: "25 Mei – 6 Juni 2026", image: "/certs/cert-1.jpg", imageDetail: "/certs/cert-1-materi.jpg",
    description: "Pelatihan membangun aplikasi web dari awal: mengenal tools, mengembangkan sistem, lalu mengimplementasikan database, antarmuka pengguna, dan kodenya ke dalam bahasa pemrograman.",
    topics: ["Pengenalan tools", "Pembuatan sistem", "Implementasi database", "Implementasi user interface", "Implementasi ke bahasa pemrograman"],
  },
  {
    id: "cert-2", title: "Membangun Website Menggunakan HTML 5", titleEn: "Building Website using HTML 5", issuer: ISSUER,
    date: "15 Januari 2026", image: "/certs/cert-2.jpg", imageDetail: "/certs/cert-2-materi.jpg",
    description: "Pelatihan dasar HTML5, mulai dari elemen dasar dan elemen multimedia sampai menggambar dengan canvas, ditutup dengan membuat website sederhana.",
    topics: ["Pengantar HTML5: heading, paragraf, tabel, list", "Elemen HTML5: audio, video, section, article", "Canvas HTML5: garis, lingkaran, persegi", "Membuat website sederhana dengan HTML5"],
  },
  {
    id: "cert-3", title: "Dasar Perancangan Aplikasi Web", titleEn: "Basic Web Application Design", issuer: ISSUER,
    date: "22 – 27 September 2025", image: "/certs/cert-3.jpg", imageDetail: "/certs/cert-3-materi.jpg",
    description: "Pelatihan tahap perancangan aplikasi web: menganalisis kebutuhan sistem, merancang database dan tampilan antarmuka, lalu mulai menggunakan PHP dan XAMPP.",
    topics: ["Pengenalan aplikasi berbasis web", "Analisis sistem", "Perancangan database", "Perancangan user interface", "Penggunaan PHP dan XAMPP"],
  },
  {
    id: "cert-4", title: "Pemrograman C# untuk Tingkat Menengah", titleEn: "C# for Intermediate", issuer: ISSUER,
    date: "Agustus 2025", image: "/certs/cert-4.jpg", imageDetail: "/certs/cert-4-materi.jpg",
    description: "Lanjutan C# yang berfokus pada pengembangan web dengan ASP.NET, mulai dari Web Form dan Razor (MVC) sampai membangun Web API dengan Entity Framework.",
    topics: ["ASP.NET dan Web Form", "ASP.NET Razor: syntax dan Model-View-Controller", "ADO.NET", "Web API", "Web API dengan Entity Framework", "Web API pada aplikasi pengguna"],
  },
  {
    id: "cert-5", title: "Pemrograman Go untuk Tingkat Menengah", titleEn: "Go-lang for Intermediate", issuer: ISSUER,
    date: "Februari 2025", image: "/certs/cert-5.jpg", imageDetail: "/certs/cert-5-materi.jpg",
    description: "Lanjutan bahasa Go untuk membangun backend: menulis unit test dengan pendekatan TDD, mengakses database dengan SQL, menangani HTTP request, sampai deployment.",
    topics: ["Unit test dan Test Driven Development", "Function dan method", "SQL pada Go", "HTTP request pada Go", "Polymer: properties, data binding, observer, compute", "Polymer: layout styling", "Deployment"],
  },
  {
    id: "cert-6", title: "Pemrograman C# untuk Tingkat Pemula", titleEn: "C# for Beginner", issuer: ISSUER,
    date: "Agustus 2024", image: "/certs/cert-6.jpg", imageDetail: "/certs/cert-6-materi.jpg",
    description: "Dasar pemrograman C#, dari tipe data, percabangan, dan pengulangan, hingga OOP, lalu pengenalan pengembangan web dengan controller dan akses data.",
    topics: ["Pengenalan C#", "Tipe dan struktur data", "Pencabangan dan pengulangan", "Pemrograman berorientasi objek", "Memulai pengembangan web dan controller", "ADO.NET", "Project dan debugging"],
  },
  {
    id: "cert-7", title: "Pemrograman Go untuk Tingkat Pemula", titleEn: "Go-lang for Beginner", issuer: ISSUER,
    date: "Februari 2024", image: "/certs/cert-7.jpg", imageDetail: "/certs/cert-7-materi.jpg",
    description: "Dasar bahasa Go: sintaks, tipe data, kontrol alur, dan struktur data, lalu membuat web server Go yang mengirim data JSON.",
    topics: ["Konsep dasar bahasa Go", "Variabel, tipe data, konstanta, defer, operator", "Perulangan dan percabangan", "Struct, pointer, slice, map", "Polymer: starter kit, struktur folder, client side routing", "Web server dan JSON dengan Go"],
  },
  {
    id: "cert-8", title: "Dasar Perencanaan Sumberdaya Perusahaan", titleEn: "Fundamental ERP", issuer: ISSUER,
    date: "Februari 2024", image: "/certs/cert-8.jpg", imageDetail: "/certs/cert-8-materi.jpg",
    description: "Pengenalan konsep Enterprise Resource Planning dan praktiknya di beberapa sistem ERP, mencakup proses pembelian, sales order, dan bill of material.",
    topics: ["Konsep Enterprise Resource Planning", "Konsep dasar dan purchasing di ADempiere", "Gambaran teknologi NAV", "Purchasing, Sales Order, dan Bill of Material di NAV", "Pengenalan SAP"],
  },
  {
    id: "cert-9", title: "Dasar Pemrograman Berbasis Web", titleEn: "Fundamental Web Programming", issuer: ISSUER,
    date: "Agustus 2023", image: "/certs/cert-9.jpg", imageDetail: "/certs/cert-9-materi.jpg",
    description: "Pelatihan pengantar yang memperkenalkan berbagai pendekatan pemrograman web: Go, Java (J2EE, Servlet, JSP), dan .NET dengan C#.",
    topics: ["Pengantar pemrograman web", "Pengantar pemrograman Go dan struktur kontrol", "J2EE, Servlet, dan Java Server Page", ".NET Framework dan bahasa C#", "Server control dan CSS pada ASP.NET", "Application state"],
  },
];
