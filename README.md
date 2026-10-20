# Galeri Siswa — prototype (React + Vite)

    npm install
    npm run dev

Peran (Siswa / Guru / Admin) diganti lewat dropdown di navbar (khusus demo). Data hanya di memori; refresh = reset.

Alur yang bisa dicoba
- Siswa: cari + filter kategori, buka karya, tombol mengambang "+ Unggah karya" (maks. 100 MB, kategori dan teks alternatif wajib), "Karya saya" (status, catatan guru, Perbaiki karya).
- Guru: Antrean tinjauan (Setujui / Minta revisi dengan catatan wajib) → karya yang disetujui muncul di beranda.
- Guru & Admin: Pengumuman (buat, edit, sematkan, terbitkan, hapus) → yang berstatus Terbit tampil di beranda.
- Admin: Ringkasan (angka dihitung dari data) dan aktif/nonaktifkan akun.
