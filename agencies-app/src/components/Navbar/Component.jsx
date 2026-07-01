import { useEffect, useState } from 'react'
import './Component.css'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const syncHash = () => {
      if (window.location.hash) {
        setActiveHref(window.location.hash)
      }
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)

    if (!sections.length) {
      return () => window.removeEventListener('hashchange', syncHash)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveHref(`#${visibleEntry.target.id}`)
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', syncHash)
    }
  }, [])

  return (
    <header className="site-header" data-reveal>
      <nav className="navbar container" aria-label="Primary navigation">
        <a className="navbar__logo" href="#home" onClick={closeMenu}>
          Pedro.m
        </a>

        <button
          className="navbar__toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span></span>
          <span></span>
        </button>

        <div className={`navbar__menu ${isOpen ? 'navbar__menu--open' : ''}`}>
          <ul className="navbar__links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  className={item.href === activeHref ? 'navbar__link--active' : undefined}
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a className="button button--nav" href="#contact" onClick={closeMenu}>
            Contact now <span aria-hidden="true">→</span>
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
