import { useState, useEffect } from 'react';
import { fetchAnnouncements, deleteAnnouncement } from '../../services/adminApi';
import { useAuth } from '../../context/useAuth';
import { Navigate } from 'react-router-dom';

export default function AdminAnnouncements() {
    const { user, loading } = useAuth();
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState('');
    const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);

    useEffect(() => {
        if (user?.role === 'admin') loadAnnouncements();
    }, [user]);

    const loadAnnouncements = () => {
        setLoadingAnnouncements(true);
        fetchAnnouncements()
            .then(res => setAnnouncements(res.data.data))
            .catch(() => setError('Imeshindwa kupakia matangazo.'))
            .finally(() => setLoadingAnnouncements(false));
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/dashboard" />;

    return (
        <div>
            <h1>Usimamizi wa Matangazo</h1>
            <p>Orodha ya matangazo yaliyopo kwa watumiaji.</p>
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
                            {announcements.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
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
