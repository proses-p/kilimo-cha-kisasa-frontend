import { useState, useEffect } from 'react';
import { fetchFarms, deleteFarm } from '../../services/adminApi';
import { useAuth } from '../../context/useAuth';
import { Navigate } from 'react-router-dom';

export default function AdminFarms() {
    const { user, loading } = useAuth();
    const [farms, setFarms] = useState([]);
    const [error, setError] = useState('');
    const [loadingFarms, setLoadingFarms] = useState(false);

    useEffect(() => {
        if (user?.role === 'admin') loadFarms();
    }, [user]);

    const loadFarms = () => {
        setLoadingFarms(true);
        fetchFarms()
            .then(res => setFarms(res.data.data))
            .catch(() => setError('Imeshindwa kupakia mashamba.'))
            .finally(() => setLoadingFarms(false));
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/dashboard" />;

    return (
        <div>
            <h1>Usimamizi wa Mashamba</h1>
            <p>Orodha ya mashamba ya watumiaji.</p>
            {error && <div style={alertStyle}>{error}</div>}
            {loadingFarms ? (
                <p>Inapakia mashamba...</p>
            ) : (
                <div style={tableWrap}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Jina</th>
                                <th>Mtumiaji</th>
                                <th>Mahali</th>
                                <th>Udongo</th>
                                <th>Ukubwa</th>
                                <th>Kitendo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {farms.map(farm => (
                                <tr key={farm.id}>
                                    <td>{farm.id}</td>
                                    <td>{farm.name}</td>
                                    <td>{farm.user?.name || '—'}</td>
                                    <td>{farm.location}</td>
                                    <td>{farm.soil_type}</td>
                                    <td>{farm.size_acres}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteFarm(farm.id).then(loadFarms)}
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
