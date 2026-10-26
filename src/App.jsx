import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { FiMail, FiMapPin, FiDownload, FiMoon, FiSun, FiChevronRight, FiExternalLink, FiArrowUp } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaFacebookF } from 'react-icons/fa'
import { portfolio as P } from './data/portfolio'
import './styles/notion.css'

const ok = (v) => v && !String(v).includes('[')
const Fade = ({ children, className, delay = 0 }) => <motion.div className={className} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .45, delay }}>{children}</motion.div>
const H = ({ icon, children, id }) => <h2 className="n-h" id={id}><span>{icon}</span>{children}</h2>
const Ph = ({ children }) => ok(children) ? children : <span className="ph" title="Placeholder – update in src/data/portfolio.js">{String(children).replace(/[[\]]/g, '')}</span>
function Toggle({ title, children, open: o = false }) {
  const [open, setOpen] = useState(o)
  return <div className={`toggle ${open ? 'open' : ''}`}><button onClick={() => setOpen(!open)}><FiChevronRight />{title}</button>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="toggle-body">{children}</motion.div>}</div>
}
const Img = ({ src, fallback }) => { const [bad, setBad] = useState(false); return bad ? <div className="img-fb">{fallback}</div> : <img src={src} alt="" onError={() => setBad(true)} /> }

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
    <div className="cover" />
    <main className="doc">
      <div className="avatar"><Img src={personal.profileImage} fallback="AH" /></div>
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{personal.name}</motion.h1>
      <p className="subtitle">{personal.role} · {personal.university}</p>
      <div className="props">
        <div><span>📍 Location</span><b>{personal.location}</b></div>
        <div><span>✉️ Email</span><a href={`mailto:${personal.email}`}>{personal.email}</a></div>
        <div><span>🏷️ Roles</span><p className="tags">{hero.roles.map(r => <em key={r}>{r}</em>)}</p></div>
      </div>
      <div className="callout"><span className="ci">{hero.greeting.match(/\p{Extended_Pictographic}/u)?.[0] || '👋'}</span><div><b>{hero.greeting}</b><p>{hero.tagline}</p>
        <div className="btns"><a className="btn primary" href="#projects">View My Work</a><a className="btn" href={hero.cv} download><FiDownload /> Download CV</a><a className="btn" href="#contact"><FiMail /> Contact Me</a></div></div></div>
      <div className="stats">{stats.map(s => <Fade key={s.label} className="stat"><b>{s.value}</b><span>{s.label}</span></Fade>)}</div>

      <div className="cols">
        <aside>
          <Fade><H icon="📬">Get in touch</H>
            <a className="link-row" href={social.email}><FiMail /> Email</a>
            {socials.map(([n, u, I]) => ok(u) ? <a key={n} className="link-row" href={u} target="_blank" rel="noreferrer"><I /> {n}</a> : <span key={n} className="link-row disabled"><I /> {n} <span className="ph">add URL</span></span>)}
            <span className="link-row"><FiMapPin /> {personal.location}</span></Fade>
          <Fade><H icon="🧰">Skill Set</H>{Object.entries(skills).map(([g, items], i) => <Toggle key={g} title={g} open={i < 2}><div className="tags">{items.map(it => { const [n, s] = it.split('|'); return <em key={n}>{n}{s && <small> · {s}</small>}</em> })}</div></Toggle>)}</Fade>
          <Fade><H icon="🛠️">Tools</H><div className="tags">{tools.map(t => <em key={t}>{t}</em>)}</div></Fade>
          <Fade><H icon="📚">Currently Learning</H><table className="ntable"><tbody>{research.learning.map(([n, s]) => <tr key={n}><td>{n}</td><td><span className={`pill p-${s.split(' ')[0].toLowerCase()}`}>{s}</span></td></tr>)}</tbody></table></Fade>
          <Fade><H icon="📄">Resume</H><a className="file" href={resume.file} target="_blank" rel="noreferrer"><FiDownload /><div><b>Ashraful_Hasan_CV.pdf</b><small>Last updated: {resume.updated}</small></div></a></Fade>
        </aside>

        <section className="main-col">
          <Fade><H icon="🙋🏻‍♂️" id="about">About Me</H><p>{about.text}</p>
            <div className="callout soft"><span className="ci">💡</span><div><i>“Strive to build things that make a difference!”</i> — {personal.name}</div></div></Fade>
          <Fade><H icon="🏗️">What I Build</H><div className="grid2">{about.builds.map(([t, b]) => <div className="card mini" key={t}><b>{t}</b><p>{b}</p></div>)}</div></Fade>
          <Fade><Toggle title="❤️ What I care about"><div className="tags">{about.cares.map(c => <em key={c}>{c}</em>)}</div></Toggle>
            <Toggle title="🎯 Apart from coding, I enjoy"><ul>{about.outsideCoding.map(c => <li key={c}>{c}</li>)}</ul></Toggle></Fade>

          <Fade><H icon="🗓️">My Journey</H><div className="journey">{timeline.map(([d, t, x]) => <div className="exp" key={d + t}><div className="dot" /><div><b>{t}</b> <span className="date">({d})</span><p>{x}</p></div></div>)}</div></Fade>

          <Fade><H icon="🚀" id="projects">Projects</H><div className="gallery">{projects.map((p, i) => <Fade delay={i * .05} className="card gcard" key={p.name}><div className="gimg"><Img src={p.image} fallback={['🤖', '🚦', '🧠', '☕'][i % 4]} /></div><div className="gbody"><b><Ph>{p.name}</Ph></b><span className="pill">{p.badge}</span><p><Ph>{p.description}</Ph></p>{p.tech.length > 0 && <div className="tags">{p.tech.map(t => <em key={t}>{t}</em>)}</div>}{(p.github || p.live) && <div className="btns">{p.github && <a className="btn" href={p.github}><FaGithub /> GitHub</a>}{p.live && <a className="btn" href={p.live}><FiExternalLink /> Live</a>}</div>}</div></Fade>)}</div></Fade>

          <Fade><H icon="🏆" id="achievements">Achievements</H>{achievements.map(a => <div className="card ach" key={a.title}><div className="aimg"><Img src={a.image} fallback="🏅" /></div><div><b>{a.title}</b><div className="meta"><span>📅 {a.date}</span><span>🏛️ {a.organization}</span><span>🎪 {a.event}</span>{a.team && <span>👥 {a.team}</span>}</div><p>{a.description}</p></div></div>)}</Fade>

          <Fade><H icon="🔬">Research</H><div className="callout"><span className="ci">🧪</span><div><b>Current research: <Ph>{research.topic}</Ph></b><p>Research in progress. Publications will appear here as they become available.</p></div></div>
            <p className="label">Currently exploring</p><div className="tags">{research.exploring.map(e => <em key={e}>{e}</em>)}</div></Fade>

          <Fade><H icon="📊">GitHub Activity</H><div className="card cal"><GitHubCalendar username={P.githubUsername} colorScheme={theme} blockSize={11} fontSize={12} /></div></Fade>

          <Fade><H icon="🤝" id="contact">Let's build something together</H><p>I'm always interested in meaningful technology projects, research opportunities, competitions and collaborations.</p>
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
