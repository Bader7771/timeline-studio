import './Component.css'

function About() {
  return (
    <section className="about-section section" id="about" aria-labelledby="about-title" data-reveal>
      <div className="container about-section__grid">
        <h2 id="about-title" data-reveal>
          About me
        </h2>
        <p data-reveal style={{ '--reveal-delay': '90ms' }}>
          I&apos;m a digital designer crafting refined brand systems, editorial
          websites, and product experiences for ambitious teams. My work combines
          clear strategy with precise visual execution, creating interfaces that
          feel calm, memorable, and easy to use.
        </p>
      </div>
    </section>
  )
}

export default About
