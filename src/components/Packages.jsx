import Icon from './Icon.jsx';
import Img from './Img.jsx';
import SectionHeading from './SectionHeading.jsx';
import { packages } from '../data.js';
import '../styles/Packages.css';

export default function Packages() {
  return (
    <section className="section section--alt" id="packages">
      <div className="container">
        <SectionHeading eyebrow="Top Tour Packages" title="Best Holiday Packages" />
        <ul className="pkg">
          {packages.map((p) => (
            <li key={p.title} className={`pkg__card ${p.featured ? 'is-featured' : ''}`}>
              <div className="pkg__media">
                <Img src={p.image} alt={p.title} />
                <span className="pkg__duration">
                  <Icon name="clock" size={13} /> {p.duration}
                </span>
              </div>
              <div className="pkg__body">
                <h3>{p.title}</h3>
                <p className="pkg__loc">
                  <Icon name="pin" size={13} /> {p.location}
                </p>
                <ul className="pkg__amenities">
                  {p.amenities.map((a) => (
                    <li key={a.label} title={a.label}>
                      <Icon name={a.icon} size={17} />
                    </li>
                  ))}
                </ul>
                <div className="pkg__foot">
                  <span className="pkg__price">{p.price}</span>
                  <a href="#contact" className="btn btn--gold btn--sm">Book Now</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="section__cta">
          <a href="#contact" className="btn btn--navy">View All Packages</a>
        </div>
      </div>
    </section>
  );
}
