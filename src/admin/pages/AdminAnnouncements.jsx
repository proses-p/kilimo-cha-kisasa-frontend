import { useState, useEffect } from 'react';
import { fetchAnnouncements, getAdminList, createAnnouncement, deleteAnnouncement } from '../../services/adminApi';
import { useAuth } from '../../context/useAuth';
import { Navigate } from 'react-router-dom';

export default function AdminAnnouncements() {
    const { user, loading } = useAuth();
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState('');
    const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
    const [form, setForm] = useState({ title: '', message: '' });
    const [saving, setSaving] = useState(false);

    const loadAnnouncements = () => {
        setLoadingAnnouncements(true);
        setError('');
        fetchAnnouncements()
            .then(res => setAnnouncements(getAdminList(res)))
            .catch(() => setError('Imeshindwa kupakia matangazo.'))
            .finally(() => setLoadingAnnouncements(false));
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');
        try {
            await createAnnouncement({ ...form, status: 'published' });
            setForm({ title: '', message: '' });
            loadAnnouncements();
        } catch {
            setError('Imeshindwa kutuma tangazo.');
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') loadAnnouncements();
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/dashboard" />;

    return (
        <div>
            <h1>Usimamizi wa Matangazo</h1>
            <p>Orodha ya matangazo yaliyopo kwa watumiaji.</p>
            <form onSubmit={handleCreate} style={formStyle}>
                <h2 style={{ marginTop: 0 }}>Tuma tangazo jipya</h2>
                <input required value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder="Kichwa cha tangazo" style={inputStyle} />
                <textarea required value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} placeholder="Andika ujumbe wa tangazo" rows="4" style={inputStyle} />
                <button type="submit" disabled={saving} style={sendBtn}>{saving ? 'Inatuma...' : 'Tuma kwa watumiaji'}</button>
            </form>
            {error && <div style={alertStyle}>{error}</div>}
            {loadingAnnouncements ? (
                <p>Inapakia matangazo...</p>
            ) : (
                <div style={tableWrap}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Kichwa</th>
                                <th>Maelezo</th>
                                <th>Kitendo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.length === 0 ? (
                                <tr><td colSpan="4">Hakuna matangazo yaliyopatikana.</td></tr>
                            ) : announcements.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.message}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteAnnouncement(item.id).then(loadAnnouncements)}
                                            style={deleteBtn}
                                        >
                                            Futa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

const tableWrap = { overflowX:'auto', background:'#fff', borderRadius:16, padding:20, boxShadow:'0 12px 30px rgba(15,23,42,0.08)' };
const tableStyle = { width:'100%', borderCollapse:'collapse', minWidth:'680px' };
const deleteBtn = { background:'#dc2626', color:'white', border:'none', borderRadius:8, padding:'0.5rem 0.8rem', cursor:'pointer' };
const alertStyle = { background:'#fee2e2', color:'#991b1b', padding:'0.95rem 1rem', borderRadius:12, marginBottom:20 };
const formStyle = { display:'grid', gap:10, maxWidth:650, margin:'24px 0', padding:20, background:'#fff', borderRadius:16, boxShadow:'0 12px 30px rgba(15,23,42,0.08)' };
const inputStyle = { width:'100%', boxSizing:'border-box', padding:12, border:'1px solid #d1fae5', borderRadius:8, font:'inherit' };
const sendBtn = { width:'fit-content', padding:'0.65rem 1rem', border:0, borderRadius:8, background:'#065f46', color:'#fff', cursor:'pointer' };
