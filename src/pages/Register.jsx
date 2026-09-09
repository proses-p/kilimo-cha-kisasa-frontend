import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Eye, EyeOff } from 'lucide-react';
import Toast from '../components/Toast';
import './Auth.css';

export default function Register() {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();
  const { register: authRegister, user, loading: authLoading } = useAuth();
  if (!authLoading && user) return <Navigate to="/dashboard" />;

  const validateField = (updatedForm) => {
    const newErrors = {};
    if (!updatedForm.name || updatedForm.name.trim().length === 0) newErrors.name = ['Jina linahitajika'];
    if (!updatedForm.email || !/\S+@\S+\.\S+/.test(updatedForm.email)) newErrors.email = ['Barua pepe si sahihi'];
    if (!updatedForm.password || updatedForm.password.length < 8) newErrors.password = ['Nywila lazima iwe angalau herufi 8'];
    if (updatedForm.password !== updatedForm.password_confirmation) newErrors.password_confirmation = ['Nywila hazilingani'];
    setErrors(newErrors); return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    const fieldErrors = validateField(form);
    if (Object.keys(fieldErrors).length > 0) { setError(fieldErrors.name?.[0] || fieldErrors.email?.[0] || fieldErrors.password?.[0] || 'Invalid form data'); setLoading(false); return; }
    if (form.password !== form.password_confirmation) { setError('Nywila hazilingani!'); setLoading(false); return; }
    try { await authRegister(form); setShowSuccessToast(true); setTimeout(() => navigate('/dashboard'), 3000); } catch (err) { console.log(err.response?.data); setError('Samahani! barua pepe unayojaribu kusajili inatumika na akaunti nyingine'); } finally { setLoading(false); }
  };
  const update = (field) => (e) => { const newForm = { ...form, [field]: e.target.value }; setForm(newForm); validateField(newForm); };
  const togglePasswordValidate = () => { setShowPassword((prev) => !prev); setShowPasswordConfirm((prev) => !prev); };
  const fields = [{ label: 'Jina Kamili', field: 'name', type: 'text', placeholder: 'Juma Mwangi' }, { label: 'Barua Pepe', field: 'email', type: 'email', placeholder: 'juma@kilimo.co.tz' }, { label: 'Simu', field: 'phone', type: 'tel', placeholder: '0712345678' }, { label: 'Nywila', field: 'password', type: 'password', placeholder: '••••••••' }, { label: 'Thibitisha Nywila', field: 'password_confirmation', type: 'password', placeholder: '••••••••' }];

  return <div className="auth-page auth-register"><div className="auth-backdrop" aria-hidden="true"><span className="auth-orb auth-orb-one" /><span className="auth-orb auth-orb-two" /></div><div className="auth-layout"><section className="auth-story"><Link to="/" className="auth-brand"><span className="auth-brand-mark">🌿</span><span>Kilimo <b>Cha Kisasa</b></span></Link><div className="story-content"><p className="auth-eyebrow"><span /> Your farm, your future</p><h1>Plant the<br /><em>possibility.</em></h1><p>Every great harvest begins with a decision. Create your space to make smarter ones, season after season.</p><div className="story-note"><span className="story-leaf">✦</span><span><strong>More insight. Better harvests.</strong><small>Your next chapter starts here.</small></span></div></div><p className="story-footer">© 2024 Kilimo Cha Kisasa <span>•</span> Tanzania</p></section><section className="auth-panel"><div className="mobile-brand"><Link to="/" className="auth-brand"><span className="auth-brand-mark">🌿</span><span>Kilimo <b>Cha Kisasa</b></span></Link></div><div className="auth-card"><div className="auth-card-heading"><span className="auth-icon">🌾</span><p className="auth-eyebrow">Start your journey</p><h2>Create your space.</h2><p>Jisajili na uanze kulima kwa ujasiri.</p></div>{showSuccessToast && <Toast message="Umesajiliwa kikamilifu! ✓" type="success" duration={3000} onClose={() => setShowSuccessToast(false)} />}{error && <div className="auth-error">{error}</div>}<form className="auth-form" onSubmit={handleSubmit}>{fields.map(({ label, field, type, placeholder }) => { const isPasswordField = field === 'password'; const isConfirmField = field === 'password_confirmation'; const actualType = isPasswordField ? (showPassword ? 'text' : 'password') : isConfirmField ? (showPasswordConfirm ? 'text' : 'password') : type; return <div className="auth-field" key={field}><label>{label}</label><div className={isPasswordField || isConfirmField ? 'auth-password-row' : ''}><input type={actualType} className="auth-input" placeholder={placeholder} value={form[field]} onChange={update(field)} required={field !== 'phone'} />{(isPasswordField || isConfirmField) && <button type="button" onClick={togglePasswordValidate} className="auth-eye" aria-label={(isPasswordField ? showPassword : showPasswordConfirm) ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>{(isPasswordField ? showPassword : showPasswordConfirm) ? <EyeOff size={19} /> : <Eye size={19} />}</button>}</div>{errors[field] && <div className="auth-field-error">{errors[field][0]}</div>}</div>; })}<button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Inasajili...' : 'Jisajili'}</button></form><p className="auth-switch">Una akaunti? <Link to="/login" className="auth-link">Ingia hapa</Link></p></div></section></div></div>;
}
