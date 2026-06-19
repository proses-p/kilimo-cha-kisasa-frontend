import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { adminStats } from '../../services/adminApi';

export default function AdminDashboard(){
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        adminStats().then(res=> setStats(res.data.data)).catch(()=>{}).finally(()=>setLoading(false));
    },[]);

    if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <h1 style={{color:'#065f46'}}>Dashboard</h1>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12}}>
                <div style={{background:'#fff', padding:12, borderRadius:8}}>Total Users: <strong>{stats.total_users}</strong></div>
                <div style={{background:'#fff', padding:12, borderRadius:8}}>Total Crops: <strong>{stats.total_crops}</strong></div>
                <div style={{background:'#fff', padding:12, borderRadius:8}}>Total Tips: <strong>{stats.total_tips}</strong></div>
                <div style={{background:'#fff', padding:12, borderRadius:8}}>Total Announcements: <strong>{stats.total_announcements}</strong></div>
            </div>

            <h3 style={{marginTop:20}}>Recent Users</h3>
            <div style={{display:'grid', gap:8}}>
                {stats.recent_users.map(u=> (
                    <div key={u.id} style={{background:'#fff', padding:8, borderRadius:6}}>{u.name} — {u.email}</div>
                ))}
            </div>
        </AdminLayout>
    );
}
