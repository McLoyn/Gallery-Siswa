# PRD — Galeri Siswa
> Product Requirements Document  
> **Web Application Responsif untuk Publikasi, Dokumentasi, Apresiasi, dan Verifikasi Karya Siswa**

**Versi:** 2.0  
**Status:** Improved Draft / Development Reference  
**Target Implementasi:** Satu sekolah  
**Platform:** Responsive Web — Desktop, Laptop, Tablet, Smartphone  
**Dokumen ini:** Fokus pada kebutuhan produk, alur pengguna, fitur, UX, keamanan, dan acceptance criteria. Detail implementasi database tidak dibahas secara teknis di dokumen ini.

---

## 0. Ringkasan Perubahan dari PRD Sebelumnya

PRD versi ini mempertahankan fondasi versi sebelumnya: Galeri Siswa ditujukan sebagai platform sekolah untuk mengunggah, mendokumentasikan, menampilkan, mengapresiasi, dan memverifikasi karya siswa; targetnya satu sekolah; dan platform utamanya adalah web responsif. 

Peningkatan utama pada versi 2.0:

1. Requirement dibuat lebih terukur dan lebih mudah diterjemahkan menjadi task development.
2. Alur pengguna diperjelas dari login sampai karya diterbitkan.
3. Metode login siswa diperluas untuk mendukung **NISN**, termasuk opsi **scan kartu siswa/QR** sebagai input identitas.
4. Role dan permission dibuat lebih eksplisit.
5. Ditambahkan aturan lifecycle karya, revisi setelah ditolak, pengarsipan, dan penghapusan.
6. Ditambahkan detail kebutuhan upload: validasi, progress, preview, kegagalan, dan penyimpanan.
7. Ditambahkan content moderation, reporting, copyright/permission, dan audit aktivitas penting.
8. Ditambahkan kebutuhan notifikasi yang lebih jelas.
9. Ditambahkan empty state, loading state, error state, confirmation, dan accessibility dasar.
10. Acceptance criteria diperinci agar fitur dapat diuji.
11. Ditambahkan KPI, Definition of Ready, Definition of Done, risiko, dependency, dan open questions.
12. Roadmap dipisahkan menjadi **MVP**, **Phase 2**, dan **Phase 3** agar scope tidak melebar.

---

# 1. Product Overview

## 1.1 Nama Produk

**Galeri Siswa**

## 1.2 Tagline

**Ruang Digital untuk Karya, Apresiasi, dan Portofolio Siswa.**

## 1.3 Deskripsi Produk

Galeri Siswa adalah aplikasi web internal sekolah yang menyediakan satu ruang terpusat untuk:

- mengunggah karya siswa;
- menyimpan dokumentasi karya;
- menampilkan karya yang telah disetujui;
- memberikan apresiasi melalui like;
- memberikan interaksi melalui komentar;
- memungkinkan guru memeriksa dan memberi feedback;
- membantu admin mengelola pengguna dan konten;
- membangun portofolio digital siswa.

Aplikasi harus dapat digunakan dengan nyaman pada perangkat desktop, laptop, tablet, dan smartphone melalui browser.

## 1.4 Product Vision

Membuat karya siswa lebih **mudah ditemukan, terdokumentasi, diapresiasi, dan dikembangkan** melalui platform digital sekolah yang sederhana dan aman.

## 1.5 Product Principles

Produk mengikuti prinsip:

**Simple**  
Siswa dapat memahami cara memakai aplikasi tanpa tutorial panjang.

**Safe**  
Karya dan interaksi mengikuti aturan sekolah.

**Transparent**  
Siswa dapat mengetahui status karya dan alasan penolakan.

**Appreciative**  
Interaksi dirancang untuk memberikan apresiasi positif.

**Maintainable**  
Fitur MVP tidak dibuat berlebihan sehingga mudah dikembangkan dan diuji.

**Responsive**  
Pengalaman inti tetap nyaman pada layar kecil.

---

# 2. Background & Problem

## 2.1 Latar Belakang

Siswa menghasilkan berbagai jenis karya seperti:

- desain grafis;
- fotografi;
- ilustrasi;
- video;
- tulisan;
- puisi;
- cerpen;
- musik;
- karya seni;
- proyek teknologi;
- karya ilmiah;
- dokumentasi kegiatan sekolah.

Dalam kondisi tanpa platform terpusat, karya dapat tersebar di perangkat pribadi, folder kelas, grup chat, media sosial, atau media penyimpanan yang berbeda. Akibatnya, karya lama sulit ditemukan kembali dan dokumentasi sekolah menjadi tidak konsisten.

Guru juga memerlukan proses yang lebih terstruktur untuk memeriksa karya sebelum ditampilkan.

Galeri Siswa menyediakan satu ruang digital khusus sekolah untuk menyelesaikan masalah tersebut.

## 2.2 Problem Statement

### P-01 — Dokumentasi tersebar
Tidak terdapat satu tempat terpusat untuk menyimpan dan menampilkan karya siswa.

### P-02 — Discovery rendah
Karya lama sulit ditemukan kembali karena berada di banyak tempat.

### P-03 — Apresiasi belum terstruktur
Siswa belum memiliki media sekolah yang secara khusus memungkinkan karya mereka mendapatkan apresiasi.

### P-04 — Review manual
Pemeriksaan karya oleh guru berpotensi dilakukan melalui komunikasi terpisah dan sulit ditelusuri.

### P-05 — Status tidak jelas
Siswa dapat tidak mengetahui apakah karyanya masih menunggu, telah disetujui, atau ditolak.

### P-06 — Portofolio tidak terpusat
Siswa membutuhkan tempat yang dapat merepresentasikan karya mereka secara terorganisir.

### P-07 — Moderasi
Konten digital membutuhkan proses untuk mencegah komentar atau karya yang tidak sesuai aturan sekolah.

---

# 3. Goals & Objectives

## 3.1 Primary Goals

1. Membuat galeri digital sekolah yang terpusat.
2. Memudahkan siswa mengunggah dan mengelola karya.
3. Membuat proses review guru lebih jelas dan terdokumentasi.
4. Mendorong apresiasi dan interaksi positif.
5. Menjadi arsip digital karya siswa.
6. Menjadi fondasi portofolio karya siswa.

## 3.2 Secondary Goals

1. Mengurangi karya yang hilang atau sulit ditemukan.
2. Membantu sekolah menunjukkan aktivitas kreatif siswa.
3. Menghasilkan statistik penggunaan dasar.
4. Membangun fondasi untuk event/lomba karya pada tahap berikutnya.

## 3.3 Non-Goals

MVP tidak bertujuan menjadi:

- marketplace;
- platform pembayaran;
- media sosial penuh;
- aplikasi chat pribadi;
- sistem penilaian otomatis berbasis AI;
- platform multi-sekolah;
- aplikasi native Android/iOS.

---

# 4. Target Users

## 4.1 Siswa

