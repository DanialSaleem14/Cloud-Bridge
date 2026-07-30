import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { company } from '../../data.js';
import Icon from '../../components/Icon.jsx';
import '../../styles/Admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-auth">
      <div className="admin-auth__card">
        <Link to="/" className="admin-auth__logo">
          <img src={`${import.meta.env.BASE_URL}icons/logo.png`} alt={company.fullName} />
        </Link>
        <h1>Admin Sign In</h1>
        <p className="admin-auth__sub">Sign in to manage flights, hotels, packages &amp; Umrah listings.</p>

        <form onSubmit={submit} className="admin-auth__form">
          <label className="field">
            <span className="field__label">Email</span>
            <span className="field__control">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cloudbridge.com"
                autoComplete="username"
              />
              <Icon name="mail" size={18} />
            </span>
          </label>

          <label className="field">
            <span className="field__label">Password</span>
            <span className="field__control">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <Icon name="lock" size={18} />
            </span>
          </label>

          {error && <p className="admin-auth__error">{error}</p>}

          <button type="submit" className="btn btn--navy admin-auth__submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <Link to="/" className="admin-auth__back">
          <Icon name="chevron-left" size={16} /> Back to site
        </Link>
      </div>
    </div>
  );
}
