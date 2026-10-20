import { useState } from 'react'
import { CATS, COLORS, W0, A0, ACC0 } from './data'

const ME = 'Alya Putri'
const MAX = 100 * 1024 * 1024 // batas unggah 100 MB
const ST = { pending: ['Menunggu ditinjau', 'wt'], revision: ['Perlu revisi', 'rv'], approved: ['Disetujui', 'ok'] }
const Badge = ({ k, children }) => <span className={'badge ' + k}>{children}</span>
const Ph = ({ cat, h = 170 }) => <div className="ph" style={{ background: COLORS[cat] || '#e2e8f0', height: h }}>{cat}</div>
const Field = ({ label, error, children }) => <div><label>{label}</label>{children}{error && <div className="err">{error}</div>}</div>

export default function App() {
  const [role, setRole] = useState('siswa')
  const [view, setView] = useState({ n: 'home' })
  const [works, setWorks] = useState(W0)
  const [anns, setAnns] = useState(A0)
  const [accts, setAccts] = useState(ACC0)
  const go = (n, p = {}) => { setView({ n, ...p }); window.scrollTo(0, 0) }
  const first = { siswa: 'home', guru: 'queue', admin: 'admin' }
  const menu = { siswa: [['home', 'Jelajahi'], ['mine', 'Karya saya']], guru: [['queue', 'Antrean tinjauan'], ['anns', 'Pengumuman']], admin: [['admin', 'Ringkasan'], ['anns', 'Pengumuman']] }[role]
  const pickRole = r => { setRole(r); go(first[r]) }
  const upd = (id, patch) => setWorks(ws => ws.map(w => (w.id === id ? { ...w, ...patch } : w)))
  const V = { home: Home, detail: Detail, upload: Upload, mine: Mine, queue: Queue, anns: Anns, admin: Admin }[view.n]
  const P = { role, works, setWorks, upd, anns, setAnns, accts, setAccts, go, view }
  return (
    <>
      <header className="nav">
        <b className="brand" onClick={() => pickRole(role)}>Galeri Siswa</b>
        {menu.map(([n, l]) => <button key={n} className={'lnk' + (view.n === n ? ' on' : '')} onClick={() => go(n)}>{l}</button>)}
        <span className="sp" />
        <select aria-label="Peran (khusus demo)" value={role} onChange={e => pickRole(e.target.value)}>
          <option value="siswa">Siswa</option><option value="guru">Guru</option><option value="admin">Admin</option>
        </select>
        <span className="av">{{ siswa: 'AP', guru: 'RW', admin: 'DP' }[role]}</span>
      </header>
      <main><V {...P} /></main>
      {role === 'siswa' && view.n !== 'upload' && (
        <button className="fab" aria-label="Unggah karya" onClick={() => go('upload')}><b className="plus">+</b><span>Unggah karya</span></button>
      )}
    </>
  )
}

function WorkCard({ w, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      <Ph cat={w.cat} />
      <div className="pad"><h3>{w.title}</h3><div className="mut">{w.by} · {w.cls}</div><div className="mut">{w.likes} suka</div></div>
    </button>
  )
}

function Home({ works, anns, go }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Semua')
  const shown = anns.filter(a => a.status === 'Terbit').sort((a, b) => b.pin - a.pin).slice(0, 2)
  const list = works.filter(w => w.status === 'approved' && (cat === 'Semua' || w.cat === cat) && (w.title + ' ' + w.by).toLowerCase().includes(q.toLowerCase()))
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
      <div className="chips">
        {['Semua', ...CATS].map(c => <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div className="grid3">
        {list.map(w => <WorkCard key={w.id} w={w} onClick={() => go('detail', { id: w.id })} />)}
      </div>
      {!list.length && <p className="mut">Belum ada karya yang cocok.</p>}
    </section>
  )
}

function Detail({ works, upd, view, go }) {
  const w = works.find(x => x.id === view.id)
  const [liked, setLiked] = useState(false)
  const [c, setC] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <section>
      <button className="btn g" onClick={() => go('home')}>← Kembali</button>
      <div className="two" style={{ marginTop: 16 }}>
        <div className="card"><Ph cat={w.cat} h={420} /></div>
        <div className="card pad">
          <Badge k="ok">✓ Disetujui guru</Badge>
          <h2 style={{ marginTop: 8 }}>{w.title}</h2>
          <p><b>{w.by}</b> <span className="mut">· {w.cls}</span></p>
          <p className="mut">{w.desc}</p><p className="mut">Kategori: {w.cat}</p>
          <div className="row" style={{ margin: '12px 0' }}>
            <button className="btn" onClick={() => { upd(w.id, { likes: w.likes + (liked ? -1 : 1) }); setLiked(!liked) }}>{liked ? 'Batal suka' : 'Suka'} · {w.likes}</button>
          </div>
          <h3>Komentar</h3>
          <p className="mut">Komentar ditinjau guru sebelum tampil.</p>
          <div className="row"><input className="in" aria-label="Komentar" placeholder="Tulis komentar yang baik…" value={c} onChange={e => setC(e.target.value)} />
            <button className="btn" onClick={() => { if (c.trim()) { setSent(true); setC('') } }}>Kirim</button></div>
          {sent && <p className="mut">Komentar terkirim dan menunggu ditinjau guru.</p>}
        </div>
      </div>
    </section>
  )
}

