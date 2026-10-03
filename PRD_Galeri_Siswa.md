# PRD — Galeri Siswa

> Web Application Responsif untuk Publikasi dan Apresiasi Karya Siswa

- Versi: 1.0
- Status: Draft / Development Reference
- Target: Satu sekolah
- Platform: Responsive Web (Desktop, Tablet, Mobile)

## 1. Ringkasan Produk

**Galeri Siswa** adalah platform web internal sekolah untuk mengunggah, mendokumentasikan, menampilkan, mengapresiasi, dan memverifikasi karya siswa. Produk dibuat responsive agar dapat digunakan melalui browser di desktop, laptop, tablet, maupun smartphone.

## 2. Latar Belakang

Siswa menghasilkan berbagai karya seperti desain, fotografi, tulisan, video, karya seni, dan project teknologi. Karya sering tersebar di perangkat pribadi, media sosial, atau grup komunikasi sehingga sulit didokumentasikan dan ditemukan kembali.

Galeri Siswa menyediakan satu ruang digital khusus sekolah untuk publikasi karya, review guru, interaksi, dan portofolio siswa.

## 3. Problem Statement

1. Belum tersedia tempat terpusat untuk menyimpan dan menampilkan karya siswa.
2. Karya sulit ditemukan kembali karena tersebar di berbagai media.
3. Siswa membutuhkan media untuk menunjukkan portofolio dan kreativitas.
4. Guru membutuhkan cara terstruktur untuk review dan feedback.
5. Sekolah membutuhkan katalog digital karya siswa yang dapat dikelola terpusat.

## 4. Tujuan Produk

- Menyediakan galeri digital khusus satu sekolah.
- Mempermudah siswa mengunggah dan mengelola karya.
- Mempermudah guru melakukan review dan verifikasi.
- Mendorong apresiasi dan interaksi positif.
- Membangun dokumentasi dan portofolio karya siswa.

## 5. Target Pengguna

| Role | Kebutuhan |
|---|---|
| Siswa | Upload, edit karya sendiri, profil, like, komentar, eksplorasi |
| Guru | Review, verifikasi, feedback, moderasi |
| Admin | Kelola pengguna, karya, kategori, komentar, statistik |

## 6. Scope Produk

### 6.1 In Scope — MVP

- Login/logout dan role-based access
- Profil pengguna
- Upload, edit, dan hapus karya sendiri
- Galeri dan detail karya
- Kategori
- Search dan filter
- Like/apresiasi
- Komentar
- Workflow review
- Verifikasi guru
- Dashboard guru
- Dashboard admin
- Supabase Storage
- Responsive UI

### 6.2 Out of Scope — MVP

- Native Android/iOS
- Marketplace atau pembayaran
- Chat pribadi
- AI untuk menilai karya
- Integrasi otomatis media sosial
- Multi-sekolah/multi-tenant

## 7. Fitur Utama

| ID | Fitur | Fungsi | Prioritas |
|---|---|---|---|
| F-01 | Autentikasi | Login, logout, session, role | MVP |
| F-02 | Profil | Profil dan daftar karya | MVP |
| F-03 | Upload Karya | Judul, deskripsi, kategori, file, thumbnail, tag | MVP |
| F-04 | Manajemen Karya | Edit/hapus karya sendiri dan status | MVP |
| F-05 | Galeri | Grid/list karya dan kategori | MVP |
| F-06 | Detail Karya | Preview, metadata, kreator, like, komentar | MVP |
| F-07 | Search & Filter | Cari judul/kreator dan filter kategori | MVP |
| F-08 | Like | Satu user satu like per karya | MVP |
| F-09 | Komentar | Tambah/hapus dan moderasi | MVP |
| F-10 | Review Guru | Approve/reject dan catatan | MVP |
| F-11 | Admin | Kelola user, karya, kategori, komentar | MVP |
| F-12 | Notifikasi | Status review/interaksi | Tahap 2 |
| F-13 | Bookmark | Simpan karya favorit | Tahap 2 |
| F-14 | Featured Karya | Karya pilihan di beranda | Tahap 2 |
| F-15 | Event/Lomba | Koleksi karya berdasarkan event | Tahap 3 |

