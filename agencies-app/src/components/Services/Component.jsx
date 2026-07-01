import './Component.css'

const services = [
  { number: '01', title: 'Branding', tags: ['Branding', 'Strategy'] },
  { number: '02', title: 'Product Design', tags: ['Design', 'Interface'] },
  { number: '03', title: 'No-code Development', tags: ['Webflow', 'Systems'] },
  { number: '04', title: 'Art Direction', tags: ['Creative', 'Communication'] },
  { number: '05', title: 'Motion Design', tags: ['Motion', 'Storytelling'] },
]

function Services() {
  return (
    <section className="services-section section" id="services" aria-labelledby="services-title" data-reveal>
      <div className="container">
        <h2 id="services-title" className="section-title" data-reveal>
          Services
        </h2>

        <div className="services-list">
          {services.map((service, index) => (
            <article
              className="service-row"
              key={service.number}
              data-reveal
              style={{ '--reveal-delay': `${90 + index * 80}ms` }}
            >
              <span className="service-row__number">[{service.number}]</span>
              <h3>{service.title}</h3>
              <div className="service-row__tags" aria-label={`${service.title} categories`}>
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
