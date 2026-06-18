import { Link } from 'react-router-dom';

export default function Navbars() {
    return (
        <nav style={styles.navbar}>
            <div style={styles.auth}>
                <Link to="/login" style={styles.link}>
                    Login
                </Link>
                <Link to="/register" style={styles.link}>
                    Register
                </Link>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
    },
    auth: {
        display: 'flex',
        gap: '1rem',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
    },      
};