import cityImage from '../../assets/city-card.jpg'
import portraitImage from '../../assets/portrait-card.jpg'
import laptopImage from '../../assets/laptop-card.jpg'
import './Component.css'

const cards = [
  {
    className: 'hero-card--left',
    label: (
      <>
        Based in
        <br />
        New York
      </>
    ),
    image: cityImage,
    alt: 'New York city skyline at dusk',
  },
  {
    className: 'hero-card--center',
    label: (
      <>
        I&apos;m
        <br />
        Kate Morrison
      </>
    ),
    image: portraitImage,
    alt: 'Editorial portrait of Kate Morrison',
  },
  {
    className: 'hero-card--right',
    label: (
      <>
        Digital
        <br />
        Designer
      </>
    ),
    image: laptopImage,
    alt: 'Laptop mockup showing a clean design interface',
  },
]

function Hero() {
  return (
    <section className="hero-section section" id="home" aria-labelledby="hero-title" data-reveal>
      <div className="container hero-section__inner">
        <h1 id="hero-title">Hello there 👋</h1>

        <div className="hero-cards" aria-label="Portfolio introduction cards">
          {cards.map((card, index) => (
            <article
              className={`hero-card ${card.className}`}
              key={card.className}
              style={{ '--hero-card-delay': `${260 + index * 110}ms` }}
            >
              <h2>{card.label}</h2>
              <img src={card.image} alt={card.alt} data-reveal />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
