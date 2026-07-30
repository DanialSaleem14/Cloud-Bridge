import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase.js';
import Icon from './Icon.jsx';
import Img from './Img.jsx';
import SectionHeading from './SectionHeading.jsx';
import '../styles/Packages.css';

const AMENITY_ICONS = [
  { icon: 'car', label: 'Transport' },
  { icon: 'bed', label: 'Hotel' },
  { icon: 'binoculars', label: 'Guide' },
  { icon: 'utensils', label: 'Meals' },
];

export default function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'packages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      setPackages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, []);

  if (packages.length === 0) return null;

  return (
    <section className="section section--alt" id="packages">
      <div className="container">
        <SectionHeading eyebrow="Top Tour Packages" title="Best Holiday Packages" />
        <ul className="pkg">
          {packages.map((p) => (
            <li key={p.id} className="pkg__card">
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
                  {AMENITY_ICONS.map((a) => (
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
