import { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import { Navigate } from 'react-router-dom';
import { fetchDashboard } from '../../services/adminApi';

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log(`Admin Page`)
        if (user?.role === 'admin') {
            fetchDashboard()
                .then(res => setStats(res.data.data))
                .catch(() => setError('Imeshindwa kupakia takwimu za admin.'));
        }
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/dashboard" />;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage users, crops, farming tips, announcements and farms.</p>
            {error && <div style={alertStyle}>{error}</div>}
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:20, marginTop:20}}>
                <div style={cardStyle}>
                    <h3>Watumiaji</h3>
                    <p>{stats ? stats.total_users : '...'}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Mashamba</h3>
                    <p>{stats ? stats.total_farms : '...'}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Mazao</h3>
                    <p>{stats ? stats.total_crops : '...'}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Vidokezo</h3>
                    <p>{stats ? stats.total_tips : '...'}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Matangazo</h3>
                    <p>{stats ? stats.total_announcements : '...'}</p>
                </div>
            </div>
        </div>
    );
}

const cardStyle = {
    background:'#fff',
    padding:20,
    borderRadius:8,
    boxShadow:'0 2px 4px rgba(0,0,0,0.1)',
    textAlign:'center',
    fontWeight:600,
    color:'#065f46'
};

const alertStyle = { background:'#fee2e2', color:'#991b1b', padding:'0.95rem 1rem', borderRadius:12, marginTop:20 };
