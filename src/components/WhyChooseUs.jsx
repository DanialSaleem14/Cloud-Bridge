import Icon from './Icon.jsx';
import { whyChooseUs } from '../data.js';
import '../styles/WhyChooseUs.css';

export default function WhyChooseUs() {
  return (
    <section className="section why-wrap">
      <div className="container">
        <div className="why">
          <header className="why__head">
            <p className="why__eyebrow">Why Choose Us</p>
            <h2 className="why__title">Your Satisfaction, Our Commitment</h2>
          </header>
          <ul className="why__grid">
            {whyChooseUs.map((w) => (
              <li key={w.title}>
                <Icon name={w.icon} size={34} className="why__icon" />
                <h3>{w.title}</h3>
                <p>{w.sub}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
