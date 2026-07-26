import Img from './Img.jsx';
import SectionHeading from './SectionHeading.jsx';
import { partners } from '../data.js';
import '../styles/Partners.css';

export default function Partners() {
  return (
    <section className="section section--alt" id="partners">
      <div className="container">
        <SectionHeading eyebrow="Our Partners" title="We Are Proud to Work With" />
        <ul className="partners">
          {partners.map((p) => (
            <li key={p.name} className="partners__item">
              <Img src={p.image} ext="png" alt={p.name} />
              <span className="partners__name">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
