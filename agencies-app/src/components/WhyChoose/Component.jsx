import './Component.css'

function WhyChoose() {
  return (
    <section className="why-section section" aria-labelledby="why-title" data-reveal>
      <div className="container">
        <h2 id="why-title" className="section-title" data-reveal>
          Why choose me?
        </h2>

        <div className="why-section__cards">
          <article className="why-card why-card--dark" data-reveal style={{ '--reveal-delay': '90ms' }}>
            <span>01</span>
            <h3>Sharp visual systems</h3>
            <p>
              Distinct brand foundations, consistent interface details, and a
              polished presentation across every touchpoint.
            </p>
          </article>

          <article className="why-card why-card--light" data-reveal style={{ '--reveal-delay': '170ms' }}>
            <span>02</span>
            <h3>Calm process</h3>
            <p>
              Clear decisions, focused revisions, and production-ready files
              that make launch feel organized from start to finish.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
