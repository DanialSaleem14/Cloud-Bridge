import Icon from './Icon.jsx';
import { features } from '../data.js';
import '../styles/FeatureBar.css';

export default function FeatureBar() {
  return (
    <div className="container">
      <ul className="featurebar">
        {features.map((f) => (
          <li key={f.title} className="featurebar__item">
            <Icon name={f.icon} size={30} className="featurebar__icon" />
            <span>
              <strong>{f.title}</strong>
              <small>{f.sub}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