### Tujuan
Mengunggah, mengelola, melihat, dan mendapatkan apresiasi atas karya.

### Kebutuhan utama

- login yang mudah;
- upload karya;
- melihat status review;
- memperbaiki karya setelah ditolak;
- melihat karya sendiri;
- menemukan karya teman;
- like dan komentar;
- mengelola profil.

## 4.2 Guru

### Tujuan
Memeriksa karya, memberikan feedback, dan menjaga kualitas konten.

### Kebutuhan utama

- antrean review;
- preview karya;
- informasi pembuat;
- approve/reject;
- catatan review;
- moderasi komentar;
- statistik sederhana.

## 4.3 Admin

### Tujuan
Mengelola operasional aplikasi.

### Kebutuhan utama

- mengelola pengguna;
- mengelola role;
- mengelola kategori;
- mengelola konten;
- menangani laporan;
- melihat statistik;
- melakukan tindakan administratif.

---

# 5. Assumptions

Asumsi berikut digunakan untuk rancangan MVP:

1. Produk digunakan untuk satu sekolah.
2. Pengguna mempunyai perangkat yang dapat membuka browser modern.
3. Sekolah memiliki daftar siswa/guru sebagai sumber data awal.
4. Guru yang melakukan review ditunjuk oleh sekolah.
5. Konten yang ditampilkan mengikuti kebijakan sekolah.
6. Internet diperlukan untuk fungsi utama aplikasi.
7. File karya disimpan secara digital dan dapat memiliki ukuran yang bervariasi.
8. Sistem tidak ditujukan sebagai penyimpanan file pribadi tanpa proses publikasi.
9. Setiap karya yang dipublikasikan melewati proses review.
10. Detail kebijakan eksternal sekolah harus ditetapkan oleh pihak sekolah.

---

# 6. Scope

## 6.1 MVP — Must Have

### Authentication & Access
- login;
- logout;
- session;
- role-based access;
- login siswa menggunakan NISN;
- opsi scan kartu siswa/QR sebagai input NISN atau identifier;
- proteksi halaman berdasarkan role.

### Profile
- melihat profil;
- mengubah informasi profil yang diizinkan;
- melihat daftar karya milik sendiri.

### Works
- membuat karya;
- mengunggah file;
- preview;
- validasi;
- menyimpan sebagai draft;
- mengirim untuk review;
- edit karya sendiri;
- menghapus karya sendiri sesuai status;
- melihat status;
- melihat catatan penolakan;
- mengirim revisi.

### Gallery
- menampilkan karya yang disetujui;
- detail karya;
- kategori;
- search;
- filter;
- pagination/infinite loading sesuai implementasi.

### Interaction
- like;
- komentar;
- hapus komentar milik sendiri;
- moderasi komentar oleh guru/admin.

### Review
- daftar karya menunggu review;
- preview;
- approve;
- reject;
- catatan review;
- riwayat keputusan.

### Administration
- pengguna;
- role;
- kategori;
- karya;
- komentar/laporan;
- statistik dasar.

## 6.2 Phase 2

- notifikasi yang lebih lengkap;
- bookmark/favorit;
- featured karya;
- badge/pencapaian;
- pencarian lebih canggih;
- export portofolio;
- notifikasi email bila dibutuhkan.

## 6.3 Phase 3

- event/lomba;
- koleksi karya berdasarkan event;
- analytics lebih lengkap;
- PWA/offline ringan;
- fitur publikasi eksternal yang dikendalikan sekolah.

---

# 7. Authentication & Account Model

## 7.1 Prinsip

Autentikasi dan identitas pengguna harus dipisahkan dari data profil.

Sistem harus mengetahui:

- siapa pengguna;
- role pengguna;
- profil pengguna;
- apakah pengguna aktif;
- hak akses pengguna.

## 7.2 Login Siswa

MVP mendukung alur utama:

```text
Halaman Login
      ↓
Masukkan NISN
      ↓
Verifikasi identitas
      ↓
Masuk
```

Selain input manual, aplikasi dapat menyediakan:

```text
Halaman Login
      ↓
Scan Kartu Siswa / QR
      ↓
Mendapatkan NISN / identifier
      ↓
Verifikasi
      ↓
Masuk
```

### Catatan keamanan

NISN sebaiknya berfungsi sebagai **identifier**, bukan otomatis menjadi password.

Jika sekolah meminta login tanpa password, perlu ditentukan mekanisme verifikasi kedua, misalnya:

- PIN;
- kode satu kali;
- mekanisme verifikasi lain yang disetujui sekolah.

Keputusan final harus mengikuti kebijakan sekolah.

## 7.3 Login Guru & Admin

Metode login guru/admin dapat menggunakan kredensial yang ditetapkan sekolah.

Perbedaan metode login tidak boleh menghilangkan kontrol role.

## 7.4 Session

Sistem harus:

- mempertahankan session selama masa login;
- menyediakan logout;
- menangani session expired;
- mengarahkan pengguna kembali ke login jika session tidak valid.

## 7.5 Account State

Status akun yang perlu dipertimbangkan:

- Active;
- Inactive;
- Suspended.

Akun yang dinonaktifkan tidak boleh melakukan aksi yang memerlukan autentikasi.

---

# 8. Roles & Permissions

| Capability | Siswa | Guru | Admin |
|---|:---:|:---:|:---:|
| Melihat karya disetujui | ✓ | ✓ | ✓ |
| Search/filter | ✓ | ✓ | ✓ |
| Melihat detail karya | ✓ | ✓ | ✓ |
| Upload karya | ✓ | Opsional | ✓ |
| Edit karya sendiri | ✓ | ✓ | ✓ |
| Hapus karya sendiri | ✓ | ✓ | ✓ |
| Melihat status sendiri | ✓ | — | ✓ |
| Like | ✓ | ✓ | ✓ |
| Komentar | ✓ | ✓ | ✓ |
| Hapus komentar sendiri | ✓ | ✓ | ✓ |
| Review karya | — | ✓ | ✓ |
| Approve/reject | — | ✓ | ✓ |
| Moderasi komentar | — | ✓ | ✓ |
| Kelola pengguna | — | — | ✓ |
| Kelola role | — | — | ✓ |
| Kelola kategori | — | — | ✓ |
| Kelola laporan | — | ✓ | ✓ |
| Statistik dasar | — | ✓ | ✓ |

### Permission principle

UI bukan satu-satunya pengaman.

Aksi sensitif harus tetap divalidasi di backend dan layer keamanan data.

---

# 9. Core User Journeys

## 9.1 Journey — Siswa Masuk

```text
Buka Galeri Siswa
      ↓
Login
      ↓
Masukkan NISN
      ↓
Verifikasi
      ↓
Dashboard/Beranda
```

## 9.2 Journey — Scan Kartu

```text
Login
  ↓
Scan Kartu
  ↓
QR/Barcode terbaca
  ↓
Identifier ditemukan
  ↓
Verifikasi
  ↓
Login berhasil
```

