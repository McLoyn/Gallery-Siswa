import { useMemo, useState } from 'react'
import './App.css'

const roleProfiles = {
  siswa: { name: 'Alya Putri', nisn: '20240015', kelas: 'XI-2', role: 'siswa' },
  guru: { name: 'Siti Rahayu', nisn: 'G-101', kelas: 'Guru', role: 'guru' },
  admin: { name: 'Rizky Admin', nisn: 'ADM-01', kelas: 'Admin', role: 'admin' },
}

const initialWorks = [
  {
    id: 1,
    title: 'Poster Festival Budaya 2025',
    student: 'Alya Putri',
    kelas: 'XI-2',
    category: 'Desain Grafis',
    description:
      'Poster promosi acara budaya sekolah yang menampilkan ilustrasi tradisional dan pesan inklusi.',
    status: 'Disetujui',
    likes: 28,
    likedByMe: true,
    comments: [
      { author: 'Rina', text: 'Visualnya menarik dan rapi.' },
      { author: 'Bimo', text: 'Warna cocok untuk tema budaya.' },
    ],
    reviewNote: 'Layout bagus dan sesuai panduan brand sekolah.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Dokumentasi Kegiatan Eco Club',
    student: 'Zahra Nabila',
    kelas: 'X-1',
    category: 'Fotografi',
    description:
      'Serangkaian foto dokumentasi kegiatan lingkungan dan penanaman pohon di sekolah.',
    status: 'Disetujui',
    likes: 19,
    likedByMe: false,
    comments: [{ author: 'Alya', text: 'Foto-fotonya bagus banget.' }],
    reviewNote: 'Kualitas foto cukup bagus dan informatif.',
    image:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Cerita Pendek: Senja di Perpustakaan',
    student: 'Damar Wicaksono',
    kelas: 'XI-3',
    category: 'Sastra',
    description:
      'Karya naratif tentang refleksi diri, ruang baca, dan persahabatan semasa SMA.',
    status: 'Menunggu Review',
    likes: 14,
    likedByMe: false,
    comments: [{ author: 'Guru', text: 'Sedang menunggu penilaian.' }],
    reviewNote: 'Belum dinilai.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'Prototype Smart Lamp',
    student: 'Farhan Dwi',
    kelas: 'XII-1',
    category: 'Teknologi',
    description:
      'Konsep prototipe lampu pintar berbasis sensor gerak untuk efisiensi energi kelas.',
    status: 'Ditolak',
    likes: 10,
    likedByMe: false,
    comments: [{ author: 'Guru', text: 'Ceritakan lebih detail flow kerja proyek.' }],
    reviewNote:
      'Perlu penjelasan teknis lebih jelas dan dokumentasi proses yang lebih lengkap.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    title: 'Draft Arsitektur Stand Kelas',
    student: 'Alya Putri',
    kelas: 'XI-2',
    category: 'Desain Grafis',
    description:
      'Rancangan visual stand kelas untuk acara expo karya siswa paling baru.',
    status: 'Draft',
    likes: 0,
    likedByMe: false,
    comments: [],
    reviewNote: 'Belum dikirim untuk review.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  },
]

const categories = ['Semua', 'Desain Grafis', 'Fotografi', 'Sastra', 'Teknologi', 'Video']
const statusFilters = ['Semua', 'Draft', 'Menunggu Review', 'Disetujui', 'Ditolak']

const tabOrder = {
  siswa: ['beranda', 'galeri', 'upload'],
  guru: ['beranda', 'galeri', 'review'],
  admin: ['beranda', 'galeri', 'admin'],
}

const emptyDraft = {
  title: '',
  category: 'Desain Grafis',
  description: '',
  fileName: '',
  imagePreview: '',
}

function App() {
  const [user, setUser] = useState(roleProfiles.siswa)
  const [activeTab, setActiveTab] = useState('beranda')
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [accountPanel, setAccountPanel] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [composerError, setComposerError] = useState('')
  const [works, setWorks] = useState(initialWorks)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Semua')
  const [feedSort, setFeedSort] = useState('Terbaru')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [draft, setDraft] = useState(emptyDraft)
  const [commentDrafts, setCommentDrafts] = useState({})
  const [selectedWork, setSelectedWork] = useState(null)
  const [notice, setNotice] = useState(
    'Login siswa berhasil. Karya Anda siap untuk ditinjau oleh guru.',
  )

  const galleryWorks = useMemo(() => {
    return works.filter((work) => {
      const matchesSearch =
        work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        categoryFilter === 'Semua' || work.category === categoryFilter
      const matchesStatus =
        statusFilter === 'Semua' || work.status === statusFilter

      return work.status === 'Disetujui' && matchesSearch && matchesCategory && matchesStatus
    })
  }, [works, searchQuery, categoryFilter, statusFilter])

  const reviewQueue = works.filter((work) => work.status === 'Menunggu Review')
  const myWorks = works.filter((work) => work.student === user.name)
  const tabs = tabOrder[user.role] || tabOrder.siswa

  const handleRoleSwitch = (role) => {
    const profile = roleProfiles[role]
    setUser(profile)
    const nextTab = role === 'guru' ? 'review' : role === 'admin' ? 'admin' : 'beranda'
    setActiveTab(nextTab)
    setNotice(
      role === 'siswa'
        ? 'Akun siswa aktif. Silakan cek status karya Anda.'
        : role === 'guru'
          ? 'Akun guru aktif. Antrean review siap dipantau.'
          : 'Akun admin aktif. Sistem pengelolaan sekolah siap digunakan.',
    )
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const nisn = event.currentTarget.nisn.value.trim()
    const student = Object.values(roleProfiles).find((profile) => profile.nisn === nisn)

    if (!student) {
      setNotice('Data siswa tidak ditemukan. Periksa kartu atau masukkan NISN secara manual.')
      return
    }

    setUser({ ...student, role: 'siswa' })
    setActiveTab('beranda')
    setNotice(`Selamat datang, ${student.name}. Login menggunakan NISN berhasil.`)
  }

  const handleScanCard = () => {
    setNotice('Kartu siswa berhasil dibaca. Data NISN dipindai otomatis dari QR kartu.')
    setUser(roleProfiles.siswa)
    setActiveTab('beranda')
  }

  const handleImageSelect = (event) => {
    const file = event.currentTarget.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setNotice('Untuk post galeri, pilih file gambar dengan format yang didukung.')
      setComposerError('Pilih file gambar dengan format yang didukung.')
      event.currentTarget.value = ''
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setNotice('Ukuran gambar maksimal 10 MB.')
      setComposerError('Ukuran gambar maksimal 10 MB.')
      event.currentTarget.value = ''
      return
    }

    setComposerError('')
    const reader = new FileReader()
    reader.onerror = () => setNotice('Gambar gagal dibaca. Silakan pilih file lain.')
    reader.onload = () => {
      setDraft((current) => ({
        ...current,
        fileName: file.name,
        imagePreview: typeof reader.result === 'string' ? reader.result : '',
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleLikeToggle = (workId) => {
    setWorks((current) =>
      current.map((work) => {
        if (work.id !== workId) return work

        const likedByMe = !work.likedByMe
        return {
          ...work,
          likedByMe,
          likes: Math.max(0, work.likes + (likedByMe ? 1 : -1)),
        }
      }),
    )
  }

  const handleAddComment = (workId) => {
    const value = (commentDrafts[workId] || '').trim()
    if (!value) return

    setWorks((current) =>
      current.map((work) => {
        if (work.id !== workId) return work

        return {
          ...work,
          comments: [...work.comments, { author: user.name, text: value }],
        }
      }),
    )

    setCommentDrafts((current) => ({ ...current, [workId]: '' }))
    setNotice('Komentar berhasil ditambahkan.')
  }

  const handleSubmitDraft = (event) => {
    event.preventDefault()

    if (!draft.title.trim() || !draft.description.trim()) {
      const message = 'Judul dan deskripsi karya wajib diisi sebelum mengirim untuk review.'
      setNotice(message)
      setComposerError(message)
      return
    }

    if (!draft.imagePreview) {
      const message = 'Pilih file gambar sebelum membuat post.'
      setNotice(message)
      setComposerError(message)
      return
    }

    const nextWork = {
      id: Date.now(),
      title: draft.title.trim(),
      student: user.name,
      kelas: user.kelas,
      category: draft.category,
      description: draft.description.trim(),
      status: 'Menunggu Review',
      likes: 0,
      likedByMe: false,
      comments: [],
      reviewNote: 'Menunggu review guru.',
      image: draft.imagePreview ||
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    }

    setWorks((current) => [nextWork, ...current])
    setDraft(emptyDraft)
    setComposerError('')
    setIsComposerOpen(false)
    setActiveTab('beranda')
    setNotice('Karya berhasil dikirim untuk review.')
  }

  const handleReview = (workId, decision) => {
    const note =
      decision === 'approved'
        ? 'Karya memenuhi kebijakan sekolah.'
        : 'Perlu revisi dan detail tambahan.'

    setWorks((current) =>
      current.map((work) =>
        work.id === workId
          ? {
              ...work,
              status: decision === 'approved' ? 'Disetujui' : 'Ditolak',
              reviewNote: note,
            }
          : work,
      ),
    )

    setNotice(
      decision === 'approved'
        ? 'Karya disetujui dan otomatis tampil di galeri utama.'
        : 'Karya ditolak. Siswa akan menerima catatan revisi secara jelas.',
    )
  }

  const renderTabLabel = (tabId) => {
    const map = {
      beranda: 'For You',
      galeri: 'Following',
      upload: 'Upload',
      review: 'Review',
      admin: 'Admin',
    }
    return map[tabId] || tabId
  }

  const renderGallery = () => (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Galeri</p>
          <h2>Karya Terpublikasi</h2>
        </div>
        <div className="toolbar">
          <input
            aria-label="Search karya"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Cari karya, siswa, atau kategori"
          />
          <select
            aria-label="Filter kategori"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            aria-label="Filter status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            {statusFilters.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {galleryWorks.length === 0 ? (
        <div className="empty-state">
          <h3>Belum ada karya yang sesuai filter.</h3>
          <p>Silakan ubah kata kunci atau tunggu karya baru masuk ke galeri.</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {galleryWorks.map((work) => (
            <article key={work.id} className="work-card">
              <button type="button" className="image-button" onClick={() => setSelectedWork(work)}>
                <img src={work.image} alt={work.title} />
              </button>
              <div className="work-body">
                <div className="meta-row">
                  <span className="chip">{work.category}</span>
                  <span className="chip subtle">{work.status}</span>
                </div>
                <h3>{work.title}</h3>
                <p className="work-owner">
                  {work.student} · {work.kelas}
                </p>
                <p className="description">{work.description}</p>

                <div className="interaction-row">
                  <button
                    type="button"
                    className={work.likedByMe ? 'icon-button active' : 'icon-button'}
                    onClick={() => handleLikeToggle(work.id)}
                  >
                    ♥ {work.likes}
                  </button>
                  <span className="comment-count">💬 {work.comments.length}</span>
                </div>

                <div className="comment-stack">
                  {work.comments.slice(0, 2).map((comment, index) => (
                    <div key={`${work.id}-comment-${index}`} className="comment-item">
                      <strong>{comment.author}</strong>
                      <span>{comment.text}</span>
                    </div>
                  ))}
                </div>

                <div className="comment-composer">
                  <input
                    aria-label={`Tambah komentar untuk ${work.title}`}
                    type="text"
                    value={commentDrafts[work.id] || ''}
                    onChange={(event) =>
                      setCommentDrafts((current) => ({ ...current, [work.id]: event.target.value }))
                    }
                    placeholder="Tulis komentar"
                  />
                  <button type="button" onClick={() => handleAddComment(work.id)}>
                    Kirim
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )

  const renderHome = () => {
    const feedWorks = [...galleryWorks].sort((a, b) =>
      feedSort === 'Populer' ? b.likes - a.likes : b.id - a.id,
    )

    return (
      <main className="home-content">
        <section className="announcement-grid" aria-label="Pengumuman dan berita">
          <button
            type="button"
            className="announcement-card announcement-primary"
            onClick={() => setNotice('Pengumuman: pendaftaran Pameran Karya Siswa dibuka sampai 30 Oktober.')}
          >
            <span className="announcement-label">Pengumuman</span>
            <strong>Pameran Karya Siswa 2026</strong>
            <span className="announcement-link">Lihat detail <span aria-hidden="true">→</span></span>
          </button>
          <button
            type="button"
            className="announcement-card announcement-secondary"
            onClick={() => setNotice('Berita terbaru: karya siswa akan dipamerkan di aula sekolah minggu ini.')}
          >
            <span className="announcement-label">Berita</span>
            <strong>Kreativitas siswa, inspirasi bersama</strong>
            <span className="announcement-link">Baca berita <span aria-hidden="true">→</span></span>
          </button>
        </section>

        <label className="home-search">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            aria-label="Cari karya dan siswa"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Cari karya, siswa, atau kategori..."
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} aria-label="Hapus pencarian">
              ×
            </button>
          )}
        </label>
        <div className="home-filters">
          <label>
            <span>Filter</span>
            <select
              aria-label="Urutkan feed"
              value={feedSort}
              onChange={(event) => setFeedSort(event.target.value)}
            >
              <option>Terbaru</option>
              <option>Populer</option>
            </select>
          </label>
          <label>
            <span>Kategori</span>
            <select
              aria-label="Filter kategori feed"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="home-notice" role="status" aria-live="polite">{notice}</div>

        <div className="feed-heading">
          <div>
            <p className="section-kicker">Ruang inspirasi</p>
            <h1>Feed karya</h1>
          </div>
          <button type="button" className="feed-filter" onClick={() => setActiveTab('galeri')}>
            Jelajahi semua <span aria-hidden="true">→</span>
          </button>
        </div>

        {feedWorks.length === 0 ? (
          <div className="empty-state">
            <h3>Tidak ada karya yang cocok.</h3>
            <p>Coba kata kunci lain untuk menemukan karya siswa.</p>
          </div>
        ) : (
          <section className="home-feed" aria-label="Feed karya siswa">
            {feedWorks.map((work) => (
              <article key={work.id} className="feed-card">
                <div className="feed-card-header">
                  <div className="feed-avatar" aria-hidden="true">
                    {work.student.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                  </div>
                  <div className="feed-author">
                    <strong>{work.student}</strong>
                    <span>{work.kelas} · Karya siswa</span>
                  </div>
                  <button
                    type="button"
                    className="more-button"
                    aria-label={`Pilihan untuk ${work.title}`}
                    onClick={() => setSelectedWork(work)}
                  >
                    ···
                  </button>
                </div>

                <button type="button" className="feed-artwork" onClick={() => setSelectedWork(work)}>
                  <img src={work.image} alt={work.title} loading="lazy" />
                  <span className="artwork-category">{work.category}</span>
                </button>

                <div className="feed-card-content">
                  <div className="feed-actions">
                    <button
                      type="button"
                      className={work.likedByMe ? 'feed-action liked' : 'feed-action'}
                      aria-label={work.likedByMe ? 'Batal suka' : 'Suka karya'}
                      onClick={() => handleLikeToggle(work.id)}
                    >
                      {work.likedByMe ? '♥' : '♡'} <span>{work.likes}</span>
                    </button>
                    <button
                      type="button"
                      className="feed-action"
                      onClick={() => setSelectedWork(work)}
                      aria-label={`${work.comments.length} komentar`}
                    >
                      ◯ <span>{work.comments.length}</span>
                    </button>
                    <button
                      type="button"
                      className="feed-action save-action"
                      onClick={() => setNotice(`Karya “${work.title}” disimpan ke koleksi.`)}
                    >
                      Simpan
                    </button>
                  </div>
                  <h2>{work.title}</h2>
                  <p>{work.description}</p>
                  {work.comments[0] && (
                    <button type="button" className="first-comment" onClick={() => setSelectedWork(work)}>
                      <strong>{work.comments[0].author}</strong> {work.comments[0].text}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}

        {user.role === 'siswa' && (
          <button
            type="button"
            className="floating-post-button"
            onClick={() => {
              setComposerError('')
              setIsComposerOpen(true)
            }}
            aria-label="Buat post baru"
          >
            <span aria-hidden="true">+</span>
            <span className="floating-post-label">Post</span>
          </button>
        )}

        {isComposerOpen && (
            <div className="modal-backdrop composer-backdrop" onClick={() => setIsComposerOpen(false)}>
              <section
                className="composer-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="composer-title"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="composer-header">
                  <div>
                    <p className="section-kicker">Karya baru</p>
                    <h2 id="composer-title">Buat post</h2>
                  </div>
                  <button type="button" className="close-button" onClick={() => setIsComposerOpen(false)} aria-label="Tutup">
                    ×
                  </button>
                </div>
                <form className="upload-form composer-form" onSubmit={handleSubmitDraft}>
                  {composerError && <p className="composer-error" role="alert">{composerError}</p>}
                  <label className="file-drop">
                    {draft.imagePreview ? (
                      <img src={draft.imagePreview} alt="Preview file yang dipilih" />
                    ) : (
                      <span className="file-drop-icon" aria-hidden="true">＋</span>
                    )}
                    <strong>{draft.fileName || 'Pilih gambar untuk post'}</strong>
                    <small>JPG, PNG, atau WEBP · Maksimal 10 MB</small>
                    <input type="file" accept="image/*" onChange={handleImageSelect} />
                  </label>
                  <label>
                    <span>Caption / judul</span>
                    <input
                      type="text"
                      value={draft.title}
                      onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                      placeholder="Beri judul untuk karya"
                      required
                    />
                  </label>
                  <div className="composer-fields">
                    <label>
                      <span>Kategori</span>
                      <select
                        value={draft.category}
                        onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
                      >
                        {categories.filter((category) => category !== 'Semua').map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Deskripsi</span>
                      <textarea
                        rows="3"
                        value={draft.description}
                        onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
                        placeholder="Ceritakan proses atau inspirasi karya"
                        required
                      />
                    </label>
                  </div>
                  <div className="composer-footer">
                    <span>Post akan masuk antrean review sebelum tampil di feed.</span>
                    <button type="submit" className="primary-button">Post</button>
                  </div>
                </form>
              </section>
            </div>
        )}
      </main>
    )
  }

  const renderUpload = () => (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Dashboard Siswa</p>
          <h2>Upload dan kelola karya</h2>
        </div>
        <button type="button" className="primary-button compact" onClick={() => setDraft(emptyDraft)}>
          Buat Draft Baru
        </button>
      </div>

      <form className="upload-form" onSubmit={handleSubmitDraft}>
        <div className="field-grid">
          <label>
            <span>Judul Karya</span>
            <input
              type="text"
              value={draft.title}
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              placeholder="Masukkan judul karya"
            />
          </label>

          <label>
            <span>Kategori</span>
            <select
              value={draft.category}
              onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
            >
              {categories.filter((category) => category !== 'Semua').map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>

        <label>
          <span>Deskripsi</span>
          <textarea
            rows="4"
            value={draft.description}
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            placeholder="Jelaskan karya, proses, dan tujuan pembuatannya"
          />
        </label>

        <div className="upload-meta">
          <label>
            <span>File pendukung</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
            />
            {draft.fileName && <small className="selected-file-name">{draft.fileName}</small>}
          </label>

          <div className="validation-box">
            <strong>Validasi upload</strong>
            <ul>
              <li>Gambar maksimal 10 MB</li>
              <li>Format JPG, PNG, atau WEBP</li>
              <li>Preview ditampilkan sebelum submit</li>
            </ul>
          </div>
        </div>
        {draft.imagePreview && <img className="upload-preview" src={draft.imagePreview} alt="Preview karya" />}

        <div className="action-row">
          <button type="submit" className="primary-button">Kirim untuk Review</button>
          <button type="button" className="secondary-button" onClick={() => setNotice('Draft karya berhasil disimpan.')}>Simpan Draft</button>
        </div>
      </form>
    </section>
  )

  const renderReview = () => (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Dashboard Guru</p>
          <h2>Antrean Review</h2>
        </div>
        <span className="count-badge">{reviewQueue.length} menunggu</span>
      </div>

      {reviewQueue.length === 0 ? (
        <div className="empty-state compact">
          <h3>Belum ada karya yang menunggu review.</h3>
          <p>Semua karya sudah dinilai dan dipublikasikan.</p>
        </div>
      ) : (
        <div className="review-list">
          {reviewQueue.map((work) => (
            <article key={work.id} className="review-item">
              <div className="review-image-wrap">
                <img src={work.image} alt={work.title} />
              </div>
              <div className="review-detail">
                <div className="meta-row">
                  <span className="chip">{work.category}</span>
                  <span className="chip subtle">{work.student}</span>
                </div>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <div className="review-note">
                  <strong>Catatan Guru:</strong>
                  <span>{work.reviewNote}</span>
                </div>
                <div className="action-row">
                  <button type="button" className="primary-button compact" onClick={() => handleReview(work.id, 'approved')}>Approve</button>
                  <button type="button" className="secondary-button compact" onClick={() => handleReview(work.id, 'rejected')}>Reject</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )

  const renderAdmin = () => (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Dashboard Admin</p>
          <h2>Manajemen sekolah</h2>
        </div>
      </div>

      <div className="admin-grid">
        <article className="summary-card accent">
          <span className="summary-label">Akun Siswa Aktif</span>
          <strong>1.248</strong>
          <small>Target 1.500</small>
        </article>
        <article className="summary-card">
          <span className="summary-label">Karya Menunggu Review</span>
          <strong>{reviewQueue.length}</strong>
          <small>Perlu tindak lanjut</small>
        </article>
        <article className="summary-card">
          <span className="summary-label">Kategori</span>
          <strong>5</strong>
          <small>Desain, foto, sastra, teknologi, video</small>
        </article>
        <article className="summary-card">
          <span className="summary-label">Laporan</span>
          <strong>12</strong>
          <small>Konten & komentar</small>
        </article>
      </div>

      <div className="admin-table">
        <div className="table-row header">
          <span>Nama</span>
          <span>Role</span>
          <span>Status</span>
        </div>
        <div className="table-row">
          <span>Alya Putri</span>
          <span>Siswa</span>
          <span className="status-positive">Aktif</span>
        </div>
        <div className="table-row">
          <span>Siti Rahayu</span>
          <span>Guru</span>
          <span className="status-positive">Aktif</span>
        </div>
        <div className="table-row">
          <span>Rizky Admin</span>
          <span>Admin</span>
          <span className="status-positive">Aktif</span>
        </div>
      </div>
    </section>
  )

  return (
    <div className={darkMode ? 'page-shell theme-dark' : 'page-shell'}>
      <header className="topbar">
        <div className="topbar-brand">
          <button
            type="button"
            className="menu-button"
            aria-label={menuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <button type="button" className="brand-group" onClick={() => setActiveTab('beranda')}>
            <span className="brand-name">Navbar</span>
          </button>
        </div>

        {menuOpen && (
          <nav className="main-nav" aria-label="Navigasi utama">
            <p className="menu-section-label">Dashboard</p>
            {Object.keys(roleProfiles).map((role) => (
              <button
                key={role}
                type="button"
                className={user.role === role ? 'nav-link active' : 'nav-link'}
                onClick={() => {
                  handleRoleSwitch(role)
                  setMenuOpen(false)
                }}
              >
                {role === 'siswa' ? 'Siswa' : role === 'guru' ? 'Guru' : 'Admin'}
              </button>
            ))}
            <p className="menu-section-label menu-section-spaced">Navigasi</p>
            {tabs.map((tabId) => (
              <button
                key={tabId}
                type="button"
                className={activeTab === tabId ? 'nav-link active' : 'nav-link'}
                onClick={() => {
                  setActiveTab(tabId)
                  setMenuOpen(false)
                }}
              >
                {renderTabLabel(tabId)}
              </button>
            ))}
          </nav>
        )}

        <div className="account-menu">
          <button
            type="button"
            className="account-trigger"
            aria-expanded={accountOpen}
            onClick={() => setAccountOpen((open) => !open)}
          >
            <span className="account-label">Account</span>
            <span className="account-avatar" aria-hidden="true">{user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
          </button>
          {accountOpen && (
            <div className="account-popover">
              <strong>{user.name}</strong>
              <span>{user.kelas} · {user.role}</span>
              <div className="account-links">
                <button type="button" onClick={() => { setAccountPanel('account'); setAccountOpen(false) }}>Account</button>
                <button type="button" onClick={() => { setAccountPanel('profiles'); setAccountOpen(false) }}>Profiles</button>
                <button type="button" onClick={() => { setAccountPanel('settings'); setAccountOpen(false) }}>Settings</button>
              </div>
              <button type="button" className="theme-quick-toggle" onClick={() => setDarkMode((value) => !value)}>
                <span>{darkMode ? 'Dark mode' : 'Light mode'}</span>
                <span className={darkMode ? 'toggle-switch enabled' : 'toggle-switch'} aria-hidden="true"><i /></span>
              </button>
            </div>
          )}
        </div>
      </header>

      {activeTab !== 'beranda' && <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Portal sekolah</p>
          <h1>Publikasi, review, dan apresiasi karya siswa dalam satu sistem.</h1>
          <p className="hero-text">
            Galeri Siswa membantu sekolah mengelola portofolio digital, meninjau karya,
            dan menampilkan karya terbaik di galeri publik secara terkontrol.
          </p>

          <div className="cta-row">
            <button
              type="button"
              className="primary-button"
              onClick={() => setActiveTab(user.role === 'guru' ? 'review' : user.role === 'admin' ? 'admin' : 'upload')}
            >
              {user.role === 'guru' ? 'Lihat Review' : user.role === 'admin' ? 'Kelola Sistem' : 'Upload Karya'}
            </button>
            <button type="button" className="secondary-button" onClick={() => setActiveTab('galeri')}>
              Lihat Galeri
            </button>
          </div>

          <div className="stats-strip">
            <div>
              <strong>{works.length}</strong>
              <span>Total Karya</span>
            </div>
            <div>
              <strong>{reviewQueue.length}</strong>
              <span>Menunggu Review</span>
            </div>
            <div>
              <strong>{galleryWorks.length}</strong>
              <span>Di Galeri</span>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="card-header">
            <h2>Login Siswa</h2>
            <span className="status-online">Aktif</span>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <label htmlFor="nisn">NISN</label>
            <input id="nisn" name="nisn" defaultValue="20240015" placeholder="Masukkan NISN" />

            <div className="inline-actions">
              <button type="button" className="ghost-button" onClick={handleScanCard}>
                Scan Kartu / QR
              </button>
              <button type="submit" className="primary-button compact">
                Masuk
              </button>
            </div>
          </form>

          <div className="role-switcher" aria-label="Pilih role demo">
            <button
              type="button"
              className={user.role === 'siswa' ? 'role active' : 'role'}
              onClick={() => handleRoleSwitch('siswa')}
            >
              Siswa
            </button>
            <button
              type="button"
              className={user.role === 'guru' ? 'role active' : 'role'}
              onClick={() => handleRoleSwitch('guru')}
            >
              Guru
            </button>
            <button
              type="button"
              className={user.role === 'admin' ? 'role active' : 'role'}
              onClick={() => handleRoleSwitch('admin')}
            >
              Admin
            </button>
          </div>
        </div>
      </section>}

      {activeTab !== 'beranda' && <>
        <div className="notice-bar" role="status" aria-live="polite">
          {notice}
        </div>

        <section className="summary-grid" aria-label="Ringkasan dashboard">
        <article className="summary-card accent">
          <span className="summary-label">Karya Saya</span>
          <strong>{myWorks.length}</strong>
          <small>Draft + review + publikasi</small>
        </article>
        <article className="summary-card">
          <span className="summary-label">Menunggu Review</span>
          <strong>{reviewQueue.length}</strong>
          <small>Antrean guru</small>
        </article>
        <article className="summary-card">
          <span className="summary-label">Disetujui</span>
          <strong>{works.filter((work) => work.status === 'Disetujui').length}</strong>
          <small>Tampil di galeri</small>
        </article>
        <article className="summary-card">
          <span className="summary-label">Komentar</span>
          <strong>{works.reduce((total, work) => total + work.comments.length, 0)}</strong>
          <small>Interaksi publik</small>
        </article>
        </section>
      </>}

      {activeTab === 'beranda' && renderHome()}
      {activeTab === 'galeri' && renderGallery()}
      {activeTab === 'upload' && renderUpload()}
      {activeTab === 'review' && renderReview()}
      {activeTab === 'admin' && renderAdmin()}

      {selectedWork && (
        <div className="modal-backdrop" onClick={() => setSelectedWork(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-button" onClick={() => setSelectedWork(null)}>
              ×
            </button>
            <img src={selectedWork.image} alt={selectedWork.title} />
            <div className="modal-content">
              <div className="meta-row">
                <span className="chip">{selectedWork.category}</span>
                <span className="chip subtle">{selectedWork.status}</span>
              </div>
              <h3>{selectedWork.title}</h3>
              <p className="work-owner">
                {selectedWork.student} · {selectedWork.kelas}
              </p>
              <p className="description">{selectedWork.description}</p>
              <div className="review-note">
                <strong>Feedback review</strong>
                <span>{selectedWork.reviewNote}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {accountPanel && (
        <div className="modal-backdrop" onClick={() => setAccountPanel('')}>
          <section
            className="account-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="close-button" onClick={() => setAccountPanel('')} aria-label="Tutup">
              ×
            </button>
            {accountPanel === 'account' && (
              <>
                <p className="section-kicker">Account</p>
                <h2 id="account-modal-title">Profil akun</h2>
                <div className="account-details">
                  <span className="account-avatar large" aria-hidden="true">
                    {user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                  </span>
                  <div><strong>{user.name}</strong><span>{user.role} · {user.kelas}</span></div>
                </div>
                <p className="account-id">ID akun: {user.nisn}</p>
              </>
            )}
            {accountPanel === 'profiles' && (
              <>
                <p className="section-kicker">Profiles</p>
                <h2 id="account-modal-title">Pilih profil demo</h2>
                <div className="profile-options">
                  {Object.entries(roleProfiles).map(([role, profile]) => (
                    <button key={role} type="button" onClick={() => {
                      handleRoleSwitch(role)
                      setAccountPanel('')
                    }}>
                      <span className="account-avatar" aria-hidden="true">
                        {profile.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                      </span>
                      <span><strong>{profile.name}</strong><small>{role} · {profile.kelas}</small></span>
                      {user.role === role && <span className="profile-selected">Aktif</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
            {accountPanel === 'settings' && (
              <>
                <p className="section-kicker">Settings</p>
                <h2 id="account-modal-title">Pengaturan tampilan</h2>
                <label className="settings-toggle">
                  <span><strong>Dark mode</strong><small>Ubah tampilan aplikasi</small></span>
                  <input type="checkbox" checked={darkMode} onChange={(event) => setDarkMode(event.target.checked)} />
                </label>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

export default App
