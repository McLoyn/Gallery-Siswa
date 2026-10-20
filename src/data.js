export const CATS = ['Desain & Ilustrasi', 'Fotografi & Video', 'Seni Pertunjukan', 'Kelistrikan (TITL)', 'Otomotif (TKRO)', 'Teknologi & Aplikasi', 'Karya Tulis', 'Kewirausahaan']
export const COLORS = { 'Desain & Ilustrasi': '#C7D2FE', 'Fotografi & Video': '#BFE3C8', 'Seni Pertunjukan': '#F4C7A1', 'Kelistrikan (TITL)': '#F6E3A1', 'Otomotif (TKRO)': '#BAE6FD', 'Teknologi & Aplikasi': '#DDD6FE', 'Karya Tulis': '#FBD5D5', Kewirausahaan: '#FED7AA', Pengumuman: '#FDE68A', Berita: '#BAE6FD' }
const w = (id, title, by, cls, cat, likes, status = 'approved', extra = {}) => ({ id, title, by, cls, cat, likes, status, desc: 'Deskripsi singkat karya ' + title + '.', alt: '', ...extra })
export const W0 = [
  w(1, 'Festival Tari Nusantara', 'Bima Prasetya', 'XI TKRO 1', 'Seni Pertunjukan', 84),
  w(2, 'Poster Festival Budaya 2025', 'Alya Putri', 'XI TITL 2', 'Desain & Ilustrasi', 128),
  w(3, 'Panel Kontrol Motor 3 Fasa', 'Zahra Nabila', 'X TITL 1', 'Kelistrikan (TITL)', 97),
  w(4, 'Engine Stand Mobil Mini', 'Rafi Aditya', 'XI TKRO 3', 'Otomotif (TKRO)', 61),
  w(5, 'Aplikasi Absensi Kelas', 'Nadia Safira', 'X TKRO 3', 'Teknologi & Aplikasi', 45),
  w(6, 'Laporan Daur Ulang Oli Bekas', 'Arga Saputra', 'XII TITL 1', 'Karya Tulis', 52),
  w(7, 'Ilustrasi Kebun Sekolah', 'Alya Putri', 'XI TITL 2', 'Desain & Ilustrasi', 0, 'pending'),
  w(8, 'Poster Hemat Energi', 'Alya Putri', 'XI TITL 2', 'Desain & Ilustrasi', 0, 'revision', { note: 'Perbesar teks ajakan dan tingkatkan kontras agar mudah dibaca.' }),
  w(9, 'Poster Pekan Budaya', 'Nadia Safira', 'X TKRO 3', 'Desain & Ilustrasi', 0, 'pending'),
  w(10, 'Kemasan Keripik Singkong', 'Rafi Aditya', 'XI TKRO 3', 'Kewirausahaan', 0, 'pending'),
]
export const A0 = [
  { id: 1, type: 'Pengumuman', title: 'Pameran Karya Siswa 2026 dibuka 24 Oktober', body: 'Unggah karya terbaikmu sebelum 20 Oktober agar ikut dipamerkan.', status: 'Terbit', pin: true },
  { id: 2, type: 'Berita', title: 'Panduan baru: menulis teks alternatif', body: 'Teks alternatif membantu pembaca layar memahami karyamu.', status: 'Terbit', pin: false },
  { id: 3, type: 'Pengumuman', title: 'Pengumpulan karya lomba dibuka', body: 'Draf pengumuman lomba antar kelas.', status: 'Draf', pin: false },
]
export const ACC0 = [
  { id: 1, name: 'Alya Putri', role: 'Siswa · XI TITL 2', on: true },
  { id: 2, name: 'Zahra Nabila', role: 'Siswa · X TITL 1', on: true },
  { id: 3, name: 'Rina Wulandari', role: 'Guru · Seni Budaya', on: true },
  { id: 4, name: 'Arga Saputra', role: 'Siswa · XII TITL 1', on: false },
]