### Error cases

Jika scan gagal:

```text
Scan gagal
  ↓
Pesan penyebab
  ↓
Coba lagi
  ↓
Atau masukkan NISN manual
```

Jika identifier tidak ditemukan:

> “Data siswa tidak ditemukan. Periksa kartu atau masukkan NISN secara manual.”

## 9.3 Journey — Upload Karya

```text
Siswa Login
      ↓
Upload Karya
      ↓
Pilih File
      ↓
Preview
      ↓
Isi Metadata
      ↓
Validasi
      ↓
Simpan Draft / Kirim Review
```

## 9.4 Journey — Review Guru

```text
Guru Login
      ↓
Dashboard Review
      ↓
Pilih Karya
      ↓
Preview
      ↓
Approve / Reject
      ↓
Tambahkan Catatan jika perlu
      ↓
Status diperbarui
```

## 9.5 Journey — Revisi

```text
Karya Ditolak
      ↓
Siswa melihat alasan
      ↓
Edit Karya
      ↓
Perbaikan
      ↓
Kirim ulang
      ↓
Menunggu Review
```

## 9.6 Journey — Eksplorasi

```text
Beranda
  ↓
Galeri
  ↓
Search / Filter
  ↓
Detail Karya
  ↓
Like / Komentar
```

## 9.7 Journey — Report

```text
Detail Karya / Komentar
      ↓
Laporkan
      ↓
Pilih alasan
      ↓
Konfirmasi
      ↓
Laporan masuk moderasi
```

---

# 10. Information Architecture / Sitemap

```text
Galeri Siswa
│
├── Beranda
│   ├── Ringkasan
│   ├── Karya terbaru
│   └── Kategori
│
├── Galeri
│   ├── Semua Karya
│   ├── Search
│   ├── Filter
│   └── Detail Karya
│
├── Login
│   ├── NISN
│   ├── Scan Kartu
│   └── Verifikasi
│
├── Profil Saya
│   ├── Informasi Profil
│   └── Karya Saya
│
├── Upload Karya
│
├── Dashboard Siswa
│   ├── Draft
│   ├── Menunggu Review
│   ├── Disetujui
│   ├── Ditolak
│   └── Diarsipkan
│
├── Dashboard Guru
│   ├── Ringkasan
│   ├── Menunggu Review
│   ├── Riwayat Review
│   └── Moderasi
│
└── Dashboard Admin
    ├── Ringkasan
    ├── Pengguna
    ├── Role
    ├── Kategori
    ├── Karya
    ├── Komentar
    ├── Laporan
    └── Statistik
```

---

# 11. Feature Requirements

## F-01 Authentication

### Deskripsi
Sistem mengelola login, logout, session, dan akses berdasarkan role.

### Acceptance Criteria
- pengguna dapat login dengan metode yang ditetapkan;
- session terbentuk setelah verifikasi berhasil;
- pengguna dapat logout;
- pengguna tanpa permission tidak dapat membuka halaman khusus role lain;
- session expired ditangani dengan jelas.

---

## F-02 Student NISN Login

### Deskripsi
Siswa dapat memulai autentikasi dengan memasukkan NISN.

### Acceptance Criteria
- input hanya menerima format yang valid;
- spasi di awal/akhir ditangani;
- sistem memberikan pesan bila NISN tidak ditemukan;
- sistem tidak menampilkan data siswa lain hanya karena pencarian NISN;
- proses login tidak menjadikan NISN sebagai password otomatis.

---

## F-03 Student Card / QR Scan

### Deskripsi
Aplikasi menyediakan opsi scan kartu siswa jika kartu memiliki QR/barcode yang kompatibel.

### Acceptance Criteria
- kamera dapat meminta permission;
- pengguna dapat membatalkan scan;
- hasil scan dapat diverifikasi;
- jika scan gagal, pengguna dapat mencoba lagi;
- tersedia fallback input NISN manual;
- data mentah QR tidak ditampilkan sebagai informasi sensitif secara tidak perlu.

### Dependency
Implementasi final bergantung pada format kartu/QR yang dimiliki sekolah.

---

## F-04 Profile

### Deskripsi
Pengguna mempunyai halaman profil.

### Minimal Information
- nama;
- role;
- kelas/jurusan bila relevan;
- foto profil bila tersedia;
- daftar karya.

### Acceptance Criteria
- profil milik sendiri dapat dikelola sesuai permission;
- informasi penting tidak dapat diubah sembarang pengguna;
- daftar karya hanya menampilkan karya sesuai visibility policy.

---

# 12. Work Management

## F-05 Create Work

Siswa dapat membuat karya dengan metadata minimum:

- judul;
- deskripsi;
- kategori;
- file;
- informasi pembuat yang diambil dari profil;
- opsi tag bila digunakan.

## F-06 Draft

Siswa dapat menyimpan karya sebagai draft sebelum dikirim.

### Draft behavior
- draft tidak muncul di galeri;
- draft hanya dapat dilihat oleh pemilik dan role berwenang;
- siswa dapat melanjutkan draft;
- draft dapat dihapus.

## F-07 Submit for Review

Saat siswa memilih **Kirim untuk Review**:

1. sistem memvalidasi field wajib;
2. sistem memvalidasi file;
3. sistem menyimpan perubahan;
4. status menjadi `Menunggu Review`;
5. sistem memberi feedback bahwa submit berhasil.

## F-08 Edit Work

Aturan edit harus bergantung pada status.

| Status | Edit Siswa |
|---|---|
| Draft | ✓ |
| Menunggu Review | Terbatas / perlu kebijakan |
| Disetujui | Perlu aturan re-review |
| Ditolak | ✓ |
| Diarsipkan | — |

### Rekomendasi
Setelah karya yang sudah disetujui diubah pada informasi atau file penting, karya sebaiknya kembali ke proses review agar konten publik tetap terkontrol.

## F-09 Delete Work

Siswa dapat menghapus karya miliknya sesuai status.

Sistem harus meminta konfirmasi sebelum penghapusan.

Contoh:

> “Apakah kamu yakin ingin menghapus karya ini? Tindakan ini dapat menghapus akses terhadap karya tersebut.”

---

# 13. Work Status Lifecycle

## Status

### `Draft`
Karya belum dikirim.

### `Menunggu Review`
Karya telah dikirim dan menunggu pemeriksaan guru.

### `Disetujui`
Karya lolos review dan dapat ditampilkan di galeri.

### `Ditolak`
Karya tidak lolos review dan memiliki alasan/catatan.

### `Diarsipkan`
Karya tidak lagi aktif ditampilkan.

## State Transition

```text
Draft
  ↓
Menunggu Review
  ↓
┌────────────────┐
│                │
↓                ↓
Disetujui       Ditolak
│                │
│                ↓
│             Revisi
│                │
│                ↓
│          Menunggu Review
│
↓
Diarsipkan
```

## Rules

