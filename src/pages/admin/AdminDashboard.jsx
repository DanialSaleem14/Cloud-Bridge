import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../../firebase.js';
import { useAuth } from '../../AuthContext.jsx';
import { bookingTabs, company } from '../../data.js';
import Icon from '../../components/Icon.jsx';
import Img from '../../components/Img.jsx';
import '../../styles/Admin.css';

const emptyListingForm = {
  type: 'flights',
  title: '',
  from: '',
  to: '',
  date: '',
  duration: '',
  price: '',
  rating: '',
  notes: '',
};

const emptyPackageForm = {
  title: '',
  location: '',
  duration: '',
  price: '',
  image: '',
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState('listings');

  const [listingForm, setListingForm] = useState(emptyListingForm);
  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [savingListing, setSavingListing] = useState(false);
  const [listingFilter, setListingFilter] = useState('all');

  const [packageForm, setPackageForm] = useState(emptyPackageForm);
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [savingPackage, setSavingPackage] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setListings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoadingListings(false);
      },
      (err) => {
        setError('Could not load listings: ' + err.message);
        setLoadingListings(false);
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'packages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setPackages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoadingPackages(false);
      },
      (err) => {
        setError('Could not load packages: ' + err.message);
        setLoadingPackages(false);
      }
    );
    return unsubscribe;
  }, []);

  const setListingField = (name, value) => setListingForm((prev) => ({ ...prev, [name]: value }));
  const setPackageField = (name, value) => setPackageForm((prev) => ({ ...prev, [name]: value }));

  const submitListing = async (e) => {
    e.preventDefault();
    if (!listingForm.title.trim() || !listingForm.price.trim()) {
      setError('Title and price are required.');
      return;
    }
    setError('');
    setSavingListing(true);
    try {
      await addDoc(collection(db, 'listings'), {
        ...listingForm,
        title: listingForm.title.trim(),
        price: listingForm.price.trim(),
        createdAt: serverTimestamp(),
      });
      setListingForm(emptyListingForm);
    } catch (err) {
      setError('Could not save listing: ' + err.message);
    } finally {
      setSavingListing(false);
    }
  };

  const removeListing = async (id) => {
    if (!confirm('Delete this listing? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'listings', id));
    } catch (err) {
      setError('Could not delete listing: ' + err.message);
    }
  };

  const submitPackage = async (e) => {
    e.preventDefault();
    if (!packageForm.title.trim() || !packageForm.price.trim()) {
      setError('Title and price are required.');
      return;
    }
    setError('');
    setSavingPackage(true);
    try {
      await addDoc(collection(db, 'packages'), {
        ...packageForm,
        title: packageForm.title.trim(),
        price: packageForm.price.trim(),
        image: packageForm.image.trim(),
        createdAt: serverTimestamp(),
      });
      setPackageForm(emptyPackageForm);
    } catch (err) {
      setError('Could not save package: ' + err.message);
    } finally {
      setSavingPackage(false);
    }
  };

  const removePackage = async (id) => {
    if (!confirm('Delete this package card? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'packages', id));
    } catch (err) {
      setError('Could not delete package: ' + err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    navigate('/admin/login', { replace: true });
  };

  const visibleListings = listingFilter === 'all' ? listings : listings.filter((l) => l.type === listingFilter);

  return (
    <div className="admin">
      <header className="admin__header">
        <Link to="/" className="admin__logo">
          <img src={`${import.meta.env.BASE_URL}icons/logo.png`} alt={company.fullName} />
        </Link>
        <div className="admin__header-right">
          <span className="admin__user">{user?.email}</span>
          <button className="btn btn--sm btn--navy" onClick={logout}>Sign Out</button>
        </div>
      </header>

      <div className="container admin__body">
        <h1>Admin Dashboard</h1>
        <p className="admin__sub">Manage search listings and the homepage "Best Holiday Packages" cards.</p>

        <div className="admin__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={section === 'listings'}
            className={`admin__tab ${section === 'listings' ? 'is-active' : ''}`}
            onClick={() => setSection('listings')}
          >
            Search Listings
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={section === 'packages'}
            className={`admin__tab ${section === 'packages' ? 'is-active' : ''}`}
            onClick={() => setSection('packages')}
          >
            Homepage Packages
          </button>
        </div>

        {error && <p className="admin-auth__error">{error}</p>}

        {section === 'listings' ? (
          <div className="admin__grid">
            <form className="admin__form" onSubmit={submitListing}>
              <h2>Add a Listing</h2>

              <label className="field">
                <span className="field__label">Type</span>
                <span className="field__control">
                  <select value={listingForm.type} onChange={(e) => setListingField('type', e.target.value)}>
                    {bookingTabs.map((t) => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                  <Icon name="sliders" size={18} />
                </span>
              </label>

              <label className="field">
                <span className="field__label">Title</span>
                <span className="field__control">
                  <input
                    type="text"
                    required
                    value={listingForm.title}
                    onChange={(e) => setListingField('title', e.target.value)}
                    placeholder="e.g. PIA Direct Flight, Hilton Makkah, Turkey Tour Package"
                  />
                  <Icon name="tag-price" size={18} />
                </span>
              </label>

              <div className="bookcard__grid">
                <label className="field">
                  <span className="field__label">From</span>
                  <span className="field__control">
                    <input type="text" value={listingForm.from} onChange={(e) => setListingField('from', e.target.value)} placeholder="e.g. Karachi" />
                    <Icon name="pin" size={18} />
                  </span>
                </label>
                <label className="field">
                  <span className="field__label">To / Destination</span>
                  <span className="field__control">
                    <input type="text" value={listingForm.to} onChange={(e) => setListingField('to', e.target.value)} placeholder="e.g. Jeddah" />
                    <Icon name="pin" size={18} />
                  </span>
                </label>
              </div>

              <div className="bookcard__grid">
                <label className="field">
                  <span className="field__label">Date</span>
                  <span className="field__control">
                    <input type="date" value={listingForm.date} onChange={(e) => setListingField('date', e.target.value)} />
                    <Icon name="calendar" size={18} />
                  </span>
                </label>
                <label className="field">
                  <span className="field__label">Duration</span>
                  <span className="field__control">
                    <input type="text" value={listingForm.duration} onChange={(e) => setListingField('duration', e.target.value)} placeholder="e.g. 7 Days 6 Nights" />
                    <Icon name="clock" size={18} />
                  </span>
                </label>
              </div>

              <div className="bookcard__grid">
                <label className="field">
                  <span className="field__label">Price (PKR)</span>
                  <span className="field__control">
                    <input type="text" required value={listingForm.price} onChange={(e) => setListingField('price', e.target.value)} placeholder="e.g. PKR 105,000" />
                    <Icon name="tag-price" size={18} />
                  </span>
                </label>
                <label className="field">
                  <span className="field__label">Rating / Class</span>
                  <span className="field__control">
                    <input type="text" value={listingForm.rating} onChange={(e) => setListingField('rating', e.target.value)} placeholder="e.g. 5 Star, Economy" />
                    <Icon name="star" size={18} />
                  </span>
                </label>
              </div>

              <label className="field">
                <span className="field__label">Notes</span>
                <span className="field__control">
                  <input type="text" value={listingForm.notes} onChange={(e) => setListingField('notes', e.target.value)} placeholder="Extra details shown to travellers" />
                  <Icon name="visa-doc" size={18} />
                </span>
              </label>

              <button type="submit" className="btn btn--navy admin__submit" disabled={savingListing}>
                {savingListing ? 'Saving…' : 'Add Listing'}
              </button>
            </form>

            <div className="admin__list">
              <div className="admin__list-head">
                <h2>Listings</h2>
                <select value={listingFilter} onChange={(e) => setListingFilter(e.target.value)} className="admin__filter">
                  <option value="all">All types</option>
                  {bookingTabs.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>

              {loadingListings ? (
                <p className="admin__empty">Loading listings…</p>
              ) : visibleListings.length === 0 ? (
                <p className="admin__empty">No listings yet. Add one on the left.</p>
              ) : (
                <ul className="admin__items">
                  {visibleListings.map((l) => (
                    <li key={l.id} className="admin__item">
                      <div>
                        <span className="admin__item-type">{l.type}</span>
                        <strong>{l.title}</strong>
                        <span className="admin__item-meta">
                          {[l.from && l.to ? `${l.from} → ${l.to}` : l.to, l.date, l.duration].filter(Boolean).join(' · ')}
                        </span>
                      </div>
                      <div className="admin__item-right">
                        <span className="admin__item-price">{l.price}</span>
                        <button className="admin__item-delete" aria-label="Delete listing" onClick={() => removeListing(l.id)}>
                          <Icon name="close" size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="admin__grid">
            <form className="admin__form" onSubmit={submitPackage}>
              <h2>Add a Homepage Package</h2>

              <label className="field">
                <span className="field__label">Title</span>
                <span className="field__control">
                  <input
                    type="text"
                    required
                    value={packageForm.title}
                    onChange={(e) => setPackageField('title', e.target.value)}
                    placeholder="e.g. Hunza Valley Tour"
                  />
                  <Icon name="tag-price" size={18} />
                </span>
              </label>

              <div className="bookcard__grid">
                <label className="field">
                  <span className="field__label">Location</span>
                  <span className="field__control">
                    <input type="text" value={packageForm.location} onChange={(e) => setPackageField('location', e.target.value)} placeholder="e.g. Pakistan" />
                    <Icon name="pin" size={18} />
                  </span>
                </label>
                <label className="field">
                  <span className="field__label">Duration</span>
                  <span className="field__control">
                    <input type="text" value={packageForm.duration} onChange={(e) => setPackageField('duration', e.target.value)} placeholder="e.g. 5 Days 4 Nights" />
                    <Icon name="clock" size={18} />
                  </span>
                </label>
              </div>

              <label className="field">
                <span className="field__label">Price (PKR)</span>
                <span className="field__control">
                  <input type="text" required value={packageForm.price} onChange={(e) => setPackageField('price', e.target.value)} placeholder="e.g. PKR 24,999" />
                  <Icon name="tag-price" size={18} />
                </span>
              </label>

              <label className="field">
                <span className="field__label">Image URL</span>
                <span className="field__control">
                  <input type="text" value={packageForm.image} onChange={(e) => setPackageField('image', e.target.value)} placeholder="https://... (leave blank for a placeholder)" />
                  <Icon name="visa-doc" size={18} />
                </span>
                <span className="admin__hint">
                  Must be a direct link to an image file (ends in .jpg/.png/.webp, e.g. from Unsplash "Copy image address") —
                  not a page URL like a Google Images or Pinterest link.
                </span>
              </label>

              {packageForm.image.trim() && (
                <div className="admin__preview">
                  <span className="admin__preview-label">Preview</span>
                  <span className="admin__preview-thumb">
                    <Img src={packageForm.image} alt="Preview" />
                  </span>
                </div>
              )}

              <button type="submit" className="btn btn--navy admin__submit" disabled={savingPackage}>
                {savingPackage ? 'Saving…' : 'Add Package'}
              </button>
            </form>

            <div className="admin__list">
              <div className="admin__list-head">
                <h2>Homepage Packages</h2>
              </div>

              {loadingPackages ? (
                <p className="admin__empty">Loading packages…</p>
              ) : packages.length === 0 ? (
                <p className="admin__empty">No packages yet. Add one on the left.</p>
              ) : (
                <ul className="admin__items">
                  {packages.map((p) => (
                    <li key={p.id} className="admin__item">
                      <div className="admin__item-pkg">
                        <span className="admin__item-thumb">
                          <Img src={p.image} alt={p.title} />
                        </span>
                        <div>
                          <strong>{p.title}</strong>
                          <span className="admin__item-meta">
                            {[p.location, p.duration].filter(Boolean).join(' · ')}
                          </span>
                        </div>
                      </div>
                      <div className="admin__item-right">
                        <span className="admin__item-price">{p.price}</span>
                        <button className="admin__item-delete" aria-label="Delete package" onClick={() => removePackage(p.id)}>
                          <Icon name="close" size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
