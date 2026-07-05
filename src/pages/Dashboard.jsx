import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';
import NotificationBell from '../components/NotificationBell';

export default function Dashboard() {
    const [farms, setFarms]     = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout }      = useAuth();
    const navigate              = useNavigate();

    useEffect(() => {
        api.get('/farms')
           .then(res => setFarms(res.data.data))
           .finally(() => setLoading(false));
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const totalCrops = farms.reduce((sum, farm) => sum + (farm.crops_count || 0), 0);

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <nav style={styles.nav}>
                <span style={styles.navLogo}>🌾 Kilimo Smart</span>
                <div style={styles.navRight}>
                    <span style={styles.navUser}>👤 {user?.name}</span>
                    <button
                       style={styles.navBtn}
                       onClick={() => navigate('/')}
                    >
                        Nyumbani
                    </button>
                    <NotificationBell />
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Toka
                    </button>
                </div>
            </nav>

            <div style={styles.content}>
                {/* Welcome */}
                <h2 style={styles.welcome}>
                    Habari, {user?.name?.split(' ')[0]}! 👋
                </h2>

                {/* Stats Cards */}
                <div style={styles.statsRow}>
                    <div style={styles.statCard}>
                        <div style={styles.statIcon}>🌾</div>
                        <div style={styles.statNumber}>{farms.length}</div>
                        <div style={styles.statLabel}>Mashamba</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statIcon}>🌱</div>
                        <div style={styles.statNumber}>{totalCrops}</div>
                        <div style={styles.statLabel}>Mazao</div>
                    </div>
                </div>

                {/* Farms List */}
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h3 style={styles.sectionTitle}>Mashamba Yangu</h3>
                        <button
                            onClick={() => navigate('/farms')}
                            style={styles.addBtn}
                        >
                            + Ongeza Shamba
                        </button>
                    </div>

                    {loading ? (
                        <p style={styles.loading}>Inapakia...</p>
                    ) : farms.length === 0 ? (
                        <div style={styles.empty}>
                            <p>🌱 Bado huna shamba.</p>
                            <button
                                onClick={() => navigate('/farms')}
                                style={styles.addBtn}
                            >
                                Ongeza Shamba la Kwanza
                            </button>
                        </div>
                    ) : (
                        <div style={styles.farmsGrid}>
                            {farms.map(farm => (
                                <div
                                    key={farm.id}
                                    style={styles.farmCard}
                                    onClick={() => navigate(`/farms/${farm.id}`)}
                                >
                                    <div style={styles.farmIcon}>🌾</div>
                                    <div style={styles.farmInfo}>
                                        <h4 style={styles.farmName}>{farm.name}</h4>
                                        <p style={styles.farmLocation}>📍 {farm.location}</p>
                                        <p style={styles.farmDetails}>
                                            📐 {farm.size_acres} ekari &nbsp;|&nbsp; 🌱 {farm.crops_count} mazao
                                        </p>
                                    </div>
                                    <span style={styles.arrow}>›</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container:     { minHeight: '100vh', backgroundColor: '#f0fdf4' },
    nav:           { backgroundColor: '#166534', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    navLogo:       { color: 'white', fontWeight: '700', fontSize: '1.2rem' },
    navRight:      { display: 'flex', alignItems: 'center', gap: '1rem' },
    navUser:       { color: '#bbf7d0', fontSize: '0.9rem' },
    logoutBtn:     { backgroundColor: 'transparent', border: '1px solid #bbf7d0', color: '#bbf7d0', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' },
    content:       { maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' },
    welcome:       { color: '#166534', marginBottom: '1.5rem' },
    statsRow:      { display: 'flex', gap: '1rem', marginBottom: '2rem' },
    statCard:      { flex: 1, backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    statIcon:      { fontSize: '2rem' },
    statNumber:    { fontSize: '2rem', fontWeight: '700', color: '#166534' },
    statLabel:     { color: '#6b7280', fontSize: '0.9rem' },
    section:       { backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
    sectionTitle:  { color: '#166534', margin: 0 },
    addBtn:        { backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
    loading:       { textAlign: 'center', color: '#6b7280' },
    empty:         { textAlign: 'center', padding: '2rem', color: '#6b7280' },
    farmsGrid:     { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    farmCard:      { display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #d1fae5', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.2s' },
    farmIcon:      { fontSize: '2rem', marginRight: '1rem' },
    farmInfo:      { flex: 1 },
    farmName:      { margin: '0 0 0.25rem', color: '#166534', fontWeight: '600' },
    farmLocation:  { margin: '0 0 0.25rem', color: '#6b7280', fontSize: '0.85rem' },
    farmDetails:   { margin: 0, color: '#6b7280', fontSize: '0.85rem' },
    arrow:         { fontSize: '1.5rem', color: '#16a34a' },
};