1. Karya `Ditolak` harus memiliki alasan.
2. Karya `Disetujui` yang ditampilkan di galeri harus memenuhi kebijakan konten.
3. Karya `Diarsipkan` tidak muncul pada daftar publik utama.
4. Perubahan status penting harus dapat ditelusuri.
5. Siswa tidak boleh mengubah status menjadi `Disetujui` sendiri.

---

# 14. Upload Requirements

## 14.1 Validation

Sistem harus memvalidasi:

- tipe file;
- ekstensi;
- ukuran file;
- apakah file benar-benar tersedia;
- metadata wajib;
- nama file yang aman.

## 14.2 Upload UX

Saat upload berlangsung, tampilkan:

- progress;
- status;
- tombol cancel bila implementasi mendukung;
- error yang dapat dimengerti.

Contoh:

> “Mengunggah karya… 63%”

## 14.3 Upload Failure

Jika gagal:

> “Upload gagal. Periksa koneksi internet dan coba lagi.”

Data form sebaiknya tidak hilang tanpa alasan.

## 14.4 Media Preview

Untuk format yang didukung, aplikasi menampilkan preview sebelum submit.

## 14.5 File Size

Batas ukuran file harus ditentukan berdasarkan kapasitas storage dan kondisi internet sekolah.

**Rekomendasi awal (dapat disesuaikan):**
- gambar: sampai 10 MB;
- dokumen: sampai 10 MB;
- video: sampai 100 MB untuk MVP.

Angka ini merupakan **target rancangan awal**, bukan aturan final sekolah.

## 14.6 Performance

Untuk gambar, gunakan thumbnail/optimasi agar galeri tidak memuat file asli berukuran besar.

---

# 15. Gallery

## 15.1 Gallery Card

Kartu karya minimal menampilkan:

- thumbnail;
- judul;
- nama siswa;
- kategori;
- waktu/tanggal bila diperlukan;
- jumlah like bila ditampilkan.

## 15.2 Detail Work

Halaman detail minimal menampilkan:

- judul;
- karya/media;
- pembuat;
- kelas/jurusan bila diizinkan;
- kategori;
- deskripsi;
- tanggal publikasi;
- like;
- komentar;
- status untuk pemilik/guru/admin bila relevan.

## 15.3 Visibility

MVP sebaiknya memisahkan:

- konten yang belum disetujui;
- konten yang disetujui;
- konten diarsipkan.

Karya yang belum disetujui tidak boleh muncul di gallery utama.

---

# 16. Search & Filter

## Search

Pengguna dapat mencari berdasarkan:

- judul karya;
- nama pembuat.

## Filter

Minimal:

- kategori;
- status untuk dashboard pemilik/guru/admin.

Filter tambahan pada tahap berikutnya dapat berupa:

- kelas;
- jurusan;
- rentang waktu;
- tag.

## Empty State

Jika tidak ada hasil:

> “Belum ditemukan karya yang sesuai.”

Sediakan tombol reset filter.

---

# 17. Like / Apresiasi

## Rules

1. Satu akun hanya dapat memberikan satu like pada satu karya.
2. Pengguna dapat unlike.
3. Jumlah like diperbarui setelah aksi berhasil.
4. Like tidak boleh menggandakan record secara tidak sengaja.
5. Aksi gagal harus memberikan feedback.

## UX

Tombol like harus memberikan state:

```text
Belum disukai → Like
Sudah disukai → Liked
```

---

# 18. Comments

## User Actions

Pengguna dapat:

- membaca komentar;
- menambahkan komentar;
- menghapus komentar miliknya sendiri.

Guru/admin dapat melakukan moderasi sesuai permission.

## Validation

Komentar harus:

- tidak kosong;
- memiliki panjang maksimum;
- melewati validasi/sanitasi;
- tidak mengandung konten terlarang sesuai kebijakan sekolah.

## Moderation

Guru/admin dapat:

- menyembunyikan;
- menghapus;
- menindaklanjuti komentar yang dilaporkan.

## Anti-Spam

Untuk MVP dapat diterapkan:

- rate limiting;
- batas frekuensi komentar;
- validasi panjang;
- proteksi request berulang.

---

# 19. Review Guru

## 19.1 Review Queue

Dashboard guru menampilkan:

- jumlah karya menunggu review;
- daftar karya terbaru;
- filter kategori;
- waktu pengajuan;
- identitas pembuat.

## 19.2 Review Detail

Guru dapat membuka:

- file/media;
- judul;
- deskripsi;
- kategori;
- pembuat;
- informasi pendukung;
- riwayat review bila tersedia.

## 19.3 Decision

Pilihan minimal:

**Approve / Setujui**

**Reject / Tolak**

Jika reject, catatan harus diwajibkan.

## 19.4 Review Note

Contoh:

> “Deskripsi sudah baik, tetapi sumber gambar perlu dicantumkan.”

Catatan ditampilkan kepada siswa dengan bahasa yang jelas dan konstruktif.

## 19.5 SLA Review

Sekolah perlu menentukan target waktu review.

Contoh target awal:

> 90% karya diproses dalam SLA yang ditentukan sekolah.

---

# 20. Moderation & Reporting

## 20.1 Report

Pengguna dapat melaporkan:

- karya;
- komentar.

### Contoh alasan

- konten tidak pantas;
- spam;
- penghinaan/pelecehan;
- pelanggaran hak cipta;
- karya bukan milik pengunggah;
- pelanggaran aturan sekolah;
- kategori salah.

## 20.2 Moderation Workflow

```text
Report
  ↓
Masuk antrean
  ↓
Guru/Admin memeriksa
  ↓
Tetap tampil / disembunyikan / dihapus
  ↓
Tindakan dicatat
```

## 20.3 Copyright & Permission

Saat upload, sistem sebaiknya meminta konfirmasi:

> “Saya memastikan karya ini adalah milik saya atau saya memiliki izin yang diperlukan untuk mengunggahnya.”

Kebijakan final harus mengikuti aturan sekolah.

---

# 21. Notifications

## MVP Minimal

Notifikasi dapat ditunda ke tahap 2, tetapi model event perlu dipikirkan sejak awal.

Event penting:

- karya dikirim;
- karya disetujui;
- karya ditolak;
- karya perlu direvisi;
- komentar baru;
- laporan ditindaklanjuti bila kebijakan memerlukannya.

## Notification UX

Notifikasi harus memiliki:

- jenis;
- waktu;
- status sudah dibaca/belum;
- link ke konten terkait bila relevan.

---

# 22. Dashboard Siswa

Dashboard siswa menampilkan:

### Ringkasan
- total karya;
- draft;
- menunggu review;
- disetujui;
- ditolak.

### Quick Actions
- Upload karya;
- Lihat karya saya.

### Recent Activity
- karya terakhir;
- status review terakhir.

---

# 23. Dashboard Guru

Dashboard guru menampilkan:

