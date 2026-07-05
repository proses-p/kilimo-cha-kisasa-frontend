import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';


import Toast from '../components/Toast';

export default function Register() {
    const [errors, setErrors] = useState({});
    // removed react-hook-form/zod dependency to avoid missing schema import

    const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '', password_confirmation: '' });
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const navigate              = useNavigate();

    const { register: authRegister, user, loading: authLoading } = useAuth();

    if (!authLoading && user) return <Navigate to="/dashboard" />;

    const validateField = (updatedForm) => {
        const newErrors = {};
        if (!updatedForm.name || updatedForm.name.trim().length === 0) newErrors.name = ['Jina linahitajika'];
        if (!updatedForm.email || !/\S+@\S+\.\S+/.test(updatedForm.email)) newErrors.email = ['Barua pepe si sahihi'];
        if (!updatedForm.password || updatedForm.password.length < 8) newErrors.password = ['Nywila lazima iwe angalau herufi 8'];
        if (updatedForm.password !== updatedForm.password_confirmation) newErrors.password_confirmation = ['Nywila hazilingani'];
        setErrors(newErrors);
        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const fieldErrors = validateField(form);

        if (Object.keys(fieldErrors).length > 0) {
            setError(fieldErrors.name?.[0] || fieldErrors.email?.[0] || fieldErrors.password?.[0] || 'Invalid form data');
            setLoading(false);
            return;
        }

        if (form.password !== form.password_confirmation) {
            setError('Nywila hazilingani!');
            setLoading(false);
            return;
        }

        try {
            await authRegister(form);
            setShowSuccessToast(true);
            // delay navigation by 3 seconds
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } catch (err) {
            console.log(err.response?.data);
            setError('Kuna tatizo. Jaribu tena.');
        } finally {
            setLoading(false);
        }
    };

    const update = (field) => (e) => {
        const newForm = { ...form, [field]: e.target.value };
        setForm(newForm);
        validateField(newForm);
    };

    return (
        <div style={styles.container}>
            {showSuccessToast && (
                <Toast 
                    message="Umesajiliwa kikamilifu! ✓" 
                    type="success" 
                    duration={3000}
                    onClose={() => setShowSuccessToast(false)} 
                />
            )}
            <div style={styles.card}>
                <div style={styles.logo}>🌾</div>
                <h2 style={styles.title}>Jisajili</h2>
                <p style={styles.subtitle}>Tengeneza akaunti yako ya Kilimo Smart</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    {[
                        { label: 'Jina Kamili',  field: 'name',                  type: 'text',     placeholder: 'Juma Mwangi' },
                        { label: 'Barua Pepe',   field: 'email',                 type: 'email',    placeholder: 'juma@kilimo.co.tz' },
                        { label: 'Simu',         field: 'phone',                 type: 'tel',      placeholder: '0712345678' },
                        { label: 'Nywila',       field: 'password',              type: 'password', placeholder: '••••••••' },
                        { label: 'Thibitisha Nywila', field: 'password_confirmation', type: 'password', placeholder: '••••••••' },
                    ].map(({ label, field, type, placeholder }) => {
                        const isPasswordField = field === 'password';
                        const isConfirmField = field === 'password_confirmation';
                        const actualType = isPasswordField ? (showPassword ? 'text' : 'password') : isConfirmField ? (showPasswordConfirm ? 'text' : 'password') : type;

                        return (
                            <div key={field} style={styles.field}>
                                <label style={styles.label}>{label}</label>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <input
                                        type={actualType}
                                        style={styles.input}
                                        placeholder={placeholder}
                                        value={form[field]}
                                        onChange={update(field)}
                                        required={field !== 'phone'}
                                    />
                                    {(isPasswordField || isConfirmField) && (
                                        <button
                                            type="button"
                                            onClick={() => isPasswordField ? setShowPassword(s => !s) : setShowPasswordConfirm(s => !s)}
                                            style={{marginLeft: 8, cursor: 'pointer', background: 'transparent', border: 'none'}}
                                            aria-label={(isPasswordField ? showPassword : showPasswordConfirm) ? 'Hide password' : 'Show password'}
                                        >
                                            {(isPasswordField ? showPassword : showPasswordConfirm) ? '🙈' : '👁️'}
                                        </button>
                                    )}
                                </div>
                                {errors[field] && <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '4px' }}>{errors[field][0]}</div>}
                            </div>
                        );
                    })}

                    <button
                        type="submit"
                        style={loading ? styles.btnDisabled : styles.btn}
                        disabled={loading}
                    >
                        {loading ? 'Inasajili...' : 'Jisajili'}
                    </button>
                </form>

                <p style={styles.link}>
                    Una akaunti?{' '}
                    <Link to="/login" style={styles.linkText}>Ingia hapa</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container:  { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0fdf4' },
    card:       { backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
    logo:       { fontSize: '3rem', textAlign: 'center' },
    title:      { textAlign: 'center', color: '#166534', margin: '0.5rem 0' },
    subtitle:   { textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem' },
    error:      { backgroundColor: '#fef2f2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' },
    field:      { marginBottom: '1rem' },
    label:      { display: 'block', marginBottom: '0.4rem', color: '#374151', fontWeight: '600', fontSize: '0.9rem' },
    input:      { width: '100%', padding: '0.75rem', border: '1px solid #d1fae5', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' },
    btn:        { width: '100%', padding: '0.75rem', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600' },
    btnDisabled:{ width: '100%', padding: '0.75rem', backgroundColor: '#86efac', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'not-allowed', fontWeight: '600' },
    link:       { textAlign: 'center', marginTop: '1rem', color: '#6b7280', fontSize: '0.9rem' },
    linkText:   { color: '#16a34a', fontWeight: '600', textDecoration: 'none' },
};