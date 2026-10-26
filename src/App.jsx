import { useEffect, useRef, useState } from 'react'
import { CATS, COLORS, W0, A0, ACC0, userById } from './data'
import Login from './Login'
import './login.css'

const MAX = 100 * 1024 * 1024 // batas unggah 100 MB
const ALT_MAX = 125
const ST = { pending: ['Menunggu ditinjau', 'wt'], revision: ['Perlu revisi', 'rv'], approved: ['Disetujui', 'ok'] }
const initials = n => n.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase()
// Privasi: siswa dan tamu hanya melihat nama depan. Guru dan admin melihat nama lengkap untuk keperluan peninjauan.
const disp = (name, role) => (role === 'guru' || role === 'admin' ? name : name.split(' ')[0])
const Badge = ({ k, children }) => <span className={'badge ' + k}>{children}</span>
const Ph = ({ cat, h = 170, alt }) => <div className="ph" role="img" aria-label={alt || cat} style={{ background: COLORS[cat] || '#e2e8f0', height: h }}>{cat}</div>
// Label terhubung ke input lewat id. Untuk kelompok kontrol (chip) pakai group.
const Field = ({ id, label, error, group, children }) => (
  <div role={group ? 'group' : undefined} aria-labelledby={group ? id + '-l' : undefined}>
    {group ? <span className="lbl" id={id + '-l'}>{label}</span> : <label htmlFor={id}>{label}</label>}
    {children}
    {error && <div className="err" id={id + '-err'} role="alert">{error}</div>}
  </div>
)
const errProps = (id, error) => ({ id, 'aria-invalid': !!error, 'aria-describedby': error ? id + '-err' : undefined })

export default function App() {
  const [session, setSession] = useState(null) // { role: 'siswa' | 'guru' | 'admin' | 'tamu', id, name, cls } (tamu tidak punya id)
  const [view, setView] = useState({ n: 'home' })
  const [works, setWorks] = useState(W0)
  const [anns, setAnns] = useState(A0)
  const [accts, setAccts] = useState(ACC0)
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const pop = useRef(null)
  const avBtn = useRef(null)

  // Tutup menu akun dengan Esc atau klik di luar
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') { setOpen(false); avBtn.current?.focus() } }
    const onDown = e => { if (!pop.current?.contains(e.target) && !avBtn.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown) }
  }, [open])

  const toggleDark = () => { const t = !dark; setDark(t); document.documentElement.dataset.theme = t ? 'dark' : 'light' }
  const go = (n, p = {}) => { setView({ n, ...p }); window.scrollTo(0, 0) }
  const login = s => { setSession(s); setOpen(false); setView({ n: { siswa: 'home', guru: 'queue', admin: 'admin', tamu: 'home' }[s.role] }); window.scrollTo(0, 0) }
  const logout = () => { setSession(null); setOpen(false); setView({ n: 'home' }) }
  const upd = (id, patch) => setWorks(ws => ws.map(w => (w.id === id ? { ...w, ...patch } : w)))

  if (!session) return <Login accts={accts} onLogin={login} />

  const { role, name: me, id: meId, cls: myCls } = session
  const guest = role === 'tamu'
  const menu = { siswa: [['home', 'Jelajahi'], ['mine', 'Karya saya']], guru: [['queue', 'Antrean tinjauan'], ['anns', 'Pengumuman']], admin: [['admin', 'Ringkasan'], ['anns', 'Pengumuman']], tamu: [['home', 'Jelajahi']] }[role]
  const V = { home: Home, detail: Detail, upload: Upload, mine: Mine, queue: Queue, anns: Anns, admin: Admin, profile: Profile, settings: Settings }[view.n]
  const P = { role, me, meId, myCls, guest, works, setWorks, upd, anns, setAnns, accts, setAccts, go, view, dark, toggleDark, logout }
  return (
    <>
      <header className="nav">
        <button type="button" className="brand" onClick={() => login(session)}>Galeri Siswa</button>
        {menu.map(([n, l]) => <button key={n} className={'lnk' + (view.n === n ? ' on' : '')} aria-current={view.n === n ? 'page' : undefined} onClick={() => go(n)}>{l}</button>)}
        <span className="sp" />
        {guest
          ? <button className="btn" onClick={logout}>Masuk</button>
          : <button className="btn g" onClick={logout}>Keluar</button>}
        <button ref={avBtn} className="av" aria-label="Menu akun" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}>{guest ? 'T' : initials(disp(me, role))}</button>
      </header>
      {open && (
        <div className="card pop" ref={pop}>
          {guest && <p className="mut">Mode tamu · hanya bisa melihat</p>}
          {role === 'siswa' && <button className="lnk2" onClick={() => { setOpen(false); go('profile', { uid: meId }) }}>Profil saya</button>}
          {!guest && <button className="lnk2" onClick={() => { setOpen(false); go('settings') }}>Pengaturan</button>}
          <label className="ck"><input type="checkbox" checked={dark} onChange={toggleDark} />Mode gelap</label>
        </div>
      )}
      <main><V {...P} /></main>
      {role === 'siswa' && view.n !== 'upload' && (
        <button className="fab" aria-label="Unggah karya" onClick={() => go('upload')}><b className="plus" aria-hidden="true">+</b><span>Unggah karya</span></button>
      )}
    </>
  )
}