- jumlah karya menunggu review;
- karya yang perlu ditindaklanjuti;
- jumlah karya disetujui;
- jumlah karya ditolak;
- komentar/laporan yang perlu dimoderasi.

## Prioritas

Antrean review harus mudah dipahami dan tidak terlalu padat.

---

# 24. Dashboard Admin

Minimal menampilkan:

- total pengguna;
- total karya;
- karya menunggu review;
- karya disetujui;
- karya ditolak;
- kategori;
- komentar;
- laporan.

Statistik pada MVP bersifat operasional, bukan analytics kompleks.

---

# 25. UI/UX Requirements

## 25.1 Responsive

Target viewport:

- smartphone;
- tablet;
- laptop;
- desktop.

## 25.2 Mobile-first

Prioritaskan aksi utama:

- login;
- lihat galeri;
- upload;
- cek status;
- review sederhana untuk guru.

## 25.3 Navigation

Navigasi harus jelas dan konsisten.

Contoh:

```text
Beranda
Galeri
Karya Saya
Upload
Profil
```

Navigation khusus guru/admin ditampilkan berdasarkan role.

## 25.4 Loading State

Setiap halaman yang mengambil data harus mempunyai loading state.

## 25.5 Error State

Error harus:

- menjelaskan masalah;
- tidak menampilkan error teknis mentah kepada pengguna;
- menyediakan tindakan yang relevan.

## 25.6 Empty State

Setiap list penting harus mempunyai empty state.

Contoh:

> “Belum ada karya.”

> “Belum ada karya yang menunggu review.”

## 25.7 Confirmation

Aksi destruktif harus meminta konfirmasi:

- hapus karya;
- hapus komentar;
- arsipkan karya;
- perubahan administratif penting.

## 25.8 Feedback

Aksi berhasil harus memberikan feedback.

Contoh:

> “Karya berhasil dikirim untuk review.”

## 25.9 Accessibility

Minimal:

- label form jelas;
- ukuran tombol dapat disentuh;
- kontras layak;
- fokus keyboard;
- alt text untuk gambar;
- pesan error terkait field;
- jangan hanya menggunakan warna untuk menunjukkan status.

---

# 26. Content Rules

## Allowed

- karya pembelajaran;
- seni;
- desain;
- teknologi;
- tulisan;
- fotografi;
- video;
- karya ilmiah;
- proyek sekolah;
- dokumentasi kegiatan siswa.

## Prohibited / Review Required

- penghinaan;
- pelecehan;
- ujaran kebencian;
- pornografi/eksploitasi;
- spam;
- materi ilegal;
- karya yang bukan milik pengguna tanpa izin;
- konten yang melanggar tata tertib sekolah.

Kebijakan final tetap menjadi keputusan sekolah.

---

# 27. Privacy

## Prinsip

Sistem mengumpulkan data yang diperlukan untuk fungsi aplikasi.

## Data yang perlu diproteksi

Contoh:

- identitas siswa;
- NISN;
- informasi kelas;
- data akun;
- aktivitas internal.

## Rules

1. NISN tidak ditampilkan sebagai informasi publik pada kartu karya.
2. Informasi sensitif tidak boleh dikirim berlebihan ke frontend.
3. Halaman admin tidak boleh dapat diakses siswa.
4. Hak akses harus diuji dengan akun dari setiap role.
5. Log/audit tidak boleh membocorkan secret atau credential.

---

# 28. Security Requirements

## Authentication

- gunakan mekanisme autentikasi yang aman;
- session harus dikelola dengan benar;
- logout harus mengakhiri session sesuai mekanisme;
- jangan menyimpan password mentah.

## Authorization

Authorization harus diterapkan:

- pada frontend untuk UX;
- pada backend untuk enforcement;
- pada layer keamanan data bila digunakan.

## Upload Security

- validasi MIME type;
- validasi ekstensi;
- batas ukuran;
- nama file aman;
- hindari eksekusi file upload;
- pisahkan file publik dan private sesuai kebutuhan.

## API Security

- validasi input;
- authorization;
- rate limiting untuk endpoint sensitif;
- error message aman;
- secret melalui environment variables.

## Audit

Audit minimal untuk:

- approve/reject;
- delete;
- archive;
- perubahan role;
- tindakan moderasi;
- tindakan administratif penting.

---

# 29. Performance Requirements

## Proposed Targets

Angka berikut adalah target rancangan awal dan dapat disesuaikan setelah pengujian nyata.

### Gallery

- gunakan pagination atau incremental loading;
- jangan memuat seluruh karya sekaligus;
- gunakan thumbnail;
- lazy-load media bila sesuai.

### Interaction

Feedback like/comment idealnya terasa cepat dan tidak membuat UI freeze.

### Network

Aplikasi harus tetap usable pada koneksi sekolah yang lambat.

### Upload

Upload besar harus memperlihatkan progress dan menangani retry/failure dengan baik.

---

# 30. Reliability

Sistem harus menangani:

- upload gagal;
- API error;
- session expired;
- data tidak ditemukan;
- koneksi terputus;
- request ganda;
- file rusak;
- permission ditolak.

Pengguna tidak boleh kehilangan data form tanpa penjelasan.

---

# 31. Error & Edge Cases

## Authentication

**NISN tidak ditemukan**  
Tampilkan pesan yang aman dan jelas.

**Scan gagal**  
Sediakan retry dan input manual.

**Session expired**  
Arahkan ke login.

## Upload

**Ukuran terlalu besar**  
Tolak sebelum upload penuh bila memungkinkan.

**Format tidak didukung**  
Tampilkan daftar format yang diperbolehkan.

**Internet terputus**  
Pertahankan metadata form selama aman dilakukan.

## Review

**Guru membuka karya yang sudah ditinjau**  
Tampilkan status terbaru dan cegah keputusan yang tidak konsisten.

**Siswa mengedit karya saat sedang direview**  
Gunakan aturan status yang jelas; perubahan penting dapat mengembalikan karya ke proses review.

## Comments

**Komentar spam**  
Rate-limit dan moderasi.

**Komentar dihapus admin**  
Status komentar diperbarui secara konsisten.

## Admin

**Role berubah**  
Perubahan harus tercatat dan permission baru berlaku sesuai policy.

---

