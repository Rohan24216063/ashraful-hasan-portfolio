import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { FiMail, FiMapPin, FiDownload, FiMoon, FiSun, FiChevronRight, FiExternalLink, FiArrowUp, FiCopy, FiCheck } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaFacebookF } from 'react-icons/fa'
import { portfolio as P } from './data/portfolio'
import './styles/notion.css'

const ok = (v) => v && !String(v).includes('[')
const Fade = ({ children, className, delay = 0 }) => <motion.div className={className} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .45, delay }}>{children}</motion.div>
const H = ({ icon, children, id }) => <h2 className="n-h" id={id}><span className="hic"><Ic k={icon} s={16} /></span>{children}</h2>
const Ph = ({ children }) => ok(children) ? children : <span className="ph" title="Placeholder – update in src/data/portfolio.js">{String(children).replace(/[[\]]/g, '')}</span>
function Toggle({ title, icon, children, open: o = false }) {
  const [open, setOpen] = useState(o)
  return <div className={`toggle ${open ? 'open' : ''}`}><button onClick={() => setOpen(!open)}><FiChevronRight />{icon && <span className="tic"><Ic k={icon} s={14} /></span>}{title}</button>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="toggle-body">{children}</motion.div>}</div>
}
const Img = ({ src, fallback }) => { const [bad, setBad] = useState(false); return bad ? <div className="img-fb">{fallback}</div> : <img src={src} alt="" onError={() => setBad(true)} /> }

const initials = n => (n.replace(/[\[\]\/]/g, ' ').split(/\s+/).filter(w => /^[A-Za-z0-9]/.test(w)).slice(0, 2).map(w => w[0]).join('') || 'P').toUpperCase()
const ProjImg = ({ src, name }) => { const [bad, setBad] = useState(!src); return bad ? <div className="pfb"><span>{initials(name)}</span></div> : <img src={src} alt={`${name.replace(/[\[\]]/g, '')} project cover`} loading="lazy" decoding="async" onError={() => setBad(true)} /> }

