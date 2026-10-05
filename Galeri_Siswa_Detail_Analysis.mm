<?xml version='1.0' encoding='utf-8'?>
<map version="freeplane 1.9.13">
  <node TEXT="GALERI SISWA — ANALISIS &amp; RANCANGAN PROYEK">
    <node TEXT="1. MASALAH &amp; LATAR BELAKANG" POSITION="left">
      <node TEXT="Masalah utama">
        <node TEXT="Karya siswa tersebar" />
        <node TEXT="Dokumentasi tidak terstruktur" />
        <node TEXT="Sulit menemukan karya lama" />
        <node TEXT="Apresiasi karya belum optimal" />
        <node TEXT="Review guru masih manual" />
      </node>
      <node TEXT="Kebutuhan">
        <node TEXT="Galeri terpusat" />
        <node TEXT="Publikasi terkontrol" />
        <node TEXT="Arsip digital" />
        <node TEXT="Proses review jelas" />
      </node>
      <node TEXT="Dampak jika tidak diselesaikan">
        <node TEXT="Karya hilang / sulit dicari" />
        <node TEXT="Siswa kurang mendapat apresiasi" />
        <node TEXT="Guru sulit memantau" />
        <node TEXT="Dokumentasi sekolah tidak konsisten" />
      </node>
    </node>
    <node TEXT="2. TUJUAN &amp; INDIKATOR" POSITION="left">
      <node TEXT="Tujuan">
        <node TEXT="Publikasi karya" />
        <node TEXT="Apresiasi siswa" />
        <node TEXT="Portofolio" />
        <node TEXT="Dokumentasi sekolah" />
        <node TEXT="Meningkatkan kreativitas" />
      </node>
      <node TEXT="Indikator keberhasilan">
        <node TEXT="Siswa aktif menggunakan sistem" />
        <node TEXT="Upload berhasil" />
        <node TEXT="Review tepat waktu" />
        <node TEXT="Galeri mudah digunakan" />
        <node TEXT="Minim bug kritis" />
      </node>
    </node>
    <node TEXT="3. PENGGUNA &amp; HAK AKSES" POSITION="left">
      <node TEXT="Siswa">
        <node TEXT="Lihat karya" />
        <node TEXT="Upload karya" />
        <node TEXT="Edit / hapus karya sendiri" />
        <node TEXT="Like &amp; komentar" />
        <node TEXT="Lihat status review" />
      </node>
      <node TEXT="Guru">
        <node TEXT="Review karya" />
        <node TEXT="Approve / reject" />
        <node TEXT="Beri catatan" />
        <node TEXT="Moderasi komentar" />
        <node TEXT="Lihat statistik sederhana" />
      </node>
      <node TEXT="Admin">
        <node TEXT="Kelola akun" />
        <node TEXT="Kelola kategori" />
        <node TEXT="Kelola konten" />
        <node TEXT="Kelola role" />
        <node TEXT="Lihat laporan" />
      </node>
    </node>
    <node TEXT="4. FITUR INTI" POSITION="left">
      <node TEXT="Authentication" />
      <node TEXT="Profil" />
      <node TEXT="Upload &amp; preview" />
      <node TEXT="Galeri" />
      <node TEXT="Detail karya" />
      <node TEXT="Kategori" />
      <node TEXT="Search &amp; filter" />
      <node TEXT="Like &amp; komentar" />
      <node TEXT="Review guru" />
      <node TEXT="Dashboard" />
      <node TEXT="Notifikasi status" />
    </node>
    <node TEXT="5. KONTEN &amp; METADATA KARYA" POSITION="left">
      <node TEXT="Judul karya" />
      <node TEXT="Deskripsi" />
      <node TEXT="Kategori" />
      <node TEXT="Nama pembuat" />
      <node TEXT="Kelas / jurusan" />
      <node TEXT="Tanggal upload" />
      <node TEXT="File / gambar" />
      <node TEXT="Status review" />
      <node TEXT="Catatan guru" />
      <node TEXT="Aturan konten">
        <node TEXT="Ukuran file" />
        <node TEXT="Tipe file" />
        <node TEXT="Hak cipta" />
        <node TEXT="Konten tidak pantas" />
      </node>
    </node>
    <node TEXT="6. ALUR &amp; STATUS" POSITION="right">
      <node TEXT="Alur utama">
        <node TEXT="Login" />
        <node TEXT="Upload" />
        <node TEXT="Validasi" />
        <node TEXT="Menunggu Review" />
        <node TEXT="Review Guru" />
        <node TEXT="Publikasi" />
      </node>
      <node TEXT="Status karya">
        <node TEXT="Draft" />
        <node TEXT="Menunggu Review" />
        <node TEXT="Disetujui" />
        <node TEXT="Ditolak" />
        <node TEXT="Diarsipkan" />
      </node>
      <node TEXT="Kasus khusus">
        <node TEXT="Revisi setelah ditolak" />
        <node TEXT="Hapus karya" />
        <node TEXT="Arsip karya lama" />
        <node TEXT="Laporan konten" />
      </node>
    </node>
    <node TEXT="7. TEKNOLOGI &amp; ARSITEKTUR" POSITION="right">
      <node TEXT="Frontend">
        <node TEXT="React.js" />
        <node TEXT="Responsive UI" />
        <node TEXT="Component-based" />
      </node>
      <node TEXT="Backend">
        <node TEXT="Node.js" />
        <node TEXT="Express.js" />
        <node TEXT="REST API" />
        <node TEXT="Authorization middleware" />
      </node>
      <node TEXT="Supabase">
        <node TEXT="PostgreSQL" />
        <node TEXT="Authentication" />
        <node TEXT="Storage" />
        <node TEXT="Row Level Security" />
      </node>
      <node TEXT="Tools">
        <node TEXT="Figma" />
        <node TEXT="GitHub" />
        <node TEXT="Vercel" />
      </node>
      <node TEXT="Arsitektur">
        <node TEXT="React → Express API → Supabase" />
        <node TEXT="Storage untuk file karya" />
      </node>
    </node>
    <node TEXT="8. DATA &amp; DATABASE" POSITION="right">
      <node TEXT="Tabel utama">
        <node TEXT="profiles" />
        <node TEXT="works" />
        <node TEXT="categories" />
        <node TEXT="likes" />
        <node TEXT="comments" />
        <node TEXT="reviews" />
        <node TEXT="notifications" />
      </node>
      <node TEXT="Relasi penting">
        <node TEXT="User → Works" />
        <node TEXT="Work → Category" />
        <node TEXT="Work → Likes" />
        <node TEXT="Work → Comments" />
        <node TEXT="Work → Reviews" />
      </node>
      <node TEXT="Aturan data">
        <node TEXT="Unique like per user" />
        <node TEXT="Owner hanya mengubah karya sendiri" />
        <node TEXT="Review dicatat" />
        <node TEXT="Timestamp dibuat otomatis" />
      </node>
    </node>
    <node TEXT="9. KEAMANAN &amp; MODERASI" POSITION="right">
      <node TEXT="Authentication">
        <node TEXT="Supabase Auth" />
        <node TEXT="Session management" />
        <node TEXT="Logout" />
      </node>
      <node TEXT="Authorization">
        <node TEXT="Role siswa / guru / admin" />
        <node TEXT="Backend authorization" />
        <node TEXT="Supabase RLS" />
      </node>
      <node TEXT="Upload security">
        <node TEXT="Validasi MIME type" />
        <node TEXT="Batas ukuran" />
        <node TEXT="Nama file aman" />
        <node TEXT="Storage policy" />
      </node>
      <node TEXT="Moderasi">
        <node TEXT="Komentar" />
        <node TEXT="Konten karya" />
        <node TEXT="Laporan pengguna" />
        <node TEXT="Audit tindakan penting" />
      </node>
      <node TEXT="Privasi">
        <node TEXT="Minimalkan data pribadi" />
        <node TEXT="Atur visibilitas karya" />
      </node>
    </node>
    <node TEXT="10. MASALAH YANG MUNGKIN MUNCUL" POSITION="right">
      <node TEXT="Teknis">
        <node TEXT="Upload file besar" />
        <node TEXT="Internet lambat" />
        <node TEXT="Storage cepat penuh" />
        <node TEXT="API error" />
        <node TEXT="Performa galeri menurun" />
      </node>
      <node TEXT="Pengguna">
        <node TEXT="Lupa password" />
        <node TEXT="Salah upload" />
        <node TEXT="Spam komentar" />
        <node TEXT="Duplikasi karya" />
      </node>
      <node TEXT="Konten">
        <node TEXT="Karya tanpa izin" />
        <node TEXT="Konten tidak pantas" />
        <node TEXT="Pelanggaran hak cipta" />
      </node>
      <node TEXT="Akses">
        <node TEXT="Salah konfigurasi role" />
        <node TEXT="Data terlihat pengguna yang salah" />
      </node>
      <node TEXT="Proyek">
        <node TEXT="Scope creep" />
        <node TEXT="Kurang waktu" />
        <node TEXT="Kurang testing" />
      </node>
    </node>
    <node TEXT="11. SOLUSI &amp; MITIGASI" POSITION="right">
      <node TEXT="Batas ukuran dan tipe file" />
      <node TEXT="Kompresi / optimasi gambar" />
      <node TEXT="Pagination &amp; lazy loading" />
      <node TEXT="Rate limiting" />
      <node TEXT="Unique constraint like" />
      <node TEXT="Validasi backend + frontend" />
      <node TEXT="RLS + authorization" />
      <node TEXT="Moderasi dan report" />
      <node TEXT="Backup / export data" />
      <node TEXT="Checklist release" />
    </node>
    <node TEXT="12. NON-FUNCTIONAL REQUIREMENTS">
      <node TEXT="Responsive" />
      <node TEXT="Usability" />
      <node TEXT="Performance" />
      <node TEXT="Reliability" />
      <node TEXT="Accessibility dasar" />
      <node TEXT="Maintainability" />
    </node>
    <node TEXT="13. TESTING &amp; QA">
      <node TEXT="Unit test" />
      <node TEXT="API test" />
      <node TEXT="Role / permission test" />
      <node TEXT="Upload test" />
      <node TEXT="Responsive test" />
      <node TEXT="Security test" />
      <node TEXT="User Acceptance Test" />
    </node>
    <node TEXT="14. ROADMAP MVP">
      <node TEXT="Discovery" />
      <node TEXT="UI/UX Figma" />
      <node TEXT="Setup React + Express + Supabase" />
      <node TEXT="Authentication &amp; role" />
      <node TEXT="Upload &amp; galeri" />
      <node TEXT="Review guru" />
      <node TEXT="Admin" />
      <node TEXT="Testing" />
      <node TEXT="Deploy Vercel" />
      <node TEXT="Pilot sekolah" />
    </node>
    <node TEXT="15. PENGEMBANGAN LANJUTAN">
      <node TEXT="PWA / offline ringan" />
      <node TEXT="Bookmark / favorit" />
      <node TEXT="Pencapaian / badge" />
      <node TEXT="Event / lomba karya" />
      <node TEXT="Export portofolio" />
      <node TEXT="Analytics lebih lengkap" />
      <node TEXT="Notifikasi email" />
    </node>
    <node TEXT="16. DI LUAR SCOPE MVP">
      <node TEXT="Native Android / iOS" />
      <node TEXT="Marketplace / pembayaran" />
      <node TEXT="Private chat" />
      <node TEXT="AI judging" />
      <node TEXT="Social media automation" />
      <node TEXT="Multi-sekolah" />
    </node>
  </node>
</map>