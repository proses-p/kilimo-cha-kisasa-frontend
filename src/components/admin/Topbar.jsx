import React from 'react';

export default function Topbar(){
    return (
        <div style={{background:'#ecfdf5', padding:12, borderBottom:'1px solid #e6ffed'}}>
            <div style={{maxWidth:1100, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontWeight:700, color:'#065f46'}}>Admin Panel</div>
                <div style={{color:'#065f46'}}>Green Theme</div>
            </div>
        </div>
    );
}
