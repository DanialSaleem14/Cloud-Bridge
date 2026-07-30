import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { company, socials, footer } from '../data.js';
import '../styles/Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: connect to Mailchimp / your backend endpoint.
    setSent(true);
    setEmail('');
  };

  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src={`${import.meta.env.BASE_URL}icons/logo-footer.png`}
            alt={company.fullName}
          />
          <p>{company.tagline}</p>
          <ul className="footer__socials">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label}>
                  <Icon name={s.icon} size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer__col" aria-label="Quick links">
          <h3>Quick Links</h3>
          <ul>
            {footer.quickLinks.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h3>Services</h3>
          <ul>
            {footer.services.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>

        <div className="footer__col footer__news">
          <h3>Newsletter</h3>
          <p>Subscribe to get the latest offers and travel updates</p>
          <form onSubmit={subscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              required
            />
            <button type="submit" className="btn btn--gold">Subscribe</button>
          </form>
          {sent && <p className="footer__sent" role="status">Subscribed — thank you.</p>}
        </div>

        <div className="footer__col footer__contact">
          <h3>Contact Us</h3>
          <ul>
            <li><Icon name="phone" size={15} /><a href={company.phoneHref}>{company.phone}</a></li>
            <li><Icon name="mail" size={15} /><a href={`mailto:${company.email}`}>{company.email}</a></li>
            <li><Icon name="pin" size={15} /><span>{company.address}</span></li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>© {new Date().getFullYear()} {company.fullName}. All Rights Reserved.</p>
          <p>Made by <a href="https://github.com/DanialSaleem14" target="_blank" rel="noopener noreferrer">KhalidTech</a></p>
          <Link to="/admin/login" className="footer__admin-link">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
