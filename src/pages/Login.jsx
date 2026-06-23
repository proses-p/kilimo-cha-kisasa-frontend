import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';


export default function Login() {
    const [form, setForm] = useState({ email: '', password: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const { user, loading: authLoading } = useAuth();
    console.log(user);

    if (!authLoading && user) {
        return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        // client-side validations similar to register page
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
            setError('Barua pepe si sahihi');
            setLoading(false);
            return;
        }

        if (!form.password || form.password.length < 8) {
            setError('Nywila lazima iwe angalau herufi 8');
            setLoading(false);
            return;
        }

        try {
            const res = await login(form);

            console.log(res.data.data.user);
            console.log(res.data.data.user.role);
            setShowSuccessToast(true);
            // delay navigation by 3 seconds
            setTimeout(() => {
            
                if (user.role === 'admin') {
                    navigate('/admin');
                    return;
                } else {
                    navigate('/dashboard');
                }

            }, 3000);
        } catch (err) {
            console.log(err.response?.data);
            setError('Barua pepe au nywila si sahihi');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={styles.container}>
            {showSuccessToast && (
                <Toast 
                    message="Umeingia kikamilifu! ✓" 
                    type="success" 
                    duration={3000}
                    onClose={() => setShowSuccessToast(false)} 
                />
            )}
            <div style={styles.card}>
    

                <div style={styles.logo}>

                </div>
                <h2 style={styles.title}>Kilimo smart</h2>
                <p style={styles.subtitle}>Ingia kwenye akaunti yako</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Email(Barua pepe)</label>
                        <input 
                            type="email"
                            style={styles.input}
                            placeholder="proses@kilimo.co.tz"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                            required
                             />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password(nywila)</label>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                style={styles.input}
                                placeholder="........"
                                value={form.password}
                                onChange={e => setForm({...form, password: e.target.value})}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(s => !s)}
                                style={{marginLeft: 8, cursor: 'pointer', background: 'transparent', border: 'none'}}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <button 
                         type="submit"
                         style={loading ? styles.btnDisabled : styles.btn}
                         disabled={loading}
                         >
                        {loading ? 'Inaingia...' : 'Ingia'}
                    </button>
                </form>

                <p style={styles.link}>
                    Huna akaunti?{''}
                    <Link to="/register" style={styles.linkText}>
                        Jisajili hapa
                    </Link>
                    
                </p>
            </div>
        </div>
    );
}


const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0fdf4'
    },

    card: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
        width: '100%',
        maxWidth: '400px'
    },

    logo: {
        fontSize: '3rem',
        textAlign: 'center'
    },

    title: {
        textAlign: 'center',
        color: '#166534',
        margin: '0.5rem 0'
    },

    subtitle: {
        textAlign: 'center',
        color: '#6b7280',
        marginBottom: '1.5rem'
    },

    error: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        padding: '0.75rem',
        borderRadius: '8px',
        marginBottom: '1rem',
        fontSize: '0.9rem'
    },

    field: {
        marginBottom: '1rem'
    },

    label: {
        display: 'block',
        marginBottom: '0.4rem',
        color: '#374151',
        fontWeight: '600', 
        fontSize: '0.9rem'
    },

    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #d1fae5',
        borderRadius: '8px',
        fontSize: '1rem',
        boxSizing: 'border-box',
        outline: 'none'
    },

    btn: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#16a34a',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: '600'
    },

    btnDisabled: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#86efac',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem', 
        cursor: 'not-allowed',
        fontWeight: '600'
    },

    link: {
        textAlign: 'center',
        marginTop: '1rem',
        color: '#6b7280',
        fontSize: '0.9rem'
    },

    linkText: {
        color: '#16a34a',
        fontWeight: '600',
        textDecoration: 'none'
    },

};

