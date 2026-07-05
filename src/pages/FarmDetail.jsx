import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';

export default function FarmDetail() {
    const { id }       = useParams();
    const navigate     = useNavigate();
    const { user, logout } = useAuth();

    const [farm, setFarm]         = useState(null);
    const [weather, setWeather]   = useState(null);
    const [loading, setLoading]   = useState(true);
    const [wxLoading, setWxLoading] = useState(true);

    // Crop modal
    const [showCropModal, setShowCropModal] = useState(false);
    const [cropForm, setCropForm] = useState({ crop_name: '', planting_date: '', harvest_date: '', status: 'planted', notes: '' });
    const [cropSaving, setCropSaving] = useState(false);

    // Activity modal
    const [showActModal, setShowActModal]   = useState(false);
    const [selectedCropId, setSelectedCropId] = useState('');
    const [actForm, setActForm] = useState({ activity_type: '', description: '', activity_date: '' });
    const [actSaving, setActSaving] = useState(false);

    const [error, setError] = useState('');

    useEffect(() => {
        fetchFarm();
        fetchWeather();
    }, [id]);

    const fetchFarm = () => {
        setLoading(true);
        api.get(`/farms/${id}`)
           .then(res => setFarm(res.data.data))
           .catch(() => navigate('/farms'))
           .finally(() => setLoading(false));
    };

    const fetchWeather = () => {
        setWxLoading(true);
        api.get(`/farms/${id}/weather`)
           .then(res => setWeather(res.data.data))
           .catch(() => setWeather(null))
           .finally(() => setWxLoading(false));
    };

    // ── Ongeza Zao ──
    const handleAddCrop = async () => {
        if (!cropForm.crop_name || !cropForm.planting_date) {
            setError('Jaza jina la zao na tarehe ya kupanda.');
            return;
        }
        setCropSaving(true);
        setError('');
        try {
            await api.post(`/farms/${id}/crops`, cropForm);
            setShowCropModal(false);
            setCropForm({ crop_name: '', planting_date: '', harvest_date: '', status: 'planted', notes: '' });
            fetchFarm();
        } catch { setError('Kuna tatizo. Jaribu tena.'); }
        finally { setCropSaving(false); }
    };

    // ── Ongeza Shughuli ──
    const openActModal = (cropId) => {
        setSelectedCropId(cropId);
        setActForm({ activity_type: '', description: '', activity_date: '' });
        setError('');
        setShowActModal(true);
    };

    const handleAddActivity = async () => {
        if (!actForm.activity_type || !actForm.activity_date) {
            setError('Chagua aina ya shughuli na tarehe.');
            return;
        }
        setActSaving(true);
        setError('');
        try {
            await api.post(`/crops/${selectedCropId}/activities`, actForm);
            setShowActModal(false);
            fetchFarm();
        } catch { setError('Kuna tatizo. Jaribu tena.'); }
        finally { setActSaving(false); }
    };

    // ── Futa Zao ──
    const handleDeleteCrop = async (crop) => {
        if (!window.confirm(`Futa zao "${crop.crop_name}"?`)) return;
        try {
            await api.delete(`/farms/${id}/crops/${crop.id}`);
            fetchFarm();
        } catch { alert('Imeshindwa kufuta.'); }
    };

    const handleLogout = async () => { await logout(); navigate('/login'); };

    if (loading) return <div style={s.loadWrap}><p>🌾 Inapakia shamba...</p></div>;
    if (!farm)   return null;

    const allActivities = farm.crops?.flatMap(c =>
        (c.activities || []).map(a => ({ ...a, crop_name: c.crop_name }))
    ).sort((a, b) => new Date(b.activity_date) - new Date(a.activity_date)) || [];

    const statusLabel = { planted: '🟡 Imepandwa', growing: '🟢 Inakua', harvested: '🔵 Imevunwa', failed: '🔴 Imeshindwa' };
    const statusStyle = { planted: s.sPlanted, growing: s.sGrowing, harvested: s.sHarvested, failed: s.sFailed };
    const actIcon     = { watering: '💧', fertilizing: '🧪', weeding: '🌿', spraying: '🌱', pruning: '✂️' };

    return (
        <div style={s.wrap}>
            {/* Navbar */}
            <nav style={s.nav}>
                <span style={s.navLogo}>🌾 Kilimo Smart</span>
                <div style={s.navRight}>
                    <span style={s.navUser}>👤 {user?.name}</span>
                    <button style={s.navBtn} onClick={() => navigate('/farms')}>← Mashamba</button>
                    <button style={s.navOut} onClick={handleLogout}>Toka</button>
                </div>
            </nav>

            <div style={s.page}>

                {/* Farm Hero */}
                <div style={s.hero}>
                    <div style={s.heroTitle}>{farm.name}</div>
                    <div style={s.heroMeta}>
                        <span>📍 {farm.location}</span>
                        <span>📐 {farm.size_acres} ekari</span>
                        <span>🪨 {farm.soil_type}</span>
                        <span>🌱 {farm.crops?.length || 0} mazao</span>
                    </div>
                </div>

                {/* ── WEATHER CARD ── */}
                <div style={s.wxCard}>
                    {wxLoading ? (
                        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Inapakia hali ya hewa...</p>
                    ) : !weather ? (
                        <div>
                            <div style={s.wxLoc}>⛅ Hali ya Hewa</div>
                            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                Hewa haipatikani. Hakikisha shamba lina GPS coordinates (latitude na longitude).
                            </p>
                        </div>
                    ) : (
                        <>
                            <div style={s.wxTop}>
                                <div>
                                    <div style={s.wxLoc}>⛅ Hali ya Hewa — {weather.location}</div>
                                    <div style={s.wxTemp}>{weather.temperature?.current}°C</div>
                                    <div style={s.wxDesc}>{weather.description}</div>
                                </div>
                                <img
                                    src={weather.icon_url}
                                    alt="weather"
                                    style={{ width: '80px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
                                />
                            </div>
                            <div style={s.wxDivider}></div>
                            <div style={s.wxStats}>
                                <div style={s.wxStat}><div style={s.wxStatV}>{weather.humidity}%</div><div style={s.wxStatL}>💧 Unyevu</div></div>
                                <div style={s.wxStat}><div style={s.wxStatV}>{weather.wind_speed} m/s</div><div style={s.wxStatL}>💨 Upepo</div></div>
                                <div style={s.wxStat}><div style={s.wxStatV}>{weather.rain} mm</div><div style={s.wxStatL}>🌧️ Mvua</div></div>
                                <div style={s.wxStat}><div style={s.wxStatV}>{weather.temperature?.max}°C</div><div style={s.wxStatL}>🌡️ Juu</div></div>
                            </div>
                            <div style={s.wxAdvice}>{weather.farming_advice}</div>
                        </>
                    )}
                </div>

                {/* ── MAZAO ── */}
                <div style={s.card}>
                    <div style={s.cardHdr}>
                        <div style={s.cardTitle}>🌱 Mazao ya Shamba</div>
                        <button style={s.btnAdd} onClick={() => { setError(''); setShowCropModal(true); }}>+ Ongeza Zao</button>
                    </div>
                    {!farm.crops?.length ? (
                        <p style={s.empty}>Bado huna mazao. Ongeza zao la kwanza!</p>
                    ) : (
                        <div style={s.cropsGrid}>
                            {farm.crops.map(crop => (
                                <div key={crop.id} style={s.cropCard}>
                                    <div style={s.cropCardTop}>
                                        <div style={s.cropIcon}>🌱</div>
                                        <button
                                            style={s.delBtn}
                                            onClick={() => handleDeleteCrop(crop)}
                                            title="Futa zao"
                                        >🗑️</button>
                                    </div>
                                    <div style={s.cropName}>{crop.crop_name}</div>
                                    <div style={s.cropDate}>Kupandwa: {new Date(crop.planting_date).toLocaleDateString('sw-TZ')}</div>
                                    <div><span style={{ ...s.status, ...statusStyle[crop.status] }}>{statusLabel[crop.status]}</span></div>
                                    {crop.harvest_date && (
                                        <div style={s.cropHvst}>🗓️ Kuvuna: {new Date(crop.harvest_date).toLocaleDateString('sw-TZ')}</div>
                                    )}
                                    <button
                                        style={s.actBtn}
                                        onClick={() => openActModal(crop.id)}
                                    >+ Shughuli</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── SHUGHULI ── */}
                <div style={s.card}>
                    <div style={s.cardHdr}>
                        <div style={s.cardTitle}>📋 Shughuli za Hivi Karibuni</div>
                    </div>
                    {!allActivities.length ? (
                        <p style={s.empty}>Bado hakuna shughuli zilizorekodiwa.</p>
                    ) : (
                        <div style={s.actList}>
                            {allActivities.slice(0, 8).map(act => (
                                <div key={act.id} style={s.actItem}>
                                    <div style={s.actDot}>{actIcon[act.activity_type] || '📋'}</div>
                                    <div style={s.actInfo}>
                                        <div style={s.actType}>{act.activity_type} — {act.crop_name}</div>
                                        {act.description && <div style={s.actMeta}>{act.description}</div>}
                                    </div>
                                    <div style={s.actDate}>{new Date(act.activity_date).toLocaleDateString('sw-TZ')}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {/* ── CROP MODAL ── */}
            {showCropModal && (
                <div style={s.overlay} onClick={e => { if (e.target === e.currentTarget) setShowCropModal(false); }}>
                    <div style={s.modal}>
                        <h3 style={s.modalTitle}>🌱 Ongeza Zao Jipya</h3>
                        {error && <div style={s.err}>{error}</div>}
                        <div style={s.field}><label style={s.lbl}>Jina la Zao *</label><input style={s.inp} placeholder="Mfano: Mahindi" value={cropForm.crop_name} onChange={e => setCropForm({...cropForm, crop_name: e.target.value})} /></div>
                        <div style={s.field}><label style={s.lbl}>Tarehe ya Kupanda *</label><input style={s.inp} type="date" value={cropForm.planting_date} onChange={e => setCropForm({...cropForm, planting_date: e.target.value})} /></div>
                        <div style={s.field}><label style={s.lbl}>Tarehe ya Kuvuna (inatarajiwa)</label><input style={s.inp} type="date" value={cropForm.harvest_date} onChange={e => setCropForm({...cropForm, harvest_date: e.target.value})} /></div>
                        <div style={s.field}>
                            <label style={s.lbl}>Hali ya Zao</label>
                            <select style={s.inp} value={cropForm.status} onChange={e => setCropForm({...cropForm, status: e.target.value})}>
                                <option value="planted">🟡 Imepandwa</option>
                                <option value="growing">🟢 Inakua</option>
                                <option value="harvested">🔵 Imevunwa</option>
                                <option value="failed">🔴 Imeshindwa</option>
                            </select>
                        </div>
                        <div style={s.field}><label style={s.lbl}>Maelezo (optional)</label><textarea style={{...s.inp, resize:'vertical', minHeight:'70px'}} placeholder="Maelezo ya ziada..." value={cropForm.notes} onChange={e => setCropForm({...cropForm, notes: e.target.value})} /></div>
                        <div style={s.modalFooter}>
                            <button style={s.btnCancel} onClick={() => setShowCropModal(false)}>Ghairi</button>
                            <button style={cropSaving ? s.btnSaveDis : s.btnSave} onClick={handleAddCrop} disabled={cropSaving}>{cropSaving ? 'Inahifadhi...' : '💾 Hifadhi'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── ACTIVITY MODAL ── */}
            {showActModal && (
                <div style={s.overlay} onClick={e => { if (e.target === e.currentTarget) setShowActModal(false); }}>
                    <div style={s.modal}>
                        <h3 style={s.modalTitle}>📋 Ongeza Shughuli</h3>
                        {error && <div style={s.err}>{error}</div>}
                        <div style={s.field}>
                            <label style={s.lbl}>Aina ya Shughuli *</label>
                            <select style={s.inp} value={actForm.activity_type} onChange={e => setActForm({...actForm, activity_type: e.target.value})}>
                                <option value="">Chagua...</option>
                                <option value="watering">💧 Kumwagilia</option>
                                <option value="fertilizing">🧪 Kuweka Mbolea</option>
                                <option value="weeding">🌿 Kupalilia</option>
                                <option value="spraying">🌱 Kunyunyizia Dawa</option>
                                <option value="pruning">✂️ Kupogoa</option>
                            </select>
                        </div>
                        <div style={s.field}><label style={s.lbl}>Tarehe ya Shughuli *</label><input style={s.inp} type="date" value={actForm.activity_date} onChange={e => setActForm({...actForm, activity_date: e.target.value})} /></div>
                        <div style={s.field}><label style={s.lbl}>Maelezo (optional)</label><textarea style={{...s.inp, resize:'vertical', minHeight:'70px'}} placeholder="Mfano: Lita 50 za maji..." value={actForm.description} onChange={e => setActForm({...actForm, description: e.target.value})} /></div>
                        <div style={s.modalFooter}>
                            <button style={s.btnCancel} onClick={() => setShowActModal(false)}>Ghairi</button>
                            <button style={actSaving ? s.btnSaveDis : s.btnSave} onClick={handleAddActivity} disabled={actSaving}>{actSaving ? 'Inahifadhi...' : '💾 Hifadhi'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const s = {
    wrap:       { minHeight: '100vh', backgroundColor: '#f0fdf4' },
    loadWrap:   { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#166534' },
    nav:        { backgroundColor: '#0a3d1f', padding: '0.9rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    navLogo:    { color: 'white', fontWeight: '700', fontSize: '1.2rem' },
    navRight:   { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    navUser:    { color: '#bbf7d0', fontSize: '0.85rem' },
    navBtn:     { background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.35rem 0.9rem', borderRadius: '40px', cursor: 'pointer', fontSize: '0.82rem' },
    navOut:     { background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)', padding: '0.35rem 0.9rem', borderRadius: '40px', cursor: 'pointer', fontSize: '0.82rem' },
    page:       { maxWidth: '880px', margin: '0 auto', padding: '1.75rem 1.5rem' },
    // Hero
    hero:       { background: 'linear-gradient(135deg,#0a3d1f,#166534)', borderRadius: '18px', padding: '2rem', color: 'white', marginBottom: '1.4rem' },
    heroTitle:  { fontSize: '1.85rem', fontWeight: '700', marginBottom: '0.5rem' },
    heroMeta:   { display: 'flex', gap: '1.4rem', flexWrap: 'wrap', fontSize: '0.87rem', opacity: 0.85 },
    // Weather
    wxCard:     { background: 'linear-gradient(135deg,#0284c7,#0ea5e9,#38bdf8)', borderRadius: '18px', padding: '1.6rem', color: 'white', marginBottom: '1.4rem', boxShadow: '0 8px 28px rgba(14,165,233,0.35)' },
    wxTop:      { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' },
    wxLoc:      { fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8, marginBottom: '0.3rem' },
    wxTemp:     { fontSize: '3.5rem', fontWeight: '700', lineHeight: 1 },
    wxDesc:     { opacity: 0.88, fontSize: '0.9rem', textTransform: 'capitalize', marginTop: '0.1rem' },
    wxDivider:  { height: '1px', background: 'rgba(255,255,255,0.2)', margin: '1rem 0' },
    wxStats:    { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem' },
    wxStat:     { background: 'rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.6rem', textAlign: 'center' },
    wxStatV:    { fontWeight: '700', fontSize: '0.95rem' },
    wxStatL:    { fontSize: '0.68rem', opacity: 0.75, marginTop: '0.1rem' },
    wxAdvice:   { background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '0.8rem 1rem', fontSize: '0.84rem', marginTop: '1rem', border: '1px solid rgba(255,255,255,0.2)' },
    // Card
    card:       { background: 'white', borderRadius: '16px', padding: '1.4rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: '1.4rem' },
    cardHdr:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem' },
    cardTitle:  { fontSize: '1.05rem', fontWeight: '700', color: '#0a3d1f' },
    btnAdd:     { background: '#16a34a', color: 'white', border: 'none', padding: '0.42rem 0.95rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' },
    empty:      { color: '#6b7280', fontSize: '0.9rem', textAlign: 'center', padding: '1.5rem 0' },
    // Crops
    cropsGrid:  { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '0.9rem' },
    cropCard:   { border: '1.5px solid #e2f0e2', borderRadius: '14px', padding: '1.1rem', background: '#fafff9' },
    cropCardTop:{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
    cropIcon:   { fontSize: '1.8rem' },
    delBtn:     { background: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', padding: '0.2rem 0.4rem' },
    cropName:   { fontWeight: '700', color: '#0a3d1f', fontSize: '0.93rem' },
    cropDate:   { color: '#6b7280', fontSize: '0.76rem', marginTop: '0.15rem' },
    status:     { display: 'inline-block', marginTop: '0.55rem', padding: '0.18rem 0.65rem', borderRadius: '20px', fontSize: '0.73rem', fontWeight: '700' },
    sPlanted:   { background: '#fef3c7', color: '#92400e' },
    sGrowing:   { background: '#dcfce7', color: '#166534' },
    sHarvested: { background: '#dbeafe', color: '#1d4ed8' },
    sFailed:    { background: '#fef2f2', color: '#dc2626' },
    cropHvst:   { color: '#6b7280', fontSize: '0.75rem', marginTop: '0.35rem' },
    actBtn:     { width: '100%', marginTop: '0.75rem', background: '#f0fdf4', border: '1px solid #d1fae5', color: '#166534', borderRadius: '8px', padding: '0.35rem', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' },
    // Activities
    actList:    { display: 'flex', flexDirection: 'column', gap: '0.55rem' },
    actItem:    { display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.7rem 1rem', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #e2f0e2' },
    actDot:     { width: '38px', height: '38px', borderRadius: '10px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
    actInfo:    { flex: 1 },
    actType:    { fontWeight: '600', fontSize: '0.87rem', color: '#0a3d1f', textTransform: 'capitalize' },
    actMeta:    { fontSize: '0.76rem', color: '#6b7280', marginTop: '0.1rem' },
    actDate:    { fontSize: '0.76rem', color: '#6b7280', whiteSpace: 'nowrap' },
    // Modal
    overlay:    { position: 'fixed', inset: 0, background: 'rgba(10,61,31,0.45)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' },
    modal:      { background: 'white', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '460px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' },
    modalTitle: { fontSize: '1.2rem', fontWeight: '700', color: '#0a3d1f', marginBottom: '1.3rem' },
    err:        { background: '#fef2f2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.87rem' },
    field:      { marginBottom: '1rem' },
    lbl:        { display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#0a3d1f', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' },
    inp:        { width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1fae5', borderRadius: '10px', fontSize: '0.93rem', outline: 'none', fontFamily: 'inherit', color: '#1a2e1a', background: '#fafff9', boxSizing: 'border-box' },
    modalFooter:{ display: 'flex', gap: '0.75rem', marginTop: '1.3rem', justifyContent: 'flex-end' },
    btnCancel:  { background: '#f0fdf4', border: 'none', padding: '0.65rem 1.2rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', color: '#166534' },
    btnSave:    { background: 'linear-gradient(135deg,#166534,#16a34a)', color: 'white', border: 'none', padding: '0.65rem 1.4rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' },
    btnSaveDis: { background: '#86efac', color: 'white', border: 'none', padding: '0.65rem 1.4rem', borderRadius: '10px', fontSize: '0.9rem', cursor: 'not-allowed', fontWeight: '700' },
};