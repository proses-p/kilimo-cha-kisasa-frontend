import { useState, useEffect } from 'react';
import { fetchCrops, deleteCrop } from '../../services/adminApi';
import { useAuth } from '../../context/useAuth';
import { Navigate } from 'react-router-dom';

export default function AdminCrops() {
    const { user, loading } = useAuth();
    const [crops, setCrops] = useState([]);
    const [error, setError] = useState('');
    const [loadingCrops, setLoadingCrops] = useState(false);

    const loadCrops = async () => {
        setLoadingCrops(true);
        try {
            const res = await fetchCrops();
            console.log("Response:", res.data);
            setCrops(res.data.data);
        } catch {
            setError('Imeshindwa kupakia mazao.');
        } finally {
            setLoadingCrops(false);
        }
    };

    useEffect(() => {
        if (user?.role !== 'admin') return;

        const fetchData = async () => {
            setLoadingCrops(true);
            try {
                const res = await fetchCrops();
                console.log("Response:", res.data);
                setCrops(res.data.data);
            } catch {
                setError('Imeshindwa kupakia mazao.');
            } finally {
                setLoadingCrops(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/dashboard" />;

    return (
        <div>
            <h1>Usimamizi wa Mazao</h1>
            <p>Orodha ya mazao yaliyopo.</p>
            {error && <div style={alertStyle}>{error}</div>}
            {loadingCrops ? (
                <p>Inapakia mazao...</p>
            ) : (
                <div style={tableWrap}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Jina</th>
                                <th>Maelezo</th>
                                <th>Kiasi</th>
                                <th>Kujibu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {crops.map(crop => (
                                <tr key={crop.id}>
                                    <td>{crop.id}</td>
                                    <td>{crop.name}</td>
                                    <td>{crop.description}</td>
                                    <td>{crop.quantity || '—'}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteCrop(crop.id).then(loadCrops)}
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
