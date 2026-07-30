import Img from './Img.jsx';
import { about } from '../data.js';
import '../styles/About.css';

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__inner">
        <div className="about__media">
          <Img
            src="about-1"
            alt="Aeroplane over a mountain road"
            className="about__img"
          />
        </div>

        <div className="about__copy">
          <p className="section-head__eyebrow">{about.eyebrow}</p>
          <h2 className="about__title">{about.title}</h2>
          <p className="about__body">{about.body}</p>
          <ul className="about__stats">
            {about.stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn--navy">Discover More About Us</a>
        </div>
      </div>
    </section>
  );
}