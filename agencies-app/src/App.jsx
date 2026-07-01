import { useEffect } from 'react'
import Navbar from './components/Navbar/Component.jsx'
import Hero from './components/Hero/Component.jsx'
import About from './components/About/Component.jsx'
import Services from './components/Services/Component.jsx'
import WhyChoose from './components/WhyChoose/Component.jsx'
import OurTeam from './components/OurTeam/Component.jsx'
import Footer from './components/Footer/Component.jsx'
import './styles/global.css'

function App() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')

    if (!revealItems.length) {
      return undefined
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <OurTeam />
      </main>
      <Footer />
    </>
  )
}

export default App