function Typer({ words }) {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false)
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => {
    if (reduce) { const t = setInterval(() => setI(x => (x + 1) % words.length), 2600); return () => clearInterval(t) }
    const w = words[i]; let t
    if (!del && n < w.length) t = setTimeout(() => setN(n + 1), 55)
    else if (!del) t = setTimeout(() => setDel(true), 1700)
    else if (n > 0) t = setTimeout(() => setN(n - 1), 28)
    else { setDel(false); setI((i + 1) % words.length) }
    return () => clearTimeout(t)
  }, [n, del, i, words, reduce])
  return <span className="typer" aria-hidden="true">{reduce ? words[i] : words[i].slice(0, n)}<span className="caret" /></span>
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'light')
  const [top, setTop] = useState(false)
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('portfolio-theme', theme) }, [theme])
  useEffect(() => { const f = () => setTop(scrollY > 600); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  const { personal, hero, social, about, skills, tools, achievements, timeline, projects, research, resume, contact, stats } = P
  const socials = [['GitHub', social.github, FaGithub], ['LinkedIn', social.linkedin, FaLinkedinIn], ['Facebook', social.facebook, FaFacebookF]]
  return <div className="page">
    <header className="topbar">
      <div className="crumb"><span>👨🏻‍💻</span> {personal.name} <i>/</i> Workfolio</div>
      <nav>{['about', 'projects', 'achievements', 'contact'].map(s => <a key={s} href={`#${s}`}>{s}</a>)}
        <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{theme === 'dark' ? <FiSun /> : <FiMoon />}</button></nav>
    </header>
    <div className="cover" role="img" aria-label="Abstract AI network cover" />
    <main className="doc">
      <section className="hero">
        <div className="hero-top">
          <div className="avatar-ring"><div className="avatar"><Img src={personal.profileImage} fallback="AH" /></div><span className="status-dot" title="Open to opportunities" /></div>
          <div className="hero-actions">
            {socials.map(([n, u, I]) => ok(u) && <a key={n} className="icon-btn soc" href={u} target="_blank" rel="noopener noreferrer" aria-label={n}><I /></a>)}
            <a className="icon-btn soc" href={social.email} aria-label="Email"><FiMail /></a>
          </div>
        </div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{personal.name}</motion.h1>
        <p className="typing" aria-label={[personal.role, ...hero.roles].join(', ')}><span className="typing-pre">›</span> <Typer words={[personal.role, ...hero.roles]} /></p>
        <p className="subtitle hmeta">
          <a className="meta-chip mc-uni" href="https://daffodilvarsity.edu.bd/" target="_blank" rel="noopener noreferrer"><Ic k="cap" />{personal.university}<Ic k="ext" s={12} /></a>
          <a className="meta-chip mc-loc" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personal.location)}`} target="_blank" rel="noopener noreferrer"><Ic k="pin" />{personal.location}<Ic k="ext" s={12} /></a>
        </p>
        <div className="props props2">
          <div><span className="plabel">✉️ Email</span><EmailPill email={personal.email} /></div>
          <div><span className="plabel">🏷️ Roles</span><p className="rtags">{hero.roles.map((r, i) => <em key={r} className={`rt c${i % 8}`}>{roleIcon(r)}{r}</em>)}</p></div>
        </div>
        <div className="intro">
          <div className="intro-head"><span className="intro-badge"><Ic k="hand" s={20} /></span><h2>{hero.greeting.replace(/\p{Extended_Pictographic}|\uFE0F|\p{Emoji_Modifier}/gu, '').trim()}</h2></div>
          <p className="intro-text">{hero.tagline}</p>
          <div className="intro-chips">{[['cpu', 'AI', /\bAI\b/], ['code', 'Software', /software/i], ['radio', 'IoT & Sensors', /IoT/]].filter(c => c[2].test(hero.tagline)).map(([k, l]) => <span key={l} className="ichip"><Ic k={k} s={14} />{l}</span>)}</div>
          <div className="intro-btns"><a className="ibtn primary" href="#projects">View My Work <Ic k="arrow" s={16} /></a><a className="ibtn" href={hero.cv} download><Ic k="down" s={16} /> Download CV</a><a className="ibtn" href="#contact"><Ic k="mail" s={16} /> Contact Me</a></div>
        </div>
      </section>
      <div className="stats">{stats.map(s => <Fade key={s.label} className="stat"><b>{s.value}</b><span>{s.label}</span></Fade>)}</div>

      <div className="cols">
        <aside>
          <Fade><H icon="send">Get in touch</H>
            <a className="link-row" href={social.email}><FiMail /> Email</a>
            {socials.map(([n, u, I]) => ok(u) ? <a key={n} className="link-row" href={u} target="_blank" rel="noopener noreferrer"><I /> {n}</a> : <span key={n} className="link-row disabled"><I /> {n} <span className="ph">add URL</span></span>)}
            <span className="link-row"><FiMapPin /> {personal.location}</span></Fade>
          <Fade><H icon="wrench">Skill Set</H>{Object.entries(skills).map(([g, items], i) => <Toggle key={g} title={g} open={i < 2}><div className="tags">{items.map(it => { const [n, s] = it.split('|'); return <em key={n}>{n}{s && <small> · {s}</small>}</em> })}</div></Toggle>)}</Fade>
          <Fade><H icon="tool">Tools</H><div className="tags">{tools.map(t => <em key={t}>{t}</em>)}</div></Fade>
          <Fade><H icon="book">Currently Learning</H><table className="ntable"><tbody>{research.learning.map(([n, s]) => <tr key={n}><td>{n}</td><td><span className={`pill p-${s.split(' ')[0].toLowerCase()}`}>{s}</span></td></tr>)}</tbody></table></Fade>
          <Fade><H icon="file">Resume</H><a className="file" href={resume.file} target="_blank" rel="noreferrer"><FiDownload /><div><b>Ashraful_Hasan_CV.pdf</b><small>Last updated: {resume.updated}</small></div></a></Fade>
        </aside>

        <section className="main-col">
          <Fade><H icon="user" id="about">About Me</H><p>{about.text}</p>
            <div className="callout soft"><span className="ci ci-ic"><Ic k="bulb" s={18} /></span><div><i>“Strive to build things that make a difference!”</i> — {personal.name}</div></div></Fade>
          <Fade><H icon="layers">What I Build</H><div className="grid2">{about.builds.map(([t, b]) => <div className="card mini" key={t}><b>{t}</b><p>{b}</p></div>)}</div></Fade>
          <Fade><Toggle icon="heart" title="What I care about"><div className="tags">{about.cares.map(c => <em key={c}>{c}</em>)}</div></Toggle>
            <Toggle icon="target" title="Apart from coding, I enjoy"><ul>{about.outsideCoding.map(c => <li key={c}>{c}</li>)}</ul></Toggle></Fade>

          <Fade><H icon="cal">My Journey</H><div className="journey">{timeline.map(([d, t, x]) => <div className="exp" key={d + t}><div className="dot" /><div><b>{t}</b> <span className="date">({d})</span><p>{x}</p></div></div>)}</div></Fade>

          <Fade><H icon="rocket" id="projects">Projects</H><div className="gallery">{projects.map((p, i) => <Fade delay={i * .05} className="card gcard" key={p.name}><div className="gimg"><ProjImg src={p.image} name={p.name} /></div><div className="gbody"><b><Ph>{p.name}</Ph></b><span className="pill">{p.badge}</span><p><Ph>{p.description}</Ph></p>{p.tech.length > 0 && <div className="tags">{p.tech.map(t => <em key={t}>{t}</em>)}</div>}{(p.github || p.live) && <div className="btns">{p.github && <a className="btn" href={p.github}><FaGithub /> GitHub</a>}{p.live && <a className="btn" href={p.live}><FiExternalLink /> Live</a>}</div>}</div></Fade>)}</div></Fade>

          <Fade><H icon="trophy" id="achievements">Achievements</H>{achievements.map(a => <div className="card ach" key={a.title}><div className="aimg"><Img src={a.image} fallback="🏅" /></div><div><b>{a.title}</b><div className="meta"><span>📅 {a.date}</span><span>🏛️ {a.organization}</span><span>🎪 {a.event}</span>{a.team && <span>👥 {a.team}</span>}</div><p>{a.description}</p></div></div>)}</Fade>

          <Fade><H icon="flask">Research</H><div className="callout"><span className="ci ci-ic"><Ic k="flask" s={18} /></span><div><b>Current research: <Ph>{research.topic}</Ph></b><p>Research in progress. Publications will appear here as they become available.</p></div></div>
            <p className="label">Currently exploring</p><div className="tags">{research.exploring.map(e => <em key={e}>{e}</em>)}</div></Fade>

          <Fade><H icon="chart">GitHub Activity</H><div className="card cal"><GitHubCalendar username={P.githubUsername} colorScheme={theme} blockSize={11} fontSize={12} /></div></Fade>

          <Fade><H icon="hshake" id="contact">Let's build something together</H><p>I'm always interested in meaningful technology projects, research opportunities, competitions and collaborations.</p>
            <div className="grid2"><div className="card mini"><b>Open to</b><ul>{contact.openTo.map(o => <li key={o}>{o}</li>)}</ul></div>
              <form className="card mini form" action={ok(contact.formspreeId) ? `https://formspree.io/f/${contact.formspreeId}` : undefined} method="POST" onSubmit={e => { if (!ok(contact.formspreeId)) { e.preventDefault(); alert('Add your Formspree ID in src/data/portfolio.js first.') } }}>
                <input required name="name" placeholder="Your name" /><input required type="email" name="email" placeholder="you@example.com" /><textarea required name="message" rows="4" placeholder="Tell me about your idea…" /><button className="btn primary">Send Message</button></form></div></Fade>
        </section>
      </div>
      <footer>Designed & Developed by <b>{personal.name}</b> · © 2026 · Built with React</footer>
    </main>
    {top && <button className="icon-btn totop" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><FiArrowUp /></button>}
  </div>
}

