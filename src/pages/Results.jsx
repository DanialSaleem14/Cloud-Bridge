import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase.js';
import { bookingTabs, company } from '../data.js';
import Icon from '../components/Icon.jsx';
import '../styles/Results.css';

export default function Results() {
  const [params] = useSearchParams();
  const type = params.get('type') || 'flights';
  const from = (params.get('from') || '').toLowerCase();
  const to = (params.get('to') || '').toLowerCase();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'listings'), where('type', '==', type));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setListings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        setError('Could not load results: ' + err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [type]);

  const results = useMemo(() => {
    return listings.filter((l) => {
      const matchFrom = !from || (l.from || '').toLowerCase().includes(from);
      const matchTo = !to || (l.to || '').toLowerCase().includes(to) || (l.title || '').toLowerCase().includes(to);
      return matchFrom && matchTo;
    });
  }, [listings, from, to]);

  const tabLabel = bookingTabs.find((t) => t.id === type)?.label || type;
  const number = (company.whatsapp || company.phone || '').replace(/\D/g, '');

  const whatsappLink = (listing) => {
    const text = listing
      ? `Hi, I'm interested in: ${listing.title} (${listing.price})`
      : `Hi, I'm looking for ${tabLabel.toLowerCase()}${from ? ` from ${params.get('from')}` : ''}${to ? ` to ${params.get('to')}` : ''}.`;
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="results">
      <div className="container">
        <Link to="/" className="results__back">
          <Icon name="chevron-left" size={16} /> Back to search
        </Link>

        <h1>{tabLabel} Results</h1>
        <p className="results__sub">
          {from || to
            ? `Showing ${tabLabel.toLowerCase()} ${from ? `from ${params.get('from')}` : ''}${to ? ` to ${params.get('to')}` : ''}`.trim()
            : `Showing all available ${tabLabel.toLowerCase()}`}
        </p>

        {loading && <p className="results__empty">Loading results…</p>}
        {error && <p className="results__empty results__empty--error">{error}</p>}

        {!loading && !error && results.length === 0 && (
          <div className="results__empty-card">
            <Icon name="search" size={32} />
            <h2>No matching listings yet</h2>
            <p>We couldn't find an exact match, but our team can find one for you.</p>
            <a className="btn btn--navy" href={whatsappLink(null)} target="_blank" rel="noopener noreferrer">
              Ask on WhatsApp
            </a>
          </div>
        )}

        {!loading && results.length > 0 && (
          <ul className="results__list">
            {results.map((l) => (
              <li key={l.id} className="results__card">
                <div className="results__card-main">
                  <h3>{l.title}</h3>
                  <p className="results__card-route">
                    {[l.from && l.to ? `${l.from} → ${l.to}` : l.to, l.date, l.duration, l.rating].filter(Boolean).join(' · ')}
                  </p>
                  {l.notes && <p className="results__card-notes">{l.notes}</p>}
                </div>
                <div className="results__card-side">
                  <span className="results__card-price">{l.price}</span>
                  <a className="btn btn--gold btn--sm" href={whatsappLink(l)} target="_blank" rel="noopener noreferrer">
                    Enquire
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
