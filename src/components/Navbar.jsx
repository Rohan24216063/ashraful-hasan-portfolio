import { useEffect, useState } from 'react'
import { FiAward, FiBookOpen, FiFolder, FiHome, FiMail, FiMenu, FiMoon, FiSun, FiUser, FiX } from 'react-icons/fi'

const navItems = [
  ['home', 'Home', FiHome],
  ['about', 'About', FiUser],
  ['achievements', 'Achievements', FiAward],
  ['projects', 'Projects', FiFolder],
  ['research', 'Research', FiBookOpen],
  ['resume', 'Resume', FiBookOpen],
  ['contact', 'Contact', FiMail],
]

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 18)
      const current = [...navItems].reverse().find(([id]) => document.getElementById(id)?.getBoundingClientRect().top <= 120)
      if (current) setActive(current[0])
    }
    update(); window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }

  return <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
    <button className="brand" onClick={() => go('home')} aria-label="Go to home">AH<span>.</span></button>
    <nav className={open ? 'nav-links nav-links--open' : 'nav-links'} aria-label="Main navigation">
      {navItems.map(([id, label, Icon]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}><Icon aria-hidden="true" /> {label}</button>)}
    </nav>
    <div className="nav-actions">
      <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <FiSun /> : <FiMoon />}</button>
      <button className="mobile-menu icon-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <FiX /> : <FiMenu />}</button>
    </div>
  </header>
}
