import Icon from './Icon.jsx';
import BookingCard from './BookingCard.jsx';
import { hero } from '../data.js';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <img src={`${import.meta.env.BASE_URL}images/hero-bg.jpg`} alt="" aria-hidden="true" />
        <span className="hero__scrim" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">
            {hero.titleTop}
            <span className="hero__script">{hero.titleScript}</span>
          </h1>
          <p className="hero__body">{hero.body}</p>

          <ul className="hero__badges">
            {hero.badges.map((b) => (
              <li key={b.title}>
                <span className="hero__badge-ring"><Icon name={b.icon} size={22} /></span>
                <span className="hero__badge-text">
                  <strong>{b.title}</strong>
                  <small>{b.sub}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__card">
          <BookingCard />
        </div>
      </div>
    </section>
  );
}