# 32. Functional Requirements Matrix

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Sistem mendukung login/logout | Must |
| FR-02 | Sistem memiliki role siswa/guru/admin | Must |
| FR-03 | Siswa dapat login menggunakan NISN | Must |
| FR-04 | Sistem mendukung opsi scan kartu/QR | Must |
| FR-05 | Sistem memiliki profil pengguna | Must |
| FR-06 | Siswa dapat membuat draft karya | Must |
| FR-07 | Siswa dapat upload file | Must |
| FR-08 | Sistem memvalidasi upload | Must |
| FR-09 | Siswa dapat mengirim karya untuk review | Must |
| FR-10 | Guru dapat melihat antrean review | Must |
| FR-11 | Guru dapat approve/reject | Must |
| FR-12 | Reject wajib memiliki catatan | Must |
| FR-13 | Siswa dapat melihat status karya | Must |
| FR-14 | Siswa dapat merevisi karya ditolak | Must |
| FR-15 | Karya disetujui tampil di galeri | Must |
| FR-16 | Pengguna dapat search | Must |
| FR-17 | Pengguna dapat filter | Must |
| FR-18 | Pengguna dapat like | Must |
| FR-19 | Like tidak dapat digandakan | Must |
| FR-20 | Pengguna dapat komentar | Must |
| FR-21 | Guru/admin dapat moderasi komentar | Must |
| FR-22 | Pengguna dapat report | Should |
| FR-23 | Admin dapat mengelola pengguna | Must |
| FR-24 | Admin dapat mengelola kategori | Must |
| FR-25 | Admin dapat melihat statistik dasar | Must |
| FR-26 | Sistem menyimpan audit tindakan penting | Should |
| FR-27 | Sistem menyediakan notifikasi status | Should / Phase 2 |

---

# 33. Non-Functional Requirements

| ID | Area | Requirement |
|---|---|---|
| NFR-01 | Responsive | UI dapat digunakan pada smartphone/tablet/desktop |
| NFR-02 | Security | Authorization tidak hanya bergantung pada frontend |
| NFR-03 | Privacy | Data pribadi diminimalkan dan dibatasi aksesnya |
| NFR-04 | Performance | Gallery menggunakan pagination/lazy loading bila diperlukan |
| NFR-05 | Reliability | Error koneksi ditangani secara jelas |
| NFR-06 | Accessibility | Form dan navigation memiliki aksesibilitas dasar |
| NFR-07 | Maintainability | Struktur frontend/backend modular |
| NFR-08 | Observability | Error penting dapat ditelusuri |
| NFR-09 | Scalability | Arsitektur dapat menangani penambahan karya dan pengguna |
| NFR-10 | Compatibility | Mendukung browser modern yang digunakan sekolah |

---

# 34. Data Domain (Non-Technical)

Untuk menjaga fokus PRD, data dibagi menjadi domain bisnis berikut:

## User Domain
- identitas pengguna;
- role;
- kelas/jurusan;
- status akun.

## Work Domain
- karya;
- metadata;
- status;
- riwayat review;
- file/media.

## Catalog Domain
- kategori;
- tag bila digunakan.

## Interaction Domain
- like;
- komentar;
- laporan.

## Notification Domain
- pemberitahuan status;
- aktivitas yang relevan.

> Struktur tabel/SQL, tipe kolom, foreign key, RLS policy detail, dan implementasi storage merupakan dokumen teknis terpisah.

---

# 35. API / Backend Contract (High Level)

PRD tidak mengunci implementasi framework, tetapi endpoint inti yang dibutuhkan:

| Method | Endpoint | Tujuan |
|---|---|---|
| GET | `/api/works` | daftar karya |
| GET | `/api/works/:id` | detail karya |
| POST | `/api/works` | membuat karya |
| PATCH | `/api/works/:id` | memperbarui karya |
| DELETE | `/api/works/:id` | menghapus karya |
| POST | `/api/works/:id/submit` | mengirim review |
| POST | `/api/works/:id/like` | like/unlike |
| GET | `/api/works/:id/comments` | daftar komentar |
| POST | `/api/works/:id/comments` | membuat komentar |
| DELETE | `/api/comments/:id` | menghapus komentar |
| POST | `/api/comments/:id/report` | melaporkan komentar |
| GET | `/api/reviews/pending` | antrean review |
| POST | `/api/works/:id/review` | approve/reject |
| GET | `/api/categories` | daftar kategori |
| POST | `/api/categories` | membuat kategori |
| GET | `/api/me` | profil/session user |
| PATCH | `/api/me` | memperbarui profil |

Endpoint final dapat berubah ketika desain teknis selesai.

---

# 36. Technology Direction

## Frontend

**React.js**

Peran:
- UI;
- routing;
- form;
- state;
- gallery;
- responsive interaction.

## Backend

**Node.js + Express.js**

Peran:
- REST API;
- business logic;
- validation;
- authorization;
- orchestration.

## Backend Services

**Supabase**
- Authentication;
- PostgreSQL;
- Storage;
- security/data access layer sesuai arsitektur.

## Design

**Figma**
- wireframe;
- design system;
- prototype;
- handoff.

## Version Control

**GitHub**

## Deployment

**Vercel** untuk frontend/deployment yang sesuai dengan arsitektur final.

---

# 37. High-Level Architecture

```text
┌─────────────────────────────┐
│         User Device         │
│ Smartphone / Tablet / PC    │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│       React Web App         │
│ UI / Routing / State        │
└─────────────┬───────────────┘
              │ HTTPS / API
              ▼
┌─────────────────────────────┐
│      Express / Node.js      │
│ Validation / Logic / AuthZ  │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│          Supabase           │
│ Auth / Data / Storage       │
└─────────────────────────────┘
```

---

# 38. UI Screen Inventory

## Public/General

1. Splash/loading
2. Login
3. Verification
4. Home
5. Gallery
6. Search result
7. Work detail
8. Profile
9. Error/404

## Student

10. Student dashboard
11. My works
12. Upload work
13. Edit work
14. Draft
15. Review status
16. Rejected work
17. Profile edit

## Teacher

18. Teacher dashboard
19. Review queue
20. Review detail
21. Review history
22. Comment moderation
23. Report moderation

## Admin

24. Admin dashboard
25. User management
26. Role management
27. Category management
28. Work management
29. Comment management
30. Reports
31. Basic statistics

---

# 39. Design System Direction

## Visual Direction

Produk dapat menggunakan gaya:

- clean;
- modern;
- edukatif;
- fokus pada karya;
- tidak terlalu ramai;
- mudah digunakan pada layar kecil.

## Components

Minimal:

- Button;
- Input;
- Select;
- Search bar;
- Modal;
- Card;
- Badge/status;
- Avatar;
- Dropdown;
- Tabs;
- Toast;
- Skeleton;
- Empty state;
- Pagination/infinite loader;
- File uploader.

## Status Visual

Gunakan label yang konsisten:

- Draft;
- Menunggu Review;
- Disetujui;
- Ditolak;
- Diarsipkan.

---

# 40. Analytics & KPI

## KPI Pilot

Target awal:

| Indikator | Target |
|---|---:|
| Akun siswa aktif | ≥ 60% target siswa |
| Siswa mengunggah ≥1 karya | ≥ 30% siswa |
| Karya diproses sesuai SLA | ≥ 90% |
| Upload valid berhasil | ≥ 95% |
| Critical bug saat release | 0 |

## Product Signals

Monitor:

- jumlah login;
- jumlah upload;
- jumlah karya disetujui;
- jumlah karya ditolak;
- waktu review;
- jumlah like;
- jumlah komentar;
- jumlah laporan;
- jumlah pengguna aktif.

