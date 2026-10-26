import { useEffect, useRef, useState } from 'react'
import { USERS, ROLE_LABEL } from './data'

// Fitur demo (kartu contoh, daftar akun contoh) hanya aktif saat `npm run dev`, tidak ikut build produksi.
const DEV = import.meta.env.DEV
const TABS = { siswa: { label: 'Siswa', field: 'NISN', len: 10 }, staf: { label: 'Guru & staf', field: 'NIP', len: 18 } }

// Cari akun dari nomor mentah. Mengembalikan { user } atau { error }.
// Nomor harus satu rangkaian digit utuh (10 atau 18 digit). Rangkaian 12 digit tidak dipotong jadi 10.
// Di produksi, ganti pencarian ini dengan panggilan ke server.
function findUser(raw, accts) {
  const m = String(raw).match(/(?<!\d)(\d{18}|\d{10})(?!\d)/)
  if (!m) return { error: 'Kode pada kartu tidak dikenali. Coba pindai ulang atau isi manual.' }
  const user = USERS.find(u => u.no === m[1])
  if (!user) return { error: 'Nomor belum terdaftar. Periksa kembali atau hubungi tata usaha.' }
  const acct = accts.find(a => a.id === user.id)
  if (acct && !acct.on) return { error: 'Akun ini nonaktif. Hubungi admin sekolah.' }
  return { user }
}

function Scanner({ onResult, onClose }) {
  const video = useRef(null)
  const cb = useRef(onResult)
  const [msg, setMsg] = useState('Mengaktifkan kamera…')
  const [ok, setOk] = useState(false)
  useEffect(() => { cb.current = onResult })
  useEffect(() => {
    let stream, raf, stop = false
    ;(async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (stop) { stream.getTracks().forEach(t => t.stop()); return }
        video.current.srcObject = stream
        await video.current.play()
        setOk(true)
        if (!('BarcodeDetector' in window)) { setMsg('Peramban ini belum bisa membaca kode otomatis. Gunakan isi manual.'); return }
        const det = new window.BarcodeDetector({ formats: ['qr_code', 'code_128', 'code_39', 'ean_13'] })
        setMsg('Arahkan QR atau barcode kartu ke dalam bingkai')
        const tick = async () => {
          if (stop) return
          try { const r = await det.detect(video.current); if (r[0]) { cb.current(r[0].rawValue); return } } catch { /* abaikan frame gagal */ }
          raf = requestAnimationFrame(tick)
        }
        tick()
      } catch { setMsg('Kamera tidak bisa dibuka. Izinkan akses kamera di peramban, atau isi manual.') }
    })()
    return () => { stop = true; cancelAnimationFrame(raf); if (stream) stream.getTracks().forEach(t => t.stop()) }
  }, [])
  return (
    <div className="lg-scan">
      <div className="lg-view">
        <video ref={video} muted playsInline aria-label="Pratinjau kamera" />
        {ok && <i className="lg-frame" />}
      </div>
      <p className="mut" role="status">{msg}</p>
      <div className="row">
        {DEV && <button type="button" className="btn o" onClick={() => cb.current(USERS[0].no)}>Pakai kartu contoh</button>}
        <button type="button" className="btn g" onClick={onClose}>Tutup kamera</button>
      </div>
    </div>
  )
}

export default function Login({ accts, onLogin }) {
  const [scan, setScan] = useState(false)
  const [tab, setTab] = useState('siswa')
  const [num, setNum] = useState('')
  const [err, setErr] = useState('')
  const t = TABS[tab]

  const finish = r => {
    if (r.error) { setErr(r.error); setScan(false); return }
    setErr('')
    const { id, role, name, cls } = r.user
    onLogin({ id, role, name, cls })
  }
  const submit = e => {
    e.preventDefault()
    if (num.length !== t.len) { setErr(`${t.field} harus ${t.len} digit angka (terisi ${num.length}).`); return }
    const r = findUser(num, accts)
    if (r.user && (tab === 'siswa') !== (r.user.role === 'siswa')) { setErr(`Nomor ini bukan ${t.field}. Pilih tab ${tab === 'siswa' ? 'Guru & staf' : 'Siswa'}.`); return }
    finish(r)
  }
  const demo = USERS.filter(u => u.on && (u.role !== 'siswa' || u.id === 'u1'))

  return (
    <div className="lg">
      <section className="lg-hero">
        <b className="brand">Galeri Siswa</b>
        <h1>Tempat karya siswa dipamerkan dan dinilai dengan adil</h1>
        <p>Unggah karyamu, dapatkan masukan dari guru, dan lihat apa yang dibuat teman-temanmu.</p>
        <ul>
          <li>Setiap karya ditinjau guru sebelum tampil</li>
          <li>Komentar dan profil dijaga aman untuk siswa</li>
          <li>Bisa dibuka tanpa akun lewat mode tamu</li>
        </ul>
      </section>

      <main className="lg-card card pad">
        <h2>Masuk ke akunmu</h2>

        <button type="button" className="lg-scanbtn" onClick={() => { setErr(''); setScan(s => !s) }} aria-expanded={scan}>
          <span className="lg-ico" aria-hidden="true">▣</span>
          <span><b>Pindai kartu pelajar</b><small>Pakai kamera untuk membaca QR atau barcode kartu</small></span>
        </button>
        {scan && <Scanner onResult={raw => finish(findUser(raw, accts))} onClose={() => setScan(false)} />}

        <div className="lg-or"><span>atau isi manual</span></div>

        <div className="chips" role="tablist" aria-label="Jenis akun">
          {Object.entries(TABS).map(([k, v]) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} className={'chip' + (tab === k ? ' on' : '')} onClick={() => { setTab(k); setNum(''); setErr('') }}>{v.label}</button>
          ))}
        </div>
        <form onSubmit={submit} noValidate>
          <label htmlFor="lg-no">{t.field} ({t.len} digit)</label>
          <input id="lg-no" className="in" inputMode="numeric" autoComplete="off" maxLength={t.len} value={num} placeholder={`Masukkan ${t.field}`}
            aria-invalid={!!err} aria-describedby="lg-err" onChange={e => { setNum(e.target.value.replace(/\D/g, '')); setErr('') }} />
          <div id="lg-err" className="err" role="alert">{err}</div>
          <button className="btn lg-full" style={{ marginTop: 12 }}>Masuk</button>
        </form>

        {DEV && (
          <details className="lg-demo">
            <summary>Akun contoh untuk prototipe (hanya mode dev)</summary>
            {demo.map(u => <button key={u.id} type="button" className="lnk2" onClick={() => { setTab(u.role === 'siswa' ? 'siswa' : 'staf'); setNum(u.no); setErr('') }}>{ROLE_LABEL[u.role]} · {u.name} · {u.no}</button>)}
          </details>
        )}

        <div className="lg-or"><span>belum punya akun?</span></div>
        <button type="button" className="btn g lg-full" onClick={() => onLogin({ role: 'tamu', name: 'Tamu' })}>Lanjut sebagai tamu</button>
        <p className="mut lg-note">Tamu hanya bisa melihat karya yang sudah disetujui. Suka, komentar, dan unggah karya butuh akun.</p>
      </main>
    </div>
  )
}
