import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar(){
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <aside style={{width:240, background:'#064e3b', color:'#fff', padding:20}}>
            <h2 style={{color:'#bbf7d0'}}>Kilimo Admin</h2>
            <nav style={{marginTop:20}}>
                <div style={{marginBottom:10}}><NavLink to="/admin" style={{color:'#d1fae5', textDecoration:'none'}}>Dashboard</NavLink></div>
                <div style={{marginBottom:10}}><NavLink to="/admin/users" style={{color:'#d1fae5', textDecoration:'none'}}>Users</NavLink></div>
                <div style={{marginBottom:10}}><NavLink to="/admin/crops" style={{color:'#d1fae5', textDecoration:'none'}}>Crops</NavLink></div>
                <div style={{marginBottom:10}}><NavLink to="/admin/tips" style={{color:'#d1fae5', textDecoration:'none'}}>Farming Tips</NavLink></div>
                <div style={{marginBottom:10}}><NavLink to="/admin/announcements" style={{color:'#d1fae5', textDecoration:'none'}}>Announcements</NavLink></div>
                <div style={{marginTop:30}}><button onClick={handleLogout} style={{background:'#10b981', color:'#fff', border:'none', padding:'8px 12px', borderRadius:6}}>Logout</button></div>
            </nav>
        </aside>
    );
}