---

# 41. Testing Strategy

## 41.1 Functional Testing

Tes setiap requirement inti:

- login;
- scan;
- upload;
- edit;
- delete;
- submit;
- review;
- search;
- filter;
- like;
- comment;
- moderation;
- admin.

## 41.2 Role Testing

Minimal uji tiga akun:

```text
Siswa
Guru
Admin
```

Pastikan:

- siswa tidak dapat membuka route admin;
- guru tidak dapat melakukan aksi admin;
- admin memiliki kontrol yang sesuai.

## 41.3 Upload Testing

Uji:

- file valid;
- file terlalu besar;
- format tidak didukung;
- koneksi lambat;
- upload gagal;
- upload ulang.

## 41.4 Responsive Testing

Uji pada:

- smartphone portrait;
- smartphone landscape;
- tablet portrait;
- tablet landscape;
- laptop;
- desktop.

## 41.5 Security Testing

Uji:

- authorization;
- access control;
- RLS bila digunakan;
- input validation;
- rate limiting;
- file validation;
- session behavior.

## 41.6 UAT

Tester sekolah minimal:

- beberapa siswa;
- minimal satu guru reviewer;
- satu admin.

UAT harus menilai apakah alur benar-benar mudah digunakan, bukan hanya apakah tombol bekerja.

---

# 42. Acceptance Criteria — MVP

## Authentication
- [ ] Siswa dapat login menggunakan NISN melalui flow yang disetujui.
- [ ] Opsi scan kartu bekerja bila format QR/barcode didukung.
- [ ] Input manual tetap tersedia sebagai fallback.
- [ ] Guru dan admin dapat login.
- [ ] Logout bekerja.
- [ ] Session expired ditangani.

## Profile
- [ ] Profil dapat ditampilkan.
- [ ] Informasi sesuai role.
- [ ] Daftar karya milik user dapat dibuka.

## Works
- [ ] Siswa dapat membuat draft.
- [ ] Siswa dapat upload file.
- [ ] File tervalidasi.
- [ ] Metadata wajib tervalidasi.
- [ ] Siswa dapat submit untuk review.
- [ ] Siswa dapat melihat status.
- [ ] Karya ditolak memiliki catatan.
- [ ] Siswa dapat merevisi dan submit ulang.

## Review
- [ ] Guru dapat melihat antrean.
- [ ] Guru dapat preview.
- [ ] Guru dapat approve.
- [ ] Guru dapat reject.
- [ ] Reject tanpa alasan ditolak oleh sistem.
- [ ] Riwayat/status review dapat ditelusuri.

## Gallery
- [ ] Hanya karya yang sesuai visibility policy tampil di gallery.
- [ ] Search bekerja.
- [ ] Filter bekerja.
- [ ] Detail karya bekerja.

## Interaction
- [ ] Like dapat ditambah/dibatalkan.
- [ ] Like tidak dapat digandakan.
- [ ] Komentar dapat dibuat.
- [ ] Komentar dapat dihapus oleh pemilik sesuai policy.
- [ ] Guru/admin dapat memoderasi.

## Admin
- [ ] Admin dapat mengelola pengguna.
- [ ] Admin dapat mengelola kategori.
- [ ] Admin dapat mengelola konten.
- [ ] Admin dapat melihat statistik dasar.

## Security
- [ ] Role enforcement bekerja.
- [ ] Unauthorized request ditolak.
- [ ] Secret tidak disimpan di frontend/repository.
- [ ] File upload tervalidasi.

## UX
- [ ] Mobile layout usable.
- [ ] Loading state tersedia.
- [ ] Empty state tersedia.
- [ ] Error state tersedia.
- [ ] Aksi destruktif memiliki konfirmasi.

---

# 43. Definition of Ready

Sebuah fitur dianggap siap dikerjakan developer jika:

- tujuan fitur jelas;
- user/role jelas;
- acceptance criteria tersedia;
- dependensi diketahui;
- desain tersedia atau keputusan UI cukup jelas;
- edge case utama sudah dipikirkan;
- tidak ada pertanyaan blocker.

---

# 44. Definition of Done

Fitur dianggap selesai jika:

1. implementasi sesuai acceptance criteria;
2. happy path dan error path diuji;
3. permission diuji;
4. responsive diuji;
5. tidak terdapat bug kritis;
6. tidak ada secret di repository;
7. perubahan terdokumentasi;
8. code telah direview sesuai proses tim;
9. fitur siap diuji oleh stakeholder.

Untuk release MVP:

- [ ] acceptance criteria selesai;
- [ ] role test selesai;
- [ ] upload test selesai;
- [ ] responsive test selesai;
- [ ] security sanity check selesai;
- [ ] UAT selesai;
- [ ] deployment berhasil.

---

# 45. Roadmap

## Phase 0 — Requirement & Design

Output:

- PRD final;
- user flow;
- information architecture;
- wireframe;
- design system;
- Figma prototype.

## Phase 1 — Project Setup

Output:

- repository;
- React project;
- Node/Express project;
- environment setup;
- basic deployment pipeline;
- Supabase project.

## Phase 2 — Core Authentication

Output:

- login;
- logout;
- session;
- NISN-based student identification;
- card/QR flow bila didukung;
- role protection.

## Phase 3 — Works & Gallery

Output:

- profile;
- upload;
- draft;
- edit;
- delete;
- submit review;
- gallery;
- detail;
- category;
- search/filter.

## Phase 4 — Review & Moderation

Output:

- teacher dashboard;
- review queue;
- approve/reject;
- note;
- comment;
- moderation;
- report.

## Phase 5 — Admin

Output:

- user management;
- role management;
- category management;
- content management;
- statistics.

## Phase 6 — QA

Output:

- functional testing;
- role testing;
- security testing;
- responsive testing;
- UAT.

## Phase 7 — Deployment & Pilot

Output:

- production deployment;
- pilot school;
- feedback;
- bug fixes;
- release decision.

---

# 46. Risks & Mitigation

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Upload besar | lambat/gagal | batas ukuran + progress + kompresi |
| Internet sekolah lambat | UX buruk | thumbnail + lazy loading + pagination |
| Storage cepat penuh | biaya/operasional | batas upload + monitoring |
| Salah konfigurasi role | akses tidak aman | backend authZ + data security |
| NISN dipakai tanpa verifikasi | akun dapat disalahgunakan | gunakan verification layer |
| Scan kartu tidak kompatibel | login gagal | manual NISN fallback |
| Konten tidak pantas | reputasi sekolah | review + moderation + report |
| Pelanggaran hak cipta | masalah kebijakan | declaration + report + review |
| Spam komentar | kualitas turun | rate limiting + moderation |
| Scope creep | proyek terlambat | MVP gate dan roadmap |
| Kurang testing | bug saat pilot | test checklist + UAT |
| Data hilang | kehilangan dokumentasi | backup/export sesuai operasional |

