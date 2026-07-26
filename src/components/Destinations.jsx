import Img from './Img.jsx';
import SectionHeading from './SectionHeading.jsx';
import { destinations } from '../data.js';
import '../styles/Destinations.css';

export default function Destinations() {
  return (
    <section className="section section--alt" id="destinations">
      <div className="container">
        <SectionHeading eyebrow="Popular Destinations" title="Explore Top Destinations" />
        <ul className="dest">
          {destinations.map((d) => (
            <li key={d.name} className="dest__card">
              <Img src={d.image} alt={d.name} className="dest__img" />
              <span className="dest__shade" aria-hidden="true" />
              <div className="dest__text">
                <h3>{d.name}</h3>
                {d.note && <p className="dest__note">{d.note}</p>}
                <p className="dest__from">Starting from</p>
                <p className="dest__price">{d.price}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="section__cta">
          <a href="#contact" className="btn btn--navy">View All Destinations</a>
        </div>
      </div>
    </section>
  );
}
