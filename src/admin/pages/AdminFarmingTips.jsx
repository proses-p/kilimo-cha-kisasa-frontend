import { useState, useEffect } from 'react';
import { fetchFarmingTips, getAdminList, deleteFarmingTip } from '../../services/adminApi';
import { useAuth } from '../../context/useAuth';
import { Navigate } from 'react-router-dom';

export default function AdminFarmingTips() {
    const { user, loading } = useAuth();
    const [tips, setTips] = useState([]);
    const [error, setError] = useState('');
    const [loadingTips, setLoadingTips] = useState(false);

    const loadTips = () => {
        setLoadingTips(true);
        setError('');
        fetchFarmingTips()
            .then(res => setTips(getAdminList(res)))
            .catch(() => setError('Imeshindwa kupakia vidokezo.'))
            .finally(() => setLoadingTips(false));
    };

    useEffect(() => {
        if (user?.role === 'admin') loadTips();
    }, [user]);

    

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/dashboard" />;

    return (
        <div>
            <h1>Usimamizi wa Vidokezo</h1>
            <p>Orodha ya vidokezo vya kilimo.</p>
            {error && <div style={alertStyle}>{error}</div>}
            {loadingTips ? (
                <p>Inapakia vidokezo...</p>
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
                            {tips.length === 0 ? (
                                <tr><td colSpan="4">Hakuna vidokezo vilivyopatikana.</td></tr>
                            ) : tips.map(tip => (
                                <tr key={tip.id}>
                                    <td>{tip.id}</td>
                                    <td>{tip.title}</td>
                                    <td>{tip.body}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteFarmingTip(tip.id).then(loadTips)}
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
