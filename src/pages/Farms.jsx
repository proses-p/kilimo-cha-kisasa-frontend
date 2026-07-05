import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';

export default function Farms() {
    const [farms, setFarms]       = useState([]);
    const [loading, setLoading]   = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editFarm, setEditFarm]   = useState(null);
    const [error, setError]         = useState('');
    const [saving, setSaving]       = useState(false);
    const [form, setForm] = useState({
        name: '', location: '', latitude: '',
        longitude: '', size_acres: '', soil_type: ''
    });

    const { user, logout } = useAuth();
    const navigate         = useNavigate();

    // ── Pakia mashamba ──
    useEffect(() => {
        fetchFarms();
    }, []);

    const fetchFarms = () => {
        setLoading(true);
        api.get('/farms')
           .then(res => setFarms(res.data.data))
           .catch(() => setError('Imeshindwa kupakia mashamba.'))
           .finally(() => setLoading(false));
    };

    // ── Fungua modal ya kuongeza ──
    const openAdd = () => {
        setEditFarm(null);
        setForm({ name: '', location: '', latitude: '', longitude: '', size_acres: '', soil_type: '' });
        setError('');
        setShowModal(true);
    };

    // ── Fungua modal ya kuhariri ──
    const openEdit = (farm, e) => {
        e.stopPropagation();
        setEditFarm(farm);
        setForm({
            name:       farm.name,
            location:   farm.location,
            latitude:   farm.latitude  || '',
            longitude:  farm.longitude || '',
            size_acres: farm.size_acres,
            soil_type:  farm.soil_type,
        });
        setError('');
        setShowModal(true);
    };

    // ── Hifadhi (ongeza au hariri) ──
    const handleSave = async () => {
        if (!form.name || !form.location || !form.size_acres || !form.soil_type) {
            setError('Jaza sehemu zote zinazohitajika.');
            return;
        }
        setSaving(true);
        setError('');
        try {
            if (editFarm) {
                await api.put(`/farms/${editFarm.id}`, form);
            } else {
                await api.post('/farms', form);
            }
            setShowModal(false);
            fetchFarms();
        } catch (err) {
            setError('Kuna tatizo. Jaribu tena.');
        } finally {
            setSaving(false);
        }
    };

    // ── Futa shamba ──
    const handleDelete = async (farm, e) => {
        e.stopPropagation();
        if (!window.confirm(`Futa "${farm.name}"? Mazao yake yote yatafutwa pia.`)) return;
        try {
            await api.delete(`/farms/${farm.id}`);
            fetchFarms();
        } catch {
            alert('Imeshindwa kufuta. Jaribu tena.');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    return (
        <div style={s.wrap}>
            {/* Navbar */}
            <nav style={s.nav}>
                <span style={s.navLogo}>🌾 Kilimo Smart</span>
                <div style={s.navRight}>
                    <span style={s.navUser}>👤 {user?.name}</span>
                    <button style={s.navBtn} onClick={() => navigate('/dashboard')}>Dashboard</button>
                    <button style={s.navOut} onClick={handleLogout}>Toka</button>
                </div>
            </nav>

            <div style={s.page}>
                {/* Header */}
                <div style={s.pageHeader}>
                    <div>
                        <h2 style={s.pageTitle}>Mashamba Yangu</h2>
                        <p style={s.pageSub}>Una mashamba {farms.length} yaliyosajiliwa</p>
                    </div>
                    <button style={s.btnBig} onClick={openAdd}>+ Ongeza Shamba</button>
                </div>

                {/* Content */}
                {loading ? (
                    <p style={s.center}>Inapakia mashamba...</p>
                ) : farms.length === 0 ? (
                    <div style={s.empty}>
                        <div style={s.emptyIcon}>🌾</div>
                        <p style={s.emptyText}>Bado huna shamba lolote.</p>
                        <button style={s.btnBig} onClick={openAdd}>Ongeza Shamba la Kwanza</button>
                    </div>
                ) : (
                    <div style={s.grid}>
                        {farms.map(farm => (
                            <div
                                key={farm.id}
                                style={s.card}
                                onClick={() => navigate(`/farms/${farm.id}`)}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#16a34a'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2f0e2'}
                            >
                                {/* Card Top */}
                                <div style={s.cardTop}>
                                    <div style={s.cardIcon}>🌾</div>
                                    <div style={s.cardActions}>
                                        <button
                                            style={s.iconBtn}
                                            title="Hariri"
                                            onClick={(e) => openEdit(farm, e)}
                                        >✏️</button>
                                        <button
                                            style={{...s.iconBtn, ...s.iconBtnDel}}
                                            title="Futa"
                                            onClick={(e) => handleDelete(farm, e)}
                                        >🗑️</button>
                                    </div>
                                </div>

                                <div style={s.cardName}>{farm.name}</div>
                                <div style={s.cardLoc}>📍 {farm.location}</div>
                                <div style={s.soilTag}>{farm.soil_type}</div>

                                <div style={s.cardDivider}></div>

                                <div style={s.cardStats}>
                                    <div style={s.cardStat}>
                                        <div style={s.cardStatN}>{farm.size_acres}</div>
                                        <div style={s.cardStatL}>Ekari</div>
                                    </div>
                                    <div style={s.cardStat}>
                                        <div style={s.cardStatN}>{farm.crops_count || 0}</div>
                                        <div style={s.cardStatL}>Mazao</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── MODAL ── */}
            {showModal && (
                <div style={s.overlay} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
                    <div style={s.modal}>
                        <h3 style={s.modalTitle}>
                            {editFarm ? '✏️ Hariri Shamba' : '🌾 Ongeza Shamba Jipya'}
                        </h3>

                        {error && <div style={s.err}>{error}</div>}

                        <div style={s.formGrid}>
                            {/* Jina */}
                            <div style={{...s.field, gridColumn: '1/-1'}}>
                                <label style={s.lbl}>Jina la Shamba *</label>
                                <input style={s.inp} placeholder="Mfano: Shamba la Kilimanjaro" value={form.name} onChange={update('name')} />
                            </div>
                            {/* Location */}
                            <div style={{...s.field, gridColumn: '1/-1'}}>
                                <label style={s.lbl}>Mkoa / Wilaya / Kijiji *</label>
                                <input style={s.inp} placeholder="Mfano: Arusha, Meru" value={form.location} onChange={update('location')} />
                            </div>
                            {/* GPS */}
                            <div style={s.field}>
                                <label style={s.lbl}>Latitude (GPS)</label>
                                <input style={s.inp} placeholder="-3.3869" value={form.latitude} onChange={update('latitude')} />
                            </div>
                            <div style={s.field}>
                                <label style={s.lbl}>Longitude (GPS)</label>
                                <input style={s.inp} placeholder="36.6830" value={form.longitude} onChange={update('longitude')} />
                            </div>
                            {/* Ukubwa */}
                            <div style={s.field}>
                                <label style={s.lbl}>Ukubwa (Ekari) *</label>
                                <input style={s.inp} type="number" placeholder="5.0" min="0.1" step="0.1" value={form.size_acres} onChange={update('size_acres')} />
                            </div>
                            {/* Udongo */}
                            <div style={s.field}>
                                <label style={s.lbl}>Aina ya Udongo *</label>
                                <select style={s.inp} value={form.soil_type} onChange={update('soil_type')}>
                                    <option value="">Chagua aina...</option>
                                    <option value="clay">Clay — Tifutifu</option>
                                    <option value="sandy">Sandy — Mchanga</option>
                                    <option value="loamy">Loamy — Tifutifu laini</option>
                                    <option value="silty">Silty — Matope</option>
                                    <option value="peaty">Peaty — Mboji</option>
                                </select>
                            </div>
                        </div>

                        <div style={s.modalFooter}>
                            <button style={s.btnCancel} onClick={() => setShowModal(false)}>Ghairi</button>
                            <button style={saving ? s.btnSaveDis : s.btnSave} onClick={handleSave} disabled={saving}>
                                {saving ? 'Inahifadhi...' : '💾 Hifadhi'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const s = {
    wrap:       { minHeight: '100vh', backgroundColor: '#f0fdf4' },
    nav:        { backgroundColor: '#0a3d1f', padding: '0.9rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    navLogo:    { color: 'white', fontWeight: '700', fontSize: '1.2rem' },
    navRight:   { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    navUser:    { color: '#bbf7d0', fontSize: '0.85rem' },
    navBtn:     { background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.35rem 0.9rem', borderRadius: '40px', cursor: 'pointer', fontSize: '0.82rem' },
    navOut:     { background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)', padding: '0.35rem 0.9rem', borderRadius: '40px', cursor: 'pointer', fontSize: '0.82rem' },
    page:       { maxWidth: '900px', margin: '0 auto', padding: '1.75rem 1.5rem' },
    pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' },
    pageTitle:  { fontSize: '1.8rem', fontWeight: '700', color: '#0a3d1f', margin: 0 },
    pageSub:    { color: '#6b7280', fontSize: '0.87rem', marginTop: '0.2rem' },
    btnBig:     { background: 'linear-gradient(135deg,#166534,#16a34a)', color: 'white', border: 'none', padding: '0.65rem 1.4rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,0.3)' },
    center:     { textAlign: 'center', color: '#6b7280', marginTop: '3rem' },
    empty:      { textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' },
    emptyIcon:  { fontSize: '4rem', marginBottom: '1rem' },
    emptyText:  { color: '#6b7280', marginBottom: '1.5rem' },
    grid:       { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.1rem' },
    card:       { background: 'white', borderRadius: '16px', padding: '1.3rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: '1.5px solid #e2f0e2', cursor: 'pointer', transition: 'border-color 0.2s', position: 'relative' },
    cardTop:    { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' },
    cardIcon:   { width: '52px', height: '52px', background: 'linear-gradient(135deg,#d1fae5,#6ee7b7)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' },
    cardActions:{ display: 'flex', gap: '0.4rem' },
    iconBtn:    { background: '#f0fdf4', border: 'none', width: '30px', height: '30px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    iconBtnDel: { background: '#fef2f2' },
    cardName:   { fontWeight: '700', color: '#0a3d1f', fontSize: '1rem', marginBottom: '0.3rem' },
    cardLoc:    { color: '#6b7280', fontSize: '0.8rem' },
    soilTag:    { display: 'inline-block', background: '#fef3c7', color: '#d97706', borderRadius: '20px', padding: '0.18rem 0.6rem', fontSize: '0.72rem', fontWeight: '700', marginTop: '0.7rem', textTransform: 'capitalize' },
    cardDivider:{ height: '1px', background: '#e2f0e2', margin: '0.9rem 0' },
    cardStats:  { display: 'flex', gap: '1.5rem' },
    cardStat:   { textAlign: 'center' },
    cardStatN:  { fontSize: '1.2rem', fontWeight: '700', color: '#0a3d1f' },
    cardStatL:  { fontSize: '0.72rem', color: '#6b7280', marginTop: '0.1rem' },
    // Modal
    overlay:    { position: 'fixed', inset: 0, background: 'rgba(10,61,31,0.45)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' },
    modal:      { background: 'white', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
    modalTitle: { fontSize: '1.3rem', fontWeight: '700', color: '#0a3d1f', marginBottom: '1.3rem' },
    err:        { background: '#fef2f2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.87rem' },
    formGrid:   { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' },
    field:      { display: 'flex', flexDirection: 'column' },
    lbl:        { fontSize: '0.78rem', fontWeight: '700', color: '#0a3d1f', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' },
    inp:        { padding: '0.75rem 1rem', border: '1.5px solid #d1fae5', borderRadius: '10px', fontSize: '0.93rem', outline: 'none', fontFamily: 'inherit', color: '#1a2e1a', background: '#fafff9' },
    modalFooter:{ display: 'flex', gap: '0.75rem', marginTop: '1.3rem', justifyContent: 'flex-end' },
    btnCancel:  { background: '#f0fdf4', border: 'none', padding: '0.65rem 1.2rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', color: '#166534' },
    btnSave:    { background: 'linear-gradient(135deg,#166534,#16a34a)', color: 'white', border: 'none', padding: '0.65rem 1.4rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' },
    btnSaveDis: { background: '#86efac', color: 'white', border: 'none', padding: '0.65rem 1.4rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '700', cursor: 'not-allowed' },
};