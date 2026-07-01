import './Component.css'

const quickLinks = ['Home', 'Projects', 'Services', 'About', 'Blog']
const socialLinks = ['LinkedIn', 'Instagram']

function Footer() {
  return (
    <footer className="site-footer" id="contact" data-reveal>
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand" data-reveal style={{ '--reveal-delay': '70ms' }}>
            <a className="site-footer__logo" href="#home">
              Pedro.m
            </a>
            <p>
              Independent digital design studio creating polished brand systems,
              product experiences, and editorial websites for modern teams.
            </p>
          </div>

          <nav
            className="site-footer__nav"
            aria-label="Footer quick links"
            data-reveal
            style={{ '--reveal-delay': '140ms' }}
          >
            <h2>Quick Links</h2>
            <ul>
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`}>{link}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact" data-reveal style={{ '--reveal-delay': '210ms' }}>
            <h2>Contact Information</h2>
            <address>
              <a href="mailto:hello@katem.example">deenbadr96@gmail.com</a>
              <a href="tel:0622389826">+212-622389826</a>
              <span>New York, United States</span>
            </address>
          </div>

          <nav
            className="site-footer__social"
            aria-label="Social links"
            data-reveal
            style={{ '--reveal-delay': '280ms' }}
          >
            <h2>Social Links</h2>
            <ul>
              {socialLinks.map((link) => (
                <li key={link}>
                  <a href="#contact">{link}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom" data-reveal style={{ '--reveal-delay': '350ms' }}>
          <p>© 2026 Kate.m. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
