import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { fetchUsers, updateUser, deleteUser } from '../../services/adminApi';

export default function AdminUsers(){
    const [users,setUsers] = useState(null);
    const [q,setQ] = useState('');

    const load = () => {
        fetchUsers({ q }).then(res=> setUsers(res.data.data)).catch(()=>{});
    };

    useEffect(()=>{ load(); },[]);

    const handleSearch = (e) => {
        e.preventDefault();
        load();
    };

    const handleRoleChange = (id, role) => {
        updateUser(id, { role }).then(()=> load());
    };

    const handleDelete = (id) => {
        if (!confirm('Delete user?')) return;
        deleteUser(id).then(()=> load());
    };

    return (
        <AdminLayout>
            <h1 style={{color:'#065f46'}}>Users</h1>
            <form onSubmit={handleSearch} style={{marginBottom:12}}>
                <input placeholder="Search users" value={q} onChange={e=>setQ(e.target.value)} />
                <button>Search</button>
            </form>

            {!users ? <div>Loading...</div> : (
                <table style={{width:'100%', background:'#fff', borderRadius:8}}>
                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                    <tbody>
                        {users.data.map(u=> (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <select value={u.role} onChange={e=> handleRoleChange(u.id, e.target.value)}>
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={()=> handleDelete(u.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
}
