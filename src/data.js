export const CATS = ['Desain & Ilustrasi', 'Fotografi & Video', 'Seni Pertunjukan', 'Kelistrikan (TITL)', 'Otomotif (TKRO)', 'Teknologi & Aplikasi', 'Karya Tulis', 'Kewirausahaan']
export const COLORS = { 'Desain & Ilustrasi': '#C7D2FE', 'Fotografi & Video': '#BFE3C8', 'Seni Pertunjukan': '#F4C7A1', 'Kelistrikan (TITL)': '#F6E3A1', 'Otomotif (TKRO)': '#BAE6FD', 'Teknologi & Aplikasi': '#DDD6FE', 'Karya Tulis': '#FBD5D5', Kewirausahaan: '#FED7AA', Pengumuman: '#FDE68A', Berita: '#BAE6FD' }

// Satu sumber data pengguna. Identitas selalu lewat `id`, bukan nama (dua siswa bisa bernama sama).
// `no` = NISN (10 digit) atau NIP (18 digit). Di produksi, data ini datang dari server.
export const ROLE_LABEL = { siswa: 'Siswa', guru: 'Guru', admin: 'Admin' }
export const USERS = [
  { id: 'u1', no: '0051234567', name: 'Alya Putri', role: 'siswa', cls: 'XI TITL 2', on: true },
  { id: 'u2', no: '0061234501', name: 'Zahra Nabila', role: 'siswa', cls: 'X TITL 1', on: true },
  { id: 'u3', no: '0041234502', name: 'Arga Saputra', role: 'siswa', cls: 'XII TITL 1', on: false },
  { id: 'u4', no: '0051234568', name: 'Bima Prasetya', role: 'siswa', cls: 'XI TKRO 1', on: true },
  { id: 'u5', no: '0051234569', name: 'Rafi Aditya', role: 'siswa', cls: 'XI TKRO 3', on: true },
  { id: 'u6', no: '0061234570', name: 'Nadia Safira', role: 'siswa', cls: 'X TKRO 3', on: true },
  { id: 'u7', no: '198504122010012005', name: 'Rina Wulandari', role: 'guru', cls: 'Seni Budaya', on: true },
  { id: 'u8', no: '197901012005011001', name: 'Dewi Pratiwi', role: 'admin', cls: 'Tata Usaha', on: true },
]
export const userById = id => USERS.find(u => u.id === id)

// Karya menyimpan `uid` pemilik. `by` dan `cls` hanya salinan untuk tampilan.
const w = (id, title, uid, cat, likes, status = 'approved', extra = {}) => {
  const u = userById(uid)
  return { id, title, uid, by: u.name, cls: u.cls, cat, likes, status, desc: 'Deskripsi singkat karya ' + title + '.', alt: '', ...extra }
}
export const W0 = [
  w(1, 'Festival Tari Nusantara', 'u4', 'Seni Pertunjukan', 84),
  w(2, 'Poster Festival Budaya 2025', 'u1', 'Desain & Ilustrasi', 128),
  w(3, 'Panel Kontrol Motor 3 Fasa', 'u2', 'Kelistrikan (TITL)', 97),
  w(4, 'Engine Stand Mobil Mini', 'u5', 'Otomotif (TKRO)', 61),
  w(5, 'Aplikasi Absensi Kelas', 'u6', 'Teknologi & Aplikasi', 45),
  w(6, 'Laporan Daur Ulang Oli Bekas', 'u3', 'Karya Tulis', 52),
  w(7, 'Ilustrasi Kebun Sekolah', 'u1', 'Desain & Ilustrasi', 0, 'pending'),
  w(8, 'Poster Hemat Energi', 'u1', 'Desain & Ilustrasi', 0, 'revision', { note: 'Perbesar teks ajakan dan tingkatkan kontras agar mudah dibaca.' }),
  w(9, 'Poster Pekan Budaya', 'u6', 'Desain & Ilustrasi', 0, 'pending'),
  w(10, 'Kemasan Keripik Singkong', 'u5', 'Kewirausahaan', 0, 'pending'),
]
export const A0 = [
  { id: 1, type: 'Pengumuman', title: 'Pameran Karya Siswa 2026 dibuka 24 Oktober', body: 'Unggah karya terbaikmu sebelum 20 Oktober agar ikut dipamerkan.', status: 'Terbit', pin: true },
  { id: 2, type: 'Berita', title: 'Panduan baru: menulis teks alternatif', body: 'Teks alternatif membantu pembaca layar memahami karyamu.', status: 'Terbit', pin: false },
  { id: 3, type: 'Pengumuman', title: 'Pengumpulan karya lomba dibuka', body: 'Draf pengumuman lomba antar kelas.', status: 'Draf', pin: false },
]
// Daftar akun untuk panel admin, diturunkan dari USERS (status aktif bisa diubah di state).
export const ACC0 = USERS.map(u => ({ id: u.id, name: u.name, role: ROLE_LABEL[u.role] + ' · ' + u.cls, on: u.on }))
