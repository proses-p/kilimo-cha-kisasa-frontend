import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
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
        return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} />;
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
            console.log("LOGIN RESULT", res);
            const role = (res.data.data.user?.role ?? res.data.data.role ?? '').toLowerCase();

            setShowSuccessToast(true);
            setTimeout(() => {
                if (role === 'admin') {
                    navigate('/admin/dashboard');
                    return;
                }
                navigate('/dashboard');
            }, 3000);
        } catch (err) {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
            console.log("FULL ERROR:", err);

            setError(
                err.response?.data?.message ||
                "Server Error"
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={styles.container}>
            {/* Decorative gradient blobs — purely visual, no logic impact */}
            <div style={styles.blobOne}></div>
            <div style={styles.blobTwo}></div>

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
                    <span style={styles.logoIcon}>🌿</span>
                </div>
                <h2 style={styles.title}>Kilimo smart</h2>
                <p style={styles.subtitle}>Ingia kwenye akaunti yako</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Email(Barua pepe)</label>
                        <input 
                            type="email"
                            className="ks-input"
                            style={styles.input}
                            placeholder="proses@kilimo.co.tz"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                            required
                             />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password(nywila)</label>
                        <div style={styles.passwordRow}>
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                className="ks-input"
                                style={styles.input}
                                placeholder="........"
                                value={form.password}
                                onChange={e => setForm({...form, password: e.target.value})}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(s => !s)}
                                style={styles.eyeBtn}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <button 
                         type="submit"
                         className="ks-btn"
                         style={loading ? styles.btnDisabled : styles.btn}
                         disabled={loading}
                         >
                        {loading ? 'Inaingia...' : 'Ingia'}
                    </button>
                </form>

                <p style={styles.link}>
                    Huna akaunti?{' '}
                    <Link to="/register" style={styles.linkText}>
                        Jisajili hapa
                    </Link>
                    
                </p>
            </div>

            {/* Scoped styles for focus/hover states that inline styles can't express.
                Purely presentational — does not touch component logic. */}
            <style>{`
                * { font-family: 'Inter', 'Segoe UI', sans-serif; }

                .ks-input {
                    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
                }
                .ks-input:focus {
                    border-color: #34d399 !important;
                    box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.15);
                    background: #ffffff !important;
                }
                .ks-input::placeholder {
                    color: #a3a3a3;
                    font-weight: 400;
                }

                .ks-btn {
                    transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
                }
                .ks-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(16, 163, 74, 0.35);
                    filter: brightness(1.03);
                }
                .ks-btn:active:not(:disabled) {
                    transform: translateY(0);
                }

                @keyframes floatBlob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, -25px) scale(1.05); }
                }
            `}</style>
        </div>
    );
}


const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 45%, #e6fffa 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '1.5rem',
        boxSizing: 'border-box'
    },

    blobOne: {
        position: 'absolute',
        top: '-120px',
        left: '-100px',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(74, 222, 128, 0.35), rgba(16, 185, 129, 0.05) 70%)',
        filter: 'blur(10px)',
        animation: 'floatBlob 10s ease-in-out infinite',
        pointerEvents: 'none'
    },

    blobTwo: {
        position: 'absolute',
        bottom: '-140px',
        right: '-110px',
        width: '360px',
        height: '360px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 60% 60%, rgba(45, 212, 191, 0.30), rgba(5, 150, 105, 0.05) 70%)',
        filter: 'blur(10px)',
        animation: 'floatBlob 12s ease-in-out infinite reverse',
        pointerEvents: 'none'
    },

    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '2.5rem 2rem',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 20px 45px rgba(6, 78, 59, 0.12), 0 2px 8px rgba(6, 78, 59, 0.06)',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        zIndex: 1
    },

    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 0.5rem'
    },

    logoIcon: {
        fontSize: '2.6rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '68px',
        height: '68px',
        borderRadius: '18px',
        background: 'linear-gradient(135deg, #bbf7d0 0%, #99f6e4 100%)',
        boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)'
    },

    title: {
        textAlign: 'center',
        background: 'linear-gradient(90deg, #15803d 0%, #0d9488 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        margin: '0.75rem 0 0.25rem',
        fontSize: '1.6rem',
        fontWeight: '500',
        letterSpacing: '0.2px'
    },

    subtitle: {
        textAlign: 'center',
        color: '#6b7280',
        marginBottom: '1.75rem',
        fontSize: '0.92rem',
        fontWeight: '400'
    },

    error: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        padding: '0.75rem 1rem',
        borderRadius: '10px',
        marginBottom: '1.1rem',
        fontSize: '0.88rem',
        border: '1px solid #fecaca',
        fontWeight: '400'
    },

    field: {
        marginBottom: '1.15rem'
    },

    label: {
        display: 'block',
        marginBottom: '0.4rem',
        color: '#374151',
        fontWeight: '500',
        fontSize: '0.85rem'
    },

    passwordRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem'
    },

    input: {
        width: '100%',
        padding: '0.8rem 0.9rem',
        border: '1.5px solid #d1fae5',
        borderRadius: '10px',
        fontSize: '0.95rem',
        boxSizing: 'border-box',
        outline: 'none',
        backgroundColor: '#f9fefb',
        color: '#1f2937',
        fontWeight: '400'
    },

    eyeBtn: {
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        fontSize: '1.1rem',
        padding: '0.4rem',
        lineHeight: 1,
        flexShrink: 0
    },

    btn: {
        width: '100%',
        padding: '0.85rem',
        background: 'linear-gradient(90deg, #16a34a 0%, #0d9488 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '0.98rem',
        cursor: 'pointer',
        fontWeight: '500',
        marginTop: '0.35rem',
        boxShadow: '0 6px 16px rgba(16, 163, 74, 0.25)'
    },

    btnDisabled: {
        width: '100%',
        padding: '0.85rem',
        background: 'linear-gradient(90deg, #a7f3d0 0%, #99f6e4 100%)',
        color: '#f0fdf4',
        border: 'none',
        borderRadius: '10px',
        fontSize: '0.98rem',
        cursor: 'not-allowed',
        fontWeight: '500',
        marginTop: '0.35rem'
    },

    link: {
        textAlign: 'center',
        marginTop: '1.4rem',
        color: '#6b7280',
        fontSize: '0.88rem',
        fontWeight: '400'
    },

    linkText: {
        color: '#0d9488',
        fontWeight: '500',
        textDecoration: 'none',
        marginLeft: '4px'
    },

};