function Upload({ works, setWorks, upd, view, go }) {
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
    if (Object.keys(er).length) return
    const data = { title: f.title, desc: f.desc, cat: f.cat, alt: f.alt, status: 'pending', note: '' }
    if (ed) upd(ed.id, data); else setWorks([{ ...data, id: Date.now(), by: ME, cls: 'XI TITL 2', likes: 0 }, ...works])
    go('mine')
  }
  return (
    <section style={{ maxWidth: 720 }}>
      <h2>{ed ? 'Perbaiki karya' : 'Ceritakan ide di balik karyamu'}</h2>
      {ed && ed.note && <div className="note">Catatan guru: {ed.note}</div>}
      <form onSubmit={submit} noValidate>
        <Field label="Judul karya *" error={err.title}><input className="in" value={f.title} onChange={set('title')} /></Field>
        <Field label="Deskripsi"><textarea className="in" value={f.desc} onChange={set('desc')} /></Field>
        <Field label="Kategori karya *" error={err.cat}>
          <div className="chips">{CATS.map(c => <button type="button" key={c} className={'chip' + (f.cat === c ? ' on' : '')} onClick={() => setF({ ...f, cat: c })}>{c}</button>)}</div>
        </Field>
        <Field label="Teks alternatif *" error={err.alt}>
          <input className="in" value={f.alt} onChange={set('alt')} placeholder="Jelaskan karya untuk pembaca layar" />
          <div className="mut">Maks. 125 karakter.</div>
        </Field>
        <Field label="Berkas karya *" error={err.file}>
          <input className="in" type="file" accept=".jpg,.jpeg,.png,.pdf,.mp4" onChange={onFile} style={{ padding: 8 }} />
          <div className="mut">{file || 'JPG, PNG, PDF, atau MP4 · Maks. 100 MB · 1 berkas'}</div>
        </Field>
        <div className="row" style={{ marginTop: 20 }}><button className="btn">Kirim untuk ditinjau</button><button type="button" className="btn g" onClick={() => go('mine')}>Batal</button></div>
      </form>
    </section>
  )
}

function Mine({ works, go }) {
  const mine = works.filter(w => w.by === ME)
  return (
    <section>
      <h2>Karya saya</h2>
      {mine.map(w => {
        const [l, k] = ST[w.status]
        return (
          <article className="card row sub" key={w.id}>
            <Ph cat={w.cat} h={110} />
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
  const done = patch => { upd(cur.id, patch); setNote(''); setErr(''); setSel(null) }
  return (
    <section>
      <h2>Antrean tinjauan · {q.length} karya</h2>
      {!cur ? <p className="mut">Antrean kosong. Semua karya sudah ditinjau.</p> : (
        <div className="two">
          <div>{q.map(w => <button key={w.id} className="card pad row" style={{ width: '100%', marginBottom: 10, borderColor: w.id === cur.id ? 'var(--acc)' : undefined }} onClick={() => setSel(w.id)}><b>{w.title}</b><span className="sp" /><span className="mut">{w.by}</span></button>)}</div>
          <div className="card pad">
            <Ph cat={cur.cat} h={200} /><h3>{cur.title}</h3><p className="mut">{cur.by} · {cur.cls} · {cur.cat}</p>
            {['Karya orisinal dan identitas siswa jelas', 'Visual sesuai untuk lingkungan sekolah', 'Judul, deskripsi, dan teks alternatif sesuai'].map(t => <label className="ck" key={t}><input type="checkbox" defaultChecked />{t}</label>)}
            <textarea className="in" aria-label="Catatan untuk siswa" placeholder="Catatan untuk siswa (wajib saat meminta revisi)" value={note} onChange={e => setNote(e.target.value)} />
            {err && <div className="err">{err}</div>}
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
            <span className="tag">{a.type}</span> {a.pin && <span className="tag">Disematkan</span>} <Badge k={sk[a.status]}>{a.status}</Badge><h3>{a.title}</h3>
          </button>))}</div>
        {e && (
          <div className="card pad">
            <h3>{e.id ? 'Edit' : 'Buat'} pengumuman</h3>
            <label>Jenis</label><select value={e.type} onChange={x => setE({ ...e, type: x.target.value })}><option>Pengumuman</option><option>Berita</option></select>
            <label>Judul *</label><input className="in" value={e.title} onChange={x => setE({ ...e, title: x.target.value })} />
            <label>Isi</label><textarea className="in" value={e.body} onChange={x => setE({ ...e, body: x.target.value })} />
            <label>Status</label><select value={e.status} onChange={x => setE({ ...e, status: x.target.value })}><option>Terbit</option><option>Draf</option><option>Terjadwal</option></select>
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
  const on = accts.filter(a => a.on).length
  return (
    <section>
      <h2>Ringkasan sistem</h2>
      <div className="metrics">
        {[['Total karya', works.length], ['Perlu ditinjau', n('pending')], ['Akun aktif', on], ['Akun nonaktif', accts.length - on]].map(([l, v]) => <div className="card pad" key={l}><span className="mut">{l}</span><b>{v}</b></div>)}
      </div>
      <div className="card pad" style={{ marginTop: 16 }}>
        <h3>Status seluruh karya</h3>
        <div className="bar">{[['approved', '#15803d'], ['pending', '#b45309'], ['revision', '#be123c']].map(([s, c]) => <i key={s} style={{ width: (n(s) / works.length) * 100 + '%', background: c }} />)}</div>
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