## 8. Role & Permission

| Aksi | Siswa | Guru | Admin |
|---|:---:|:---:|:---:|
| Melihat karya disetujui | ✓ | ✓ | ✓ |
| Upload karya | ✓ | Opsional | ✓ |
| Edit/hapus karya sendiri | ✓ | ✓ | ✓ |
| Like/komentar | ✓ | ✓ | ✓ |
| Review karya | — | ✓ | ✓ |
| Moderasi komentar | — | ✓ | ✓ |
| Kelola pengguna | — | — | ✓ |
| Kelola kategori | — | — | ✓ |
| Statistik | — | Terbatas | ✓ |

## 9. User Stories

### Siswa
- Sebagai siswa, saya ingin login agar karya dan aktivitas saya terkait akun.
- Sebagai siswa, saya ingin upload karya agar dapat dipublikasikan.
- Sebagai siswa, saya ingin mengedit karya agar informasi tetap akurat.
- Sebagai siswa, saya ingin melihat status review.
- Sebagai siswa, saya ingin like dan komentar pada karya teman.
- Sebagai siswa, saya ingin mencari/filter karya.

### Guru
- Sebagai guru, saya ingin melihat antrean karya.
- Sebagai guru, saya ingin menyetujui/menolak karya.
- Sebagai guru, saya ingin memberikan catatan review.
- Sebagai guru, saya ingin memoderasi komentar.

### Admin
- Sebagai admin, saya ingin mengelola pengguna, kategori, karya, komentar, dan statistik.

## 10. Alur Utama

### Upload & Review

```text
Siswa Login
    ↓
Upload Karya
    ↓
Isi Metadata + File
    ↓
Validasi
    ↓
Menunggu Review
    ↓
Guru Memeriksa
    ↓
┌──────────────┐
↓              ↓
Disetujui     Ditolak
↓              ↓
Galeri        Catatan Perbaikan
```

### Eksplorasi

```text
Beranda → Galeri → Search/Filter → Detail Karya → Like/Komentar
```

## 11. Status Karya

| Status | Keterangan |
|---|---|
| `Draft` | Belum dikirim untuk review |
| `Menunggu Review` | Menunggu pemeriksaan |
| `Disetujui` | Tampil di galeri |
| `Ditolak` | Tidak dipublikasikan dan memiliki alasan |
| `Diarsipkan` | Tidak aktif ditampilkan |

## 12. Sitemap

```text
Galeri Siswa
├── Beranda
├── Galeri Karya
│   ├── Search
│   ├── Filter
│   └── Detail Karya
├── Login
├── Profil Saya
│   └── Karya Saya
├── Upload Karya
├── Dashboard Guru
│   └── Review Karya
└── Dashboard Admin
    ├── Pengguna
    ├── Karya
    ├── Kategori
    ├── Komentar
    └── Statistik
```

## 13. UI/UX Requirements

- Mobile-first dan responsive.
- Navigasi sederhana.
- Card-based gallery.
- Tombol Upload Karya mudah ditemukan.
- Status karya menggunakan label jelas.
- Form memiliki validasi dan pesan error yang jelas.
- Preview file sebelum submit jika memungkinkan.
- Konfirmasi sebelum aksi destruktif.
- Design system dibuat di Figma.
- Memperhatikan aksesibilitas dasar.

## 14. Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | Sistem mendukung autentikasi pengguna. |
| FR-02 | Sistem menerapkan role siswa, guru, dan admin. |
| FR-03 | Siswa dapat membuat karya dengan metadata wajib. |
| FR-04 | Sistem memvalidasi tipe dan ukuran file. |
| FR-05 | File tersimpan di storage dan metadata di database. |
| FR-06 | Sistem memiliki workflow review. |
| FR-07 | Karya belum disetujui tidak tampil di galeri. |
| FR-08 | Pengguna dapat search/filter. |
| FR-09 | Like tidak dapat digandakan oleh user yang sama. |
| FR-10 | Komentar dapat ditambah dan dimoderasi. |
| FR-11 | Admin dapat mengelola user dan kategori. |
| FR-12 | Timestamp seperti `created_at` dan `updated_at` dicatat. |

## 15. Non-Functional Requirements

