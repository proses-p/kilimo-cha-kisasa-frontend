import { Link } from 'react-router-dom';

export default function Navbars() {
    return (
        <nav style={styles.navbar}>
            <div style={styles.auth}>
                <Link to="/login" className="nb-link" style={styles.link}>
                    Login
                </Link>
                <Link to="/register" className="nb-link" style={styles.link}>
                    Register
                </Link>
            </div>

            <style>{`
                .nb-link {
                    transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
                }
                .nb-link:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 18px rgba(13, 148, 136, 0.35);
                    filter: brightness(1.05);
                }
                .nb-link:active {
                    transform: translateY(0);
                }

                @media (max-width: 480px) {
                    .nb-auth-row {
                        justify-content: center !important;
                    }
                    .nb-link {
                        flex: 1 1 auto;
                        text-align: center;
                        padding: 0.55rem 0.9rem !important;
                        font-size: 0.9rem !important;
                    }
                }
            `}</style>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '0.9rem 1.25rem',
        background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #0f766e 100%)',
        borderBottom: '1px solid rgba(94, 234, 212, 0.15)',
        boxShadow: '0 6px 18px rgba(4, 47, 30, 0.3)',
        boxSizing: 'border-box',
        width: '100%',
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },
    auth: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '0.7rem',
        maxWidth: '100%'
    },
    link: {
        textDecoration: 'none',
        color: '#ecfdf5',
        background: 'linear-gradient(90deg, #16a34a 0%, #0d9488 100%)',
        padding: '0.65rem 1.4rem',
        borderRadius: '999px',
        fontSize: '0.95rem',
        fontWeight: '500',
        letterSpacing: '0.2px',
        whiteSpace: 'nowrap',
        boxShadow: '0 6px 14px rgba(13, 148, 136, 0.25)',
        boxSizing: 'border-box'
    },
};