---

# 47. Dependencies

Produk bergantung pada:

1. keputusan sekolah mengenai kebijakan konten;
2. daftar role dan orang yang berwenang melakukan review;
3. format kartu siswa/QR;
4. aturan penggunaan NISN;
5. kapasitas storage;
6. koneksi internet sekolah;
7. desain UI/UX;
8. environment deployment.

---

# 48. Open Questions

Hal berikut **belum boleh diasumsikan final**:

## OQ-01
Apakah Galeri hanya dapat diakses warga sekolah, atau sebagian gallery boleh diakses publik tanpa login?

## OQ-02
Apakah kartu siswa sudah memiliki QR/barcode? Jika ya, data apa yang tersimpan di dalamnya?

## OQ-03
Apakah NISN cukup sebagai identifier dan autentikasi memerlukan PIN/kode verifikasi?

## OQ-04
Siapa yang menentukan guru reviewer?

## OQ-05
Apakah satu karya boleh memiliki lebih dari satu siswa sebagai pembuat?

## OQ-06
Apakah siswa boleh mengubah karya yang sudah disetujui tanpa review ulang?

## OQ-07
Format file apa saja yang resmi didukung sekolah?

## OQ-08
Berapa batas ukuran file yang disetujui sekolah?

## OQ-09
Berapa lama karya harus disimpan sebelum boleh diarsipkan?

## OQ-10
Apakah komentar harus tersedia pada semua karya atau hanya kategori tertentu?

## OQ-11
Apakah notifikasi MVP wajib atau dapat ditunda?

---

# 49. Recommended MVP Prioritization

## Tier A — Core

- login;
- role;
- profile;
- upload;
- draft;
- submit;
- review;
- approval;
- gallery;
- detail;
- search/filter.

## Tier B — Engagement & Safety

- like;
- comment;
- moderation;
- report;
- audit dasar.

## Tier C — Nice to Have

- notification;
- bookmark;
- featured;
- badge;
- analytics lanjutan.

> Jika timeline sempit, Tier C dipotong terlebih dahulu; jangan mengorbankan autentikasi, review, keamanan, dan workflow karya.

---

# 50. Product Success Definition

Galeri Siswa dapat dianggap berhasil pada fase pilot ketika:

1. siswa dapat masuk tanpa kebingungan;
2. siswa dapat mengunggah karya sampai selesai;
3. siswa memahami status review;
4. guru dapat melakukan review dengan cepat;
5. karya yang disetujui tampil sesuai harapan;
6. pengguna dapat mencari karya;
7. interaksi berjalan tanpa spam berlebihan;
8. role tidak saling tertukar;
9. aplikasi nyaman digunakan dari smartphone dan tablet;
10. sekolah memiliki arsip karya yang lebih terstruktur daripada sebelum aplikasi digunakan.

---

# 51. Final Product Summary

Galeri Siswa adalah **platform web sekolah** yang menggabungkan:

```text
IDENTITY
   ↓
Login & Role
   ↓
PROFILE
   ↓
UPLOAD
   ↓
REVIEW
   ↓
PUBLICATION
   ↓
GALLERY
   ↓
APPRECIATION
   ↓
COMMENT / LIKE
   ↓
ARCHIVE / PORTFOLIO
```

Fokus MVP bukan membuat sebanyak mungkin fitur, melainkan membuat **siklus karya yang lengkap dan aman**:

```text
Siswa
  ↓
Masuk
  ↓
Buat karya
  ↓
Upload
  ↓
Kirim
  ↓
Guru review
  ↓
┌───────────────┐
│               │
▼               ▼
Approve        Reject
│               │
▼               ▼
Gallery       Revisi
                │
                └──────→ Review lagi
```

Arsitektur teknologi yang menjadi arah implementasi:

```text
React.js
    ↓
Express.js / Node.js
    ↓
Supabase
 ├── Authentication
 ├── Data
 └── Storage

Figma    → UI/UX
GitHub   → Version Control
Vercel   → Deployment
```

---

# 52. Appendix — Suggested Backlog

## Epic A — Authentication
- [ ] A-01 Login siswa NISN
- [ ] A-02 Scan kartu/QR
- [ ] A-03 Verification flow
- [ ] A-04 Login guru
- [ ] A-05 Login admin
- [ ] A-06 Logout
- [ ] A-07 Session handling
- [ ] A-08 Route guard

## Epic B — Profile
- [ ] B-01 Profile page
- [ ] B-02 Profile edit
- [ ] B-03 Avatar
- [ ] B-04 My works

## Epic C — Works
- [ ] C-01 Create draft
- [ ] C-02 Upload
- [ ] C-03 Validation
- [ ] C-04 Preview
- [ ] C-05 Submit
- [ ] C-06 Edit
- [ ] C-07 Delete
- [ ] C-08 Re-submit after reject

## Epic D — Gallery
- [ ] D-01 Gallery
- [ ] D-02 Card
- [ ] D-03 Detail
- [ ] D-04 Search
- [ ] D-05 Filter
- [ ] D-06 Empty state
- [ ] D-07 Loading state
- [ ] D-08 Error state

## Epic E — Interaction
- [ ] E-01 Like
- [ ] E-02 Unlike
- [ ] E-03 Comment
- [ ] E-04 Delete comment
- [ ] E-05 Report

## Epic F — Review
- [ ] F-01 Review dashboard
- [ ] F-02 Queue
- [ ] F-03 Detail review
- [ ] F-04 Approve
- [ ] F-05 Reject
- [ ] F-06 Review note
- [ ] F-07 Review history

## Epic G — Moderation
- [ ] G-01 Comment moderation
- [ ] G-02 Content report
- [ ] G-03 Report resolution
- [ ] G-04 Audit action

## Epic H — Admin
- [ ] H-01 User management
- [ ] H-02 Role management
- [ ] H-03 Category management
- [ ] H-04 Work management
- [ ] H-05 Comment management
- [ ] H-06 Basic statistics

## Epic I — QA & Release
- [ ] I-01 Functional test
- [ ] I-02 Role test
- [ ] I-03 Upload test
- [ ] I-04 Security test
- [ ] I-05 Responsive test
- [ ] I-06 UAT
- [ ] I-07 Deployment
- [ ] I-08 Pilot feedback

---

# 53. Document Notes

Dokumen ini adalah **PRD produk**, bukan spesifikasi implementasi penuh.

Dokumen teknis yang sebaiknya dibuat terpisah setelah PRD disepakati:

1. Technical Architecture;
2. Database Schema;
3. API Specification;
4. Authentication & Authorization Design;
5. Storage/File Handling Specification;
6. UI/UX Design System;
7. Test Plan;
8. Deployment Guide.

Dengan pemisahan ini, requirement produk tetap mudah dipahami oleh stakeholder, sementara detail teknis dapat berkembang tanpa mengacaukan PRD.

---

**End of PRD — Galeri Siswa v2.0**
