import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import Img from './Img.jsx';
import SectionHeading from './SectionHeading.jsx';
import { testimonials } from '../data.js';
import '../styles/Testimonials.css';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="section"
      id="testimonials"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="container">
        <SectionHeading eyebrow="What Our Clients Say" title="Happy Travelers" />

        <ul className="testi" style={{ '--active': index }}>
          {testimonials.map((t) => (
            <li key={t.name} className="testi__card">
              <div className="testi__top">
                <Img src={t.avatar} alt={t.name} className="testi__avatar" />
                <div>
                  <h3>{t.name}</h3>
                  <p className="testi__city">{t.city}</p>
                  <p className="testi__stars" aria-label={`${t.rating} out of 5`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Icon key={i} name="star" size={13} />
                    ))}
                  </p>
                </div>
              </div>
              <p className="testi__quote">{t.quote}</p>
            </li>
          ))}
        </ul>

        <div className="testi__dots">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              className={i === index ? 'is-active' : ''}
              aria-label={`Show review from ${t.name}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