// Kartu karya: seluruh kartu bisa diklik lewat tombol pada judul (tautan terentang), strukturnya tetap valid.
function WorkCard({ w, role, onClick }) {
  return (
    <article className="card wc">
      <Ph cat={w.cat} alt={w.alt} />
      <div className="pad">
        <h3><button type="button" onClick={onClick}>{w.title}</button></h3>
        <div className="mut">{disp(w.by, role)} · {w.cls}</div>
        <div className="mut">{w.likes} suka</div>
      </div>
    </article>
  )
}

function Home({ works, anns, go, role }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Semua')
  const shown = anns.filter(a => a.status === 'Terbit').sort((a, b) => b.pin - a.pin).slice(0, 2)
  const list = works.filter(w => w.status === 'approved' && (cat === 'Semua' || w.cat === cat) && (w.title + ' ' + disp(w.by, role)).toLowerCase().includes(q.toLowerCase()))
  return (
    <section>
      <h2>Pengumuman & berita</h2>
      <div className="grid2">
        {shown.map(a => (
          <article className="card ann" key={a.id}>
            <Ph cat={a.type} h={130} />
            <div><span className="tag">{a.type}{a.pin ? ' · Disematkan' : ''}</span><h3>{a.title}</h3><p className="mut">{a.body}</p></div>
          </article>
        ))}
        {!shown.length && <p className="mut">Belum ada pengumuman.</p>}
      </div>
      <h2>Karya terbaru</h2>
      <input className="in" placeholder="Cari karya atau nama siswa" aria-label="Cari" value={q} onChange={e => setQ(e.target.value)} />
      <div className="chips" role="group" aria-label="Filter kategori">
        {['Semua', ...CATS].map(c => <button key={c} aria-pressed={c === cat} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div className="grid3">
        {list.map(w => <WorkCard key={w.id} w={w} role={role} onClick={() => go('detail', { id: w.id })} />)}
      </div>
      {!list.length && <p className="mut">Belum ada karya yang cocok.</p>}
    </section>
  )
}

function Detail({ works, upd, view, go, guest, logout, role }) {
  const w = works.find(x => x.id === view.id)
  const [liked, setLiked] = useState(false)
  const [c, setC] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <section>
      <button className="btn g" onClick={() => go('home')}>← Kembali</button>
      <div className="two" style={{ marginTop: 16 }}>
        <div className="card"><Ph cat={w.cat} h={420} alt={w.alt} /></div>
        <div className="card pad">
          <Badge k="ok">✓ Disetujui guru</Badge>
          <h2 style={{ marginTop: 8 }}>{w.title}</h2>
          <p><button className="lnk2" style={{ display: 'inline' }} onClick={() => go('profile', { uid: w.uid })}>{disp(w.by, role)}</button> <span className="mut">· {w.cls}</span></p>
          <p className="mut">{w.desc}</p><p className="mut">Kategori: {w.cat}</p>
          {w.alt && <p className="mut">Teks alternatif: {w.alt}</p>}
          <div className="row" style={{ margin: '12px 0' }}>
            <button className="btn" disabled={guest} aria-pressed={liked} onClick={() => { upd(w.id, { likes: w.likes + (liked ? -1 : 1) }); setLiked(!liked) }}>{liked ? 'Batal suka' : 'Suka'} · {w.likes}</button>
          </div>
          <h3>Komentar</h3>
          {guest ? (
            <p className="mut">Mode tamu hanya bisa melihat. <button className="lnk2 inl" onClick={logout}>Masuk</button> untuk menyukai dan berkomentar.</p>
          ) : (
            <>
              <p className="mut">Komentar ditinjau guru sebelum tampil.</p>
              <div className="row"><input className="in" aria-label="Komentar" placeholder="Tulis komentar yang baik…" value={c} onChange={e => setC(e.target.value)} />
                <button className="btn" onClick={() => { if (c.trim()) { setSent(true); setC('') } }}>Kirim</button></div>
              {sent && <p className="mut" role="status">Komentar terkirim dan menunggu ditinjau guru.</p>}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function Upload({ works, setWorks, upd, view, go, me, meId, myCls }) {
  const ed = works.find(x => x.id === view.id)
  const [f, setF] = useState(ed || { title: '', desc: '', cat: '', alt: '', file: 'berkas-sebelumnya' })
  const [file, setFile] = useState(ed ? 'berkas-sebelumnya' : '')
  const [err, setErr] = useState({})
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const onFile = e => {
    const x = e.target.files[0]
    if (!x) return
    if (x.size > MAX) { setFile(''); setErr(p => ({ ...p, file: `Berkas ${(x.size / 1048576).toFixed(0)} MB terlalu besar. Maksimal 100 MB.` })); return }
    setErr(p => ({ ...p, file: '' })); setFile(`${x.name} · ${(x.size / 1048576).toFixed(1)} MB`)
  }
  const submit = e => {
    e.preventDefault()
    const er = {}
    if (!f.title.trim()) er.title = 'Judul wajib diisi'
    if (!f.cat) er.cat = 'Pilih satu kategori'
    if (!f.alt.trim()) er.alt = 'Teks alternatif wajib diisi'
    if (!file) er.file = err.file || 'Pilih berkas karya'
    setErr(er)
    if (Object.keys(er).length) {
      const first = ['title', 'cat', 'alt', 'file'].find(k => er[k])
      document.getElementById('f-' + first)?.focus()
      return
    }
    const data = { title: f.title, desc: f.desc, cat: f.cat, alt: f.alt, status: 'pending', note: '' }
    if (ed) upd(ed.id, data); else setWorks([{ ...data, id: Date.now(), uid: meId, by: me, cls: myCls, likes: 0 }, ...works])
    go('mine')
  }
  return (
    <section style={{ maxWidth: 720 }}>
      <h2>{ed ? 'Perbaiki karya' : 'Ceritakan ide di balik karyamu'}</h2>
      {ed && ed.note && <div className="note">Catatan guru: {ed.note}</div>}
      <form onSubmit={submit} noValidate>
        <Field id="f-title" label="Judul karya *" error={err.title}><input className="in" value={f.title} onChange={set('title')} {...errProps('f-title', err.title)} /></Field>
        <Field id="f-desc" label="Deskripsi"><textarea className="in" id="f-desc" value={f.desc} onChange={set('desc')} /></Field>
        <Field id="f-cat" label="Kategori karya *" error={err.cat} group>
          <div className="chips" tabIndex={-1} {...errProps('f-cat', err.cat)}>{CATS.map(c => <button type="button" key={c} aria-pressed={f.cat === c} className={'chip' + (f.cat === c ? ' on' : '')} onClick={() => setF({ ...f, cat: c })}>{c}</button>)}</div>
        </Field>
        <Field id="f-alt" label="Teks alternatif *" error={err.alt}>
          <input className="in" value={f.alt} maxLength={ALT_MAX} onChange={set('alt')} placeholder="Jelaskan karya untuk pembaca layar" {...errProps('f-alt', err.alt)} />
          <div className="mut">{f.alt.length}/{ALT_MAX} karakter. Jelaskan apa yang terlihat, bukan hanya judulnya.</div>
        </Field>
        <Field id="f-file" label="Berkas karya *" error={err.file}>
          <input className="in" type="file" accept=".jpg,.jpeg,.png,.pdf,.mp4" onChange={onFile} style={{ padding: 8 }} {...errProps('f-file', err.file)} />
          <div className="mut">{file || 'JPG, PNG, PDF, atau MP4 · Maks. 100 MB · 1 berkas'}</div>
        </Field>
        <div className="row" style={{ marginTop: 20 }}><button className="btn">Kirim untuk ditinjau</button><button type="button" className="btn g" onClick={() => go('mine')}>Batal</button></div>
      </form>
    </section>
  )
}

function Mine({ works, go, meId }) {
  const mine = works.filter(w => w.uid === meId)
  return (
    <section>
      <h2>Karya saya</h2>
      {!mine.length && <p className="mut">Kamu belum mengunggah karya.</p>}
      {mine.map(w => {
        const [l, k] = ST[w.status]
        return (
          <article className="card row sub" key={w.id}>
            <Ph cat={w.cat} h={110} alt={w.alt} />
            <div style={{ flex: 1 }}>
              <h3>{w.title}</h3><Badge k={k}>{l}</Badge>
              {w.status === 'revision' && <div className="note">Catatan guru: {w.note}</div>}
              {w.status === 'revision' && <button className="btn" style={{ marginTop: 10 }} onClick={() => go('upload', { id: w.id })}>Perbaiki karya</button>}
              {w.status === 'approved' && <button className="btn g" style={{ marginTop: 10 }} onClick={() => go('detail', { id: w.id })}>Lihat di galeri</button>}
            </div>
          </article>
        )
      })}
    </section>
  )
}

function Queue({ works, upd }) {
  const q = works.filter(w => w.status === 'pending')
  const [sel, setSel] = useState(null)
  const [note, setNote] = useState('')
  const [err, setErr] = useState('')
  const cur = q.find(w => w.id === sel) || q[0]
  const pick = id => { setSel(id); setNote(''); setErr('') }
  const done = patch => { upd(cur.id, patch); setNote(''); setErr(''); setSel(null) }
  return (
    <section>
      <h2>Antrean tinjauan · {q.length} karya</h2>
      {!cur ? <p className="mut">Antrean kosong. Semua karya sudah ditinjau.</p> : (
        <div className="two">
          <div>{q.map(w => <button key={w.id} className="card pad row" aria-current={w.id === cur.id} style={{ width: '100%', marginBottom: 10, borderColor: w.id === cur.id ? 'var(--acc)' : undefined }} onClick={() => pick(w.id)}><b>{w.title}</b><span className="sp" /><span className="mut">{w.by}</span></button>)}</div>
          <div className="card pad" key={cur.id}>
            <Ph cat={cur.cat} h={200} alt={cur.alt} /><h3>{cur.title}</h3><p className="mut">{cur.by} · {cur.cls} · {cur.cat}</p>
            {['Karya orisinal dan identitas siswa jelas', 'Visual sesuai untuk lingkungan sekolah', 'Judul, deskripsi, dan teks alternatif sesuai'].map(t => <label className="ck" key={t}><input type="checkbox" defaultChecked />{t}</label>)}
            <textarea className="in" aria-label="Catatan untuk siswa" aria-invalid={!!err} placeholder="Catatan untuk siswa (wajib saat meminta revisi)" value={note} onChange={e => setNote(e.target.value)} />
            {err && <div className="err" role="alert">{err}</div>}
            <div className="row" style={{ marginTop: 12 }}>
              <button className="btn" onClick={() => done({ status: 'approved' })}>Setujui karya</button>
              <button className="btn o" onClick={() => (note.trim() ? done({ status: 'revision', note }) : setErr('Catatan wajib diisi saat meminta revisi'))}>Minta revisi</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Anns({ anns, setAnns }) {
  const blank = { type: 'Pengumuman', title: '', body: '', status: 'Draf', pin: false }
  const [e, setE] = useState(null)
  const save = x => { if (!x.title.trim()) return; setAnns(a => (a.some(i => i.id === x.id) ? a.map(i => (i.id === x.id ? x : i)) : [{ ...x, id: Date.now() }, ...a])); setE(null) }
  const sk = { Terbit: 'ok', Draf: 'gr', Terjadwal: 'wt' }
  return (
    <section>
      <div className="row"><h2 className="sp">Kelola pengumuman</h2><button className="btn" onClick={() => setE(blank)}>+ Buat pengumuman</button></div>
      <div className="two">
        <div>{anns.map(a => (
          <button key={a.id} className="card pad" style={{ width: '100%', marginBottom: 10 }} onClick={() => setE(a)}>
            <span className="tag">{a.type}</span> {a.pin && <span className="tag">Disematkan</span>} <Badge k={sk[a.status]}>{a.status}</Badge><span className="blk">{a.title}</span>
          </button>))}</div>
        {e && (
          <div className="card pad">
            <h3>{e.id ? 'Edit' : 'Buat'} pengumuman</h3>
            <label htmlFor="an-type">Jenis</label><select id="an-type" value={e.type} onChange={x => setE({ ...e, type: x.target.value })}><option>Pengumuman</option><option>Berita</option></select>
            <label htmlFor="an-title">Judul *</label><input id="an-title" className="in" value={e.title} onChange={x => setE({ ...e, title: x.target.value })} />
            <label htmlFor="an-body">Isi</label><textarea id="an-body" className="in" value={e.body} onChange={x => setE({ ...e, body: x.target.value })} />
            <label htmlFor="an-status">Status</label><select id="an-status" value={e.status} onChange={x => setE({ ...e, status: x.target.value })}><option>Terbit</option><option>Draf</option><option>Terjadwal</option></select>
            <label className="ck"><input type="checkbox" checked={e.pin} onChange={x => setE({ ...e, pin: x.target.checked })} />Sematkan di bagian atas beranda</label>
            <div className="row" style={{ marginTop: 12 }}>
              <button className="btn" onClick={() => save(e)}>Simpan</button>
              <button className="btn g" onClick={() => setE(null)}>Batal</button>
              {e.id && <button className="btn d" onClick={() => { setAnns(a => a.filter(i => i.id !== e.id)); setE(null) }}>Hapus</button>}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Admin({ works, accts, setAccts }) {
  const n = s => works.filter(w => w.status === s).length
  const total = works.length || 1
  const on = accts.filter(a => a.on).length
  return (
    <section>
      <h2>Ringkasan sistem</h2>
      <div className="metrics">
        {[['Total karya', works.length], ['Perlu ditinjau', n('pending')], ['Akun aktif', on], ['Akun nonaktif', accts.length - on]].map(([l, v]) => <div className="card pad" key={l}><span className="mut">{l}</span><b>{v}</b></div>)}
      </div>
      <div className="card pad" style={{ marginTop: 16 }}>
        <h3>Status seluruh karya</h3>
        <div className="bar">{[['approved', '#15803d'], ['pending', '#b45309'], ['revision', '#be123c']].map(([s, c]) => <i key={s} style={{ width: (n(s) / total) * 100 + '%', background: c }} />)}</div>
        <span className="mut">Disetujui {n('approved')} · Menunggu {n('pending')} · Perlu revisi {n('revision')}</span>
      </div>
      <div className="card pad" style={{ marginTop: 16 }}>
        <h3>Pengelolaan akun</h3>
        <table><tbody>{accts.map(a => (
          <tr key={a.id}><td><b>{a.name}</b><div className="mut">{a.role}</div></td><td><Badge k={a.on ? 'ok' : 'gr'}>{a.on ? 'Aktif' : 'Nonaktif'}</Badge></td>
            <td><button className={'btn ' + (a.on ? 'd' : 'g')} onClick={() => setAccts(x => x.map(i => (i.id === a.id ? { ...i, on: !i.on } : i)))}>{a.on ? 'Nonaktifkan' : 'Aktifkan'}</button></td></tr>))}</tbody></table>
      </div>
    </section>
  )
}

function Profile({ works, view, go, meId, guest, role }) {
  const user = userById(view.uid)
  const shown = disp(user ? user.name : 'Siswa', role)
  const mine = works.filter(w => w.uid === view.uid && w.status === 'approved')
  const first = works.find(w => w.uid === view.uid)
  const [fol, setFol] = useState(false)
  return (
    <section>
      <button className="btn g" onClick={() => go('home')}>← Kembali</button>
      <div className="card" style={{ marginTop: 16 }}>
        <Ph cat={first ? first.cat : 'Pengumuman'} h={160} />
        <div className="pad row">
          <span className="av big" aria-hidden="true">{initials(shown)}</span>
          <div className="sp"><h2 style={{ margin: 0 }}>{shown}</h2><div className="mut">{first ? first.cls : ''}</div><Badge k="ok">✓ Terbuka untuk umpan balik</Badge></div>
          {view.uid !== meId && !guest &&<button className={'btn' + (fol ? ' o' : '')} aria-pressed={fol} onClick={() => setFol(!fol)}>{fol ? 'Mengikuti' : 'Ikuti'}</button>}
        </div>
        <div className="pad row"><b>{mine.length}</b><span className="mut">karya disetujui</span><b>{148 + (fol ? 1 : 0)}</b><span className="mut">pengikut</span></div>
      </div>
      <h2>Karya</h2>
      <div className="grid3">{mine.map(w => <WorkCard key={w.id} w={w} role={role} onClick={() => go('detail', { id: w.id })} />)}</div>
      {!mine.length && <p className="mut">Belum ada karya yang disetujui.</p>}
      <p className="mut">Hanya nama depan dan kelas yang tampil. Pesan langsung dinonaktifkan untuk akun siswa.</p>
    </section>
  )
}

function Settings({ dark, toggleDark }) {
  return (
    <section style={{ maxWidth: 560 }}>
      <h2>Pengaturan</h2>
      <div className="card pad">
        <label className="ck"><input type="checkbox" checked={dark} onChange={toggleDark} />Mode gelap</label>
        <label className="ck"><input type="checkbox" defaultChecked />Beri tahu saya saat ada keputusan baru dari guru</label>
      </div>
    </section>
  )
}
