import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';
import NotificationBell from '../components/NotificationBell';
import { FaHome } from "react-icons/fa";

export default function Dashboard() {
    const [farms, setFarms]     = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout }      = useAuth();
    const navigate              = useNavigate();

       const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    useEffect(() => {
        api.get('/farms')
           .then(res => setFarms(res.data.data))
           .finally(() => setLoading(false));
    }, []);

 

    const totalCrops = farms.reduce((sum, farm) => sum + (farm.crops_count || 0), 0);

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <nav style={styles.nav}>
                <span style={styles.navLogo}>🌾 Kilimo Smart</span>
                <div style={styles.navRight}>
                    <span style={styles.navUser}>👤 {user?.name}</span>
                    <button
                       className="ks-navbtn"
                       style={styles.navBtn}
                       title='Nyumbani'
                       onClick={() => navigate('/')}
                    >
                        <FaHome />
                    </button>
                    <NotificationBell />
                    <button onClick={handleLogout} className="ks-logoutbtn" style={styles.logoutBtn}>
                        Toka
                    </button>
                </div>
            </nav>

            <div style={styles.content}>
                {/* Welcome */}
                <h2 style={styles.welcome}>
                    Habari, {user?.name?.split(' ')[0]}! 
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
                    {/*<div style={styles.sectionHeader}>
                        <h3 style={styles.sectionTitle}>Mashamba Yangu</h3>
                        <button
                            onClick={() => navigate('/farms')}
                            className="ks-addbtn"
                            style={styles.addBtn}
                        >
                            + Ongeza Shamba
                        </button>
                    </div> */}

                    {loading ? (
                        <p style={styles.loading}>Inapakia...</p>
                    ) : farms.length === 0 ? (
                        <div style={styles.empty}>
                            <p>🌱 Bado huna shamba.</p>
                            <button
                                onClick={() => navigate('/farms')}
                                className="ks-addbtn"
                                style={styles.addBtn}
                            >
                                Ongeza Shamba
                            </button>
                        </div>
                    ) : (
                        <div style={styles.farmsGrid}>
                            {farms.map(farm => (
                                <div
                                    key={farm.id}
                                    className="ks-farmcard"
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

            {/* Decorative gradient glows — purely visual, no effect on logic */}
            <div style={styles.glowTop}></div>
            <div style={styles.glowBottom}></div>

            <style>{`
                * { box-sizing: border-box; }

                .ks-navbtn, .ks-logoutbtn, .ks-addbtn {
                    transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
                }
                .ks-navbtn:hover, .ks-addbtn:hover {
                    transform: translateY(-1px);
                    filter: brightness(1.08);
                    box-shadow: 0 8px 18px rgba(13, 148, 136, 0.35);
                }
                .ks-logoutbtn:hover {
                    background: rgba(94, 234, 212, 0.12) !important;
                    transform: translateY(-1px);
                }

                .ks-farmcard {
                    transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.25s ease;
                }
                .ks-farmcard:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 14px 30px rgba(4, 47, 30, 0.4);
                    border-color: rgba(94, 234, 212, 0.35) !important;
                }
            `}</style>
        </div>
    );
}

const styles = {
    container:     {
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: `
            radial-gradient(circle at 12% 8%, rgba(94, 234, 212, 0.10), transparent 40%),
            radial-gradient(circle at 88% 92%, rgba(74, 222, 128, 0.08), transparent 45%),
            linear-gradient(180deg, #052e16 0%, #0b3d24 35%, #0f4c3a 65%, #0f766e 100%)
        `,
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },
    nav:           {
        background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #0f766e 100%)',
        borderBottom: '1px solid rgba(94, 234, 212, 0.15)',
        boxShadow: '0 6px 18px rgba(4, 47, 30, 0.35)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        position: 'relative',
        zIndex: 2
    },
    navLogo:       { color: '#ecfdf5', fontWeight: '500', fontSize: '1.15rem', letterSpacing: '0.2px' },
    navRight:      { display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' },
    navUser:       { color: '#a7f3d0', fontSize: '0.88rem', fontWeight: '400' },
    navBtn:        {
        background: 'rgba(94, 234, 212, 0.1)',
        border: '1px solid rgba(94, 234, 212, 0.3)',
        color: '#d1fae5',
        padding: '0.45rem 1rem',
        borderRadius: '999px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: '400'
    },
    logoutBtn:     {
        backgroundColor: 'transparent',
        border: '1px solid #5eead4',
        color: '#5eead4',
        padding: '0.45rem 1.1rem',
        borderRadius: '999px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: '400'
    },
    content:       { maxWidth: '800px', margin: '0 auto', padding: '2.5rem 1.25rem', position: 'relative', zIndex: 2 },
    welcome:       { color: '#ecfdf5', marginBottom: '1.75rem', fontWeight: '500', fontSize: '1.4rem', letterSpacing: '0.2px' },
    statsRow:      { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
    statCard:      {
        flex: '1 1 140px',
        background: 'linear-gradient(160deg, rgba(20, 83, 45, 0.55), rgba(15, 118, 110, 0.4))',
        border: '1px solid rgba(94, 234, 212, 0.18)',
        padding: '1.6rem 1rem',
        borderRadius: '16px',
        textAlign: 'center',
        boxShadow: '0 14px 32px rgba(4, 47, 30, 0.35)'
    },
    statIcon:      { fontSize: '2rem' },
    statNumber:    { fontSize: '2rem', fontWeight: '500', color: '#5eead4' },
    statLabel:     { color: '#a7f3d0', fontSize: '0.88rem', fontWeight: '400' },
    section:       {
        background: 'linear-gradient(160deg, rgba(20, 83, 45, 0.45), rgba(15, 118, 110, 0.3))',
        border: '1px solid rgba(94, 234, 212, 0.15)',
        borderRadius: '18px',
        padding: '1.75rem',
        boxShadow: '0 18px 40px rgba(4, 47, 30, 0.35)'
    },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' },
    sectionTitle:  { color: '#ecfdf5', margin: 0, fontWeight: '500', fontSize: '1.15rem' },
    addBtn:        {
        background: 'linear-gradient(90deg, #16a34a 0%, #0d9488 100%)',
        color: '#ecfdf5',
        border: 'none',
        padding: '0.6rem 1.2rem',
        borderRadius: '999px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '0.9rem',
        boxShadow: '0 8px 18px rgba(13, 148, 136, 0.3)',
        whiteSpace: 'nowrap'
    },
    loading:       { textAlign: 'center', color: '#a7f3d0', fontWeight: '400' },
    empty:         { textAlign: 'center', padding: '2rem', color: '#a7f3d0', fontWeight: '400' },
    farmsGrid:     { display: 'flex', flexDirection: 'column', gap: '0.85rem' },
    farmCard:      {
        display: 'flex',
        alignItems: 'center',
        padding: '1.1rem',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(94, 234, 212, 0.14)',
        borderRadius: '14px',
        cursor: 'pointer'
    },
    farmIcon:      { fontSize: '2rem', marginRight: '1rem' },
    farmInfo:      { flex: 1 },
    farmName:      { margin: '0 0 0.3rem', color: '#ecfdf5', fontWeight: '500' },
    farmLocation:  { margin: '0 0 0.25rem', color: '#a7f3d0', fontSize: '0.85rem', fontWeight: '400' },
    farmDetails:   { margin: 0, color: '#a7f3d0', fontSize: '0.85rem', fontWeight: '400' },
    arrow:         { fontSize: '1.5rem', color: '#5eead4' },

    glowTop: {
        position: 'absolute', top: '-100px', left: '-80px', width: '260px', height: '260px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(94, 234, 212, 0.14), transparent 70%)',
        filter: 'blur(8px)', pointerEvents: 'none', zIndex: 1
    },
    glowBottom: {
        position: 'absolute', bottom: '-120px', right: '-90px', width: '300px', height: '300px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(74, 222, 128, 0.12), transparent 70%)',
        filter: 'blur(8px)', pointerEvents: 'none', zIndex: 1
    },
};