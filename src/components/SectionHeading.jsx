import Icon from './Icon.jsx';
import '../styles/SectionHeading.css';

export default function SectionHeading({ eyebrow, title, light = false }) {
  return (
    <header className={`section-head ${light ? 'section-head--light' : ''}`}>
      {eyebrow && <p className="section-head__eyebrow">{eyebrow}</p>}
      <h2 className="section-head__title">{title}</h2>
      <div className="section-head__rule" aria-hidden="true">
        <span />
        <Icon name="plane" size={18} />
        <span />
      </div>
    </header>
  );
}
