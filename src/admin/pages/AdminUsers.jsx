import { useState, useEffect } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../../services/adminApi';
import { useAuth } from '../../context/useAuth';
import { Navigate } from 'react-router-dom';

export default function AdminUsers() {
    const { user, loading } = useAuth();
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchUsersList = () => {
        setLoadingUsers(true);
        fetchUsers({ q: query, page })
            .then(res => setUsers(res.data.data))
            .catch(() => setError('Imeshindwa kupakia watumiaji.'))
            .finally(() => setLoadingUsers(false));
    };
        if (user?.role === 'admin') fetchUsersList();
    }, [user, page, query]);

    

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/dashboard" />;

    return (
        <div>
            <h1>Usimamizi wa Watumiaji</h1>
            <p>Orodha ya watumiaji wote iliyosajiliwa.</p>
            <div style={{ marginBottom: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Tafuta jina au barua pepe"
                    style={{ padding: 10, borderRadius: 8, border: '1px solid #d1fae5', flex: 1 }}
                />
            </div>
            {error && <div style={alertStyle}>{error}</div>}
            {loadingUsers ? (
                <p>Inapakia watumiaji...</p>
            ) : (
                <div style={tableWrap}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Jina</th>
                                <th>Email</th>
                                <th>Simu</th>
                                <th>Daraja</th>
                                <th>Active</th>
                                <th>Kitendo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.phone || '—'}</td>
                                    <td>{u.role}</td>
                                    <td>{u.is_active ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteUser(u.id).then(fetchUsersList)}
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
const tableStyle = { width:'100%', borderCollapse:'collapse', minWidth: '680px' };
const deleteBtn = { background:'#dc2626', color:'white', border:'none', borderRadius:8, padding:'0.5rem 0.8rem', cursor:'pointer' };
const alertStyle = { background:'#fee2e2', color:'#991b1b', padding:'0.95rem 1rem', borderRadius:12, marginBottom:20 };
