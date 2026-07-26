import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { company, navLinks } from '../data.js';
import '../styles/Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`nav ${stuck ? 'nav--stuck' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="nav__logo" aria-label={company.fullName}>
          <img src={`${import.meta.env.BASE_URL}icons/logo.png`} alt={company.fullName} />
        </a>

        <nav className="nav__links" aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="nav__link">{l.label}</a>
          ))}
        </nav>

        <div className="nav__right">
          <a className="nav__call" href={company.phoneHref}>
            <span className="nav__call-icon"><Icon name="phone" size={20} /></span>
            <span className="nav__call-text">
              <small>Call Us Anytime</small>
              <strong>{company.phone}</strong>
            </span>
          </a>
          <a href="#contact" className="btn btn--navy nav__cta">Get a Quote</a>
          <button
            className="nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      <div className={`drawer ${open ? 'drawer--open' : ''}`} onClick={() => setOpen(false)}>
        <nav className="drawer__panel" onClick={(e) => e.stopPropagation()} aria-label="Mobile">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a className="btn btn--navy drawer__cta" href="#contact" onClick={() => setOpen(false)}>Get a Quote</a>
          <a className="drawer__call" href={company.phoneHref}>
            <Icon name="phone" size={18} /> {company.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
