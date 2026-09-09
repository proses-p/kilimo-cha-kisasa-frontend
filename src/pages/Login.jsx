import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Toast from '../components/Toast';
import { Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) { setError('Barua pepe si sahihi'); setLoading(false); return; }
    if (!form.password || form.password.length < 8) { setError('Nywila lazima iwe angalau herufi 8'); setLoading(false); return; }
    try {
      const res = await login(form);
      const role = (res.data.data.user?.role ?? res.data.data.role ?? '').toLowerCase();
      setShowSuccessToast(true);
      setTimeout(() => navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Server Error');
    } finally { setLoading(false); }
  };

  return <div className="auth-page auth-login">
    <div className="auth-backdrop" aria-hidden="true"><span className="auth-orb auth-orb-one" /><span className="auth-orb auth-orb-two" /></div>
    <div className="auth-layout">
      <section className="auth-story"><Link to="/" className="auth-brand"><span className="auth-brand-mark">🌿</span><span>Kilimo <b>Cha Kisasa</b></span></Link><div className="story-content"><p className="auth-eyebrow"><span /> Kilimo cha kesho, leo</p><h1>Grow with<br /><em>confidence.</em></h1><p>Better information makes better farms. Step into a clearer way to plan, protect, and grow your harvest.</p><div className="story-note"><span className="story-leaf">✦</span><span><strong>Built for the people who feed us.</strong><small>Smart tools, rooted in real farms.</small></span></div></div><p className="story-footer">© 2024 Kilimo Cha Kisasa <span>•</span> Tanzania</p></section>
      <section className="auth-panel"><div className="mobile-brand"><Link to="/" className="auth-brand"><span className="auth-brand-mark">🌿</span><span>Kilimo <b>Cha Kisasa</b></span></Link></div><div className="auth-card"><div className="auth-card-heading"><span className="auth-icon">🌱</span><p className="auth-eyebrow">Welcome back</p><h2>Good to see you.</h2><p>Ingia kwenye akaunti yako ili kuendelea.</p></div>{showSuccessToast && <Toast message="Umeingia kikamilifu! ✓" type="success" duration={3000} onClose={() => setShowSuccessToast(false)} />}{error && <div className="auth-error">{error}</div>}<form className="auth-form" onSubmit={handleSubmit}><div className="auth-field"><label>Barua pepe</label><input type="email" className="auth-input" placeholder="proses@kilimo.co.tz" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div><div className="auth-field"><label>Nywila</label><div className="auth-password-row"><input type={showPassword ? 'text' : 'password'} className="auth-input" placeholder="........" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /><button type="button" onClick={() => setShowPassword(prev => !prev)} className="auth-eye" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></div><button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Inaingia...' : 'Ingia'}</button></form><p className="auth-switch">Huna akaunti? <Link to="/register" className="auth-link">Jisajili hapa</Link></p></div></section>
    </div>
  </div>;
}
