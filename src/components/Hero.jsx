import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { FiArrowDown, FiDownload, FiMail } from 'react-icons/fi'
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { portfolio } from '../data/portfolio'

const validLink = (value) => value && !value.includes('[MY_')

export default function Hero() {
  const { personal, hero, social } = portfolio
  const socials = [[social.github, FaGithub], [social.linkedin, FaLinkedinIn], [social.facebook, FaFacebookF], [social.email, FiMail]]
  return <section className="hero-section section" id="home">
    <div className="hero-copy">
      <motion.h1 className="hero-greeting" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>{hero.greeting}</motion.h1>
      <motion.h2 className="hero-name" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}>I'M <span>ASHRAFUL HASAN</span></motion.h2>
      <div className="typewriter"><Typewriter options={{ strings: hero.roles, autoStart: true, loop: true, delay: 38, deleteSpeed: 22 }} /></div>
      <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}>{hero.tagline}</motion.p>
      <motion.div className="hero-buttons" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}>
        <a className="button button--primary" href="#projects">View My Work</a>
        <a className="button button--ghost" href={hero.cv} download><FiDownload /> Download CV</a>
        <a className="button button--text" href="#contact"><FiMail /> Contact Me</a>
      </motion.div>
      <div className="hero-connect"><p>FIND ME ON</p><span>Feel free to <b>connect</b> with me</span><div className="socials">{socials.map(([url, Icon], index) => validLink(url) ? <a key={index} href={url} target="_blank" rel="noreferrer" aria-label="Social profile"><Icon /></a> : <span key={index} className="social-disabled" aria-hidden="true"><Icon /></span>)}</div></div>
    </div>
    <motion.div className="profile-wrap" initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65 }}>
      <div className="profile-orbit orbit-one" /><div className="profile-orbit orbit-two" />
      <img src={personal.profileImage} alt={personal.name} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.hidden = false }} />
      <div className="image-fallback" hidden aria-label="Developer workspace illustration">
        <div className="illustration-screen"><span>&lt;/&gt;</span><i /><i /><i /></div>
        <div className="illustration-desk"><b>AH</b><span /></div>
        <div className="illustration-orb" />
      </div>
      <span className="profile-tag">{personal.role}</span>
    </motion.div>
    <a className="scroll-indicator" href="#stats">Scroll to explore <FiArrowDown /></a>
  </section>
}