const RI = {
  cap: <><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M22 10v6"/></>,
  cpu: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></>,
  leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/></>,
  server: <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></>,
  puzzle: <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/>,
  flask: <><path d="M10 2v7.5L4.5 19A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-3L14 9.5V2"/><path d="M8.5 2h7M7 16h10"/></>,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></>,
  ext: <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
  hand: <><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/></>,
  code: <><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></>,
  radio: <><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></>,
  arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  down: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></>,
  send: <><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></>,
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>,
  tool: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></>,
  book: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  layers: <><path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></>,
  cal: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
  rocket: <><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/></>,
  trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16"/><path d="M10 14.7V17c0 .6-.5 1-1 1.2C7.8 18.8 7 20.2 7 22M14 14.7V17c0 .6.5 1 1 1.2 1.2.6 2 2 2 3.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0z"/></>,
  chart: <><path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/></>,
  hshake: <><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7 .9l.2.2L21 5"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/></>,
  bulb: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5A6 6 0 1 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/></>,
  heart: <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>,
  target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  spark: <path d="M12 3l1.9 5.8L20 10.7l-5 3.6 1.9 5.7-4.9-3.5-4.9 3.5L9 14.3l-5-3.6 6.1-1.9z"/>,
}
function Ic({ k, s = 15 }) {
  return <svg className={`ri ri-${k}`} viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{RI[k]}</svg>
}
function roleIcon(r) {
  const t = r.toLowerCase()
  const k = /student|diu/.test(t) ? 'cap' : /ai|ml/.test(t) ? 'cpu' : /spring/.test(t) ? 'leaf' : /backend/.test(t) ? 'server' : /problem/.test(t) ? 'puzzle' : /research/.test(t) ? 'flask' : 'spark'
  return <svg className="ri" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{RI[k]}</svg>
}

function EmailPill({ email }) {
  const [ok, setOk] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(email) } catch { const t = document.createElement('textarea'); t.value = email; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove() }
    setOk(true); setTimeout(() => setOk(false), 1600)
  }
  return (
    <span className="epill">
      <a href={`mailto:${email}`} className="epill-main"><span className="epill-ic"><FiMail /></span><span className="epill-addr">{email}</span></a>
      <button type="button" className={`epill-copy${ok ? ' ok' : ''}`} onClick={copy} aria-label="Copy email">{ok ? <><FiCheck /> Copied!</> : <><FiCopy /> Copy</>}</button>
      <span className="sr-only" aria-live="polite">{ok ? 'Email copied' : ''}</span>
    </span>
  )
}
