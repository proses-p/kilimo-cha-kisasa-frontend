import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Topbar from '../../components/admin/Topbar';

export default function AdminLayout({ children }){
    return (
        <div style={{display:'flex', minHeight:'100vh', background:'#f7fdf7'}}>
            <Sidebar />
            <div style={{flex:1}}>
                <Topbar />
                <main style={{padding:20}}>{children}</main>
            </div>
        </div>
    );
}