- **Performance:** optimasi gambar, pagination, lazy loading bila diperlukan.
- **Responsive:** usable pada smartphone, tablet, laptop, desktop.
- **Security:** authentication dan authorization server-side.
- **Privacy:** data mengikuti kebijakan sekolah.
- **Maintainability:** struktur code dan API terdokumentasi.
- **Scalability:** database/storage siap bertambah.
- **Accessibility:** label form, keyboard navigation, dan kontras yang layak.

## 16. Model Data Awal

### `profiles`

`id`, `full_name`, `email`, `role`, `class`, `avatar_url`, `bio`, `created_at`

### `works`

`id`, `user_id`, `title`, `description`, `category_id`, `file_url`, `thumbnail_url`, `status`, `review_note`, `created_at`, `updated_at`

### `categories`

`id`, `name`, `description`, `created_at`

### `likes`

`id`, `user_id`, `work_id`, `created_at`

> Terapkan unique constraint pada kombinasi `user_id + work_id`.

### `comments`

`id`, `user_id`, `work_id`, `content`, `created_at`, `updated_at`

### `reviews`

`id`, `work_id`, `reviewer_id`, `decision`, `note`, `created_at`

### `notifications`

`id`, `user_id`, `type`, `reference_id`, `is_read`, `created_at`

## 17. Relasi Data

```text
profiles
   │
   └────< works >──── categories
             │
             ├────< likes
             ├────< comments
             └────< reviews

profiles ────< notifications
```

- Satu profile memiliki banyak works.
- Satu category memiliki banyak works.
- Satu work memiliki banyak likes/comments.
- Satu user hanya memiliki satu like pada satu work.
- Satu work dapat memiliki riwayat review.
- Satu user dapat menerima banyak notification.

## 18. Rancangan API Awal

| Method | Endpoint | Kegunaan |
|---|---|---|
| GET | `/api/works` | List + pagination/filter |
| GET | `/api/works/:id` | Detail karya |
| POST | `/api/works` | Membuat karya |
| PATCH | `/api/works/:id` | Mengubah karya |
| DELETE | `/api/works/:id` | Menghapus karya |
| POST | `/api/works/:id/like` | Toggle like |
| GET | `/api/works/:id/comments` | Daftar komentar |
| POST | `/api/works/:id/comments` | Tambah komentar |
| DELETE | `/api/comments/:id` | Hapus/moderasi komentar |
| GET | `/api/reviews/pending` | Antrean review |
| POST | `/api/works/:id/review` | Keputusan review |
| GET | `/api/categories` | Daftar kategori |
| POST | `/api/categories` | Tambah kategori |

## 19. Arsitektur Teknologi

```text
React.js
    ↓
Express.js + Node.js
    ↓
Supabase
├── PostgreSQL
├── Auth
└── Storage

Figma   → UI/UX
GitHub  → Version Control
Vercel  → Deployment
```

### Teknologi

| Teknologi | Peran |
|---|---|
| React.js | Frontend |
| Express.js + Node.js | Backend/API |
| Supabase PostgreSQL | Database |
| Supabase Auth | Authentication |
| Supabase Storage | Penyimpanan file |
| Figma | UI/UX dan prototype |
| GitHub | Version control |
| Vercel | Deployment |

Frontend berkomunikasi dengan Express.js melalui REST API. Backend menangani validasi, business logic, authorization, dan akses data.

## 20. Keamanan

- Authorization harus diterapkan di backend.
- Gunakan Row Level Security (RLS) pada Supabase bila sesuai.
- Validasi MIME type, ekstensi, dan ukuran file.
- Sanitasi/validasi komentar.
- Gunakan environment variables untuk secret.
- Jangan menyimpan password secara manual jika memakai Supabase Auth.
- Audit aksi review, penghapusan, dan perubahan role.

## 21. Moderasi & Kebijakan Konten

Karya harus berkaitan dengan pembelajaran, kreativitas, seni, teknologi, kegiatan sekolah, atau aktivitas positif siswa.

Konten penghinaan, pelecehan, spam, atau pelanggaran aturan sekolah dapat ditolak/dihapus sesuai kebijakan sekolah.

