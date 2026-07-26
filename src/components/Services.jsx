import Icon from './Icon.jsx';
import SectionHeading from './SectionHeading.jsx';
import { services } from '../data.js';
import '../styles/Services.css';

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading eyebrow="Our Services" title="Complete Travel Solutions" />
        <ul className="services">
          {services.map((s) => (
            <li key={s.title} className="services__item">
              <Icon name={s.icon} size={38} className="services__icon" />
              <h3>{s.title}</h3>
              <p>{s.sub}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
