import teamPrimary from '../../assets/team-primary.gif'
import teamSecondary from '../../assets/team-secondary.gif'
import teamIcon from '../../assets/team-secondary.gif'
import teamPortrait from '../../assets/team-icon.jpg'
import './Component.css'

const members = [
  { name: 'Kate Morrison', role: 'Founder & Gemologist' },
  { name: 'Elliot Stone', role: 'Mineral Expert' },
  { name: 'Nora Hayes', role: 'Geologist' },
  { name: 'Mila Ford', role: 'Field Geologist' },
  { name: 'Iris Clarke', role: 'Field Geologist' },
  { name: 'Avery Brooks', role: 'Senior Geologist' },
]

function DotLabel() {
  return (
    <div className="team-dot-label" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

function OurTeam() {
  return (
    <section className="team-section section" aria-labelledby="team-title" data-reveal>
      <div className="container team-section__inner">
        <DotLabel />
        <h2 id="team-title" className="section-title" data-reveal>
          Our team
        </h2>

        <div className="team-hierarchy" aria-label="Team hierarchy">
          <div className="team-parent-stack" data-reveal style={{ '--reveal-delay': '90ms' }}>
            <article className="team-parent-card team-parent-card--large">
              <img src={teamPrimary} alt="Abstract gem team portrait card" data-reveal />
            </article>
            <article className="team-parent-card team-parent-card--small">
              <img src={teamSecondary} alt="Abstract mineral specialist card" data-reveal />
            </article>
          </div>

          <div className="team-connectors" aria-hidden="true" data-reveal style={{ '--reveal-delay': '200ms' }}>
            <svg viewBox="0 0 1120 150" preserveAspectRatio="none">
              <line x1="560" y1="0" x2="78" y2="126" />
              <line x1="560" y1="0" x2="270" y2="126" />
              <line x1="560" y1="0" x2="462" y2="126" />
              <line x1="560" y1="0" x2="658" y2="126" />
              <line x1="560" y1="0" x2="850" y2="126" />
              <line x1="560" y1="0" x2="1042" y2="126" />
            </svg>
          </div>

          <div className="team-members">
            {members.map((member, index) => (
              <article
                className="team-member"
                key={member.name}
                data-reveal
                style={{ '--reveal-delay': `${310 + index * 80}ms` }}
              >
                <p>{member.name}</p>
                <h3>{member.role}</h3>
              </article>
            ))}
          </div>
        </div>

        <div className="team-feature">
          <img
            className="team-feature__icon"
            src={teamIcon}
            alt="Gem Quest team mark"
            data-reveal
            style={{ '--reveal-delay': '820ms' }}
          />
          <img
            className="team-feature__portrait"
            src={teamPortrait}
            alt="Portrait collage of the Gem Quest team"
            data-reveal
            style={{ '--reveal-delay': '900ms' }}
          />
          <h2 data-reveal style={{ '--reveal-delay': '980ms' }}>
            Introducing the Gem Quest Team
          </h2>
          <p data-reveal style={{ '--reveal-delay': '1060ms' }}>
            A focused collective of designers, researchers, and geological
            specialists working together with precision, curiosity, and a shared
            respect for every material story.
          </p>
        </div>
      </div>
    </section>
  )
}

export default OurTeam