Guru/admin memiliki hak moderasi. Alasan penolakan sebaiknya dicatat agar siswa mengetahui bagian yang perlu diperbaiki.

> Kebijakan konten final ditentukan oleh pihak sekolah.

## 22. Acceptance Criteria MVP

- [ ] Login/logout berhasil.
- [ ] Role siswa, guru, dan admin berjalan sesuai permission.
- [ ] Siswa dapat upload karya.
- [ ] File dan metadata tersimpan.
- [ ] Karya baru berstatus `Menunggu Review`.
- [ ] Guru dapat approve/reject dengan catatan.
- [ ] Karya approved muncul di galeri.
- [ ] Detail karya dapat dibuka.
- [ ] Search/filter berjalan.
- [ ] Like tidak dapat digandakan.
- [ ] Komentar dapat ditambah dan dimoderasi.
- [ ] Admin dapat mengelola user dan kategori.
- [ ] UI responsive desktop/mobile.
- [ ] Tidak ada bug kritis sebelum release.

## 23. KPI / Indikator Keberhasilan

| Indikator | Target Pilot |
|---|---|
| Akun siswa aktif | ≥ 60% target siswa |
| Siswa yang upload | ≥ 30% pengguna siswa upload ≥ 1 karya |
| Karya ter-review | ≥ 90% diproses sesuai SLA sekolah |
| Upload valid berhasil | ≥ 95% |
| Bug kritis saat release | 0 |

Target dapat disesuaikan setelah sekolah menentukan jumlah pengguna dan periode pilot.

## 24. Roadmap

| Fase | Fokus | Output |
|---|---|---|
| 1 | Discovery & UI/UX | Requirement, flow, wireframe, Figma prototype |
| 2 | Setup | GitHub, React, Express, Supabase, environment |
| 3 | Core | Auth, role, profile, database, storage |
| 4 | Gallery | Upload, gallery, detail, kategori, search/filter |
| 5 | Interaction | Like, comment, moderation |
| 6 | Review | Dashboard guru dan workflow review |
| 7 | Admin | User/category/content management, statistik |
| 8 | QA & Deploy | Testing, security, responsive, Vercel |
| 9 | Pilot | Uji sekolah, feedback, bug fixing |

## 25. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| File terlalu besar | Batas ukuran, validasi, thumbnail/kompresi |
| Konten tidak sesuai | Review dan moderation workflow |
| Akses role salah | Backend authorization + RLS |
| Scope terlalu besar | Fokus pada MVP |
| Koneksi lambat | Optimasi gambar, pagination, lazy loading |
| Like duplikat | Unique constraint `user_id + work_id` |

## 26. Definition of Done — MVP

- Semua acceptance criteria terpenuhi.
- Tidak ada bug kritis/high severity terbuka.
- Role dan permission telah diuji.
- Upload, review, like, komentar, search, dan filter telah diuji.
- Responsive layout diuji pada desktop dan mobile.
- Secret tidak masuk repository.
- Dokumentasi setup dan deployment tersedia.
- Aplikasi berhasil di-deploy.
- Aplikasi dapat digunakan oleh tester sekolah.

## 27. Struktur Repository yang Disarankan

```text
galeri-siswa/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── assets/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── config/
│   └── package.json
│
├── docs/
│   ├── api/
│   └── architecture/
│
├── .gitignore
├── README.md
└── package.json
```

## 28. Kesimpulan

**Galeri Siswa** adalah web application responsif berskala satu sekolah yang berfokus pada publikasi, dokumentasi, dan apresiasi karya siswa.

MVP memprioritaskan:

1. Authentication.
2. Role siswa/guru/admin.
3. Profile.
4. Upload karya.
5. Gallery.
6. Search & filter.
7. Like.
8. Comment.
9. Verifikasi guru.
10. Admin management.

Stack utama:

```text
React.js
    ↓
Express.js
    ↓
Supabase
├── PostgreSQL
├── Auth
└── Storage

Figma   → UI/UX
GitHub  → Version Control
Vercel  → Deployment
```

Arsitektur ini memberikan fondasi yang cukup untuk membuat Galeri Siswa sebagai project yang dapat digunakan di satu sekolah sekaligus dikembangkan lebih lanjut pada tahap berikutnya.
