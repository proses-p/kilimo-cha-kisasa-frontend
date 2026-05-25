import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

export default function Register() {
    const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '', password_confirmation: '' });
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const { register }          = useAuth();
    const navigate              = useNavigate();

    const { user, loading: authLoading } = useAuth();

    if (!authLoading && user) return <Navigate to="/dashboard" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (form.password !== form.password_confirmation) {
            setError('Nywila hazilingani!');
            setLoading(false);
            return;
        }

        try {
            await register(form);
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

    const update = (field) => (e) => setForm({...form, [field]: e.target.value});

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
                    ].map(({ label, field, type, placeholder }) => (
                        <div key={field} style={styles.field}>
                            <label style={styles.label}>{label}</label>
                            <input
                                type={type}
                                style={styles.input}
                                placeholder={placeholder}
                                value={form[field]}
                                onChange={update(field)}
                                required={field !== 'phone'}
                            />
                        </div>
                    ))}

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