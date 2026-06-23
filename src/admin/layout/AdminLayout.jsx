 import { Outlet, Link} from "react-router-dom";
 
 export default function AdminLayout() {
     return (
         <div style={{display:'flex', minHeight:'100vh', background:'#f7fdf7'}}>
             <div style={{width:250, background:'#ecfdf5', borderRight:'1px solid #e6ffed', padding:20}}>
                 <div style={{fontWeight:700, color:'#065f46', marginBottom:20}}>Admin Panel</div>
                 <nav>
                     <ul style={{listStyle:'none', padding:0}}>
                         <li style={{marginBottom:10}}><Link to="/admin/dashboard" style={{textDecoration:'none', color:'#065f46'}}>Dashboard</Link></li>
                         <li style={{marginBottom:10}}><Link to="/admin/users" style={{textDecoration:'none', color:'#065f46'}}>Users</Link></li>
                         <li style={{marginBottom:10}}><Link to="/admin/crops" style={{textDecoration:'none', color:'#065f46'}}>Crops</Link></li>
                         <li style={{marginBottom:10}}><Link to="/admin/farming-tips" style={{textDecoration:'none', color:'#065f46'}}>Farming Tips</Link></li>
                         <li style={{marginBottom:10}}><Link to="/admin/announcements" style={{textDecoration:'none', color:'#065f46'}}>Announcements</Link></li>
                     </ul>
                 </nav>
             </div>
             <div style={{flex:1, padding:20}}>
                 <Outlet />
             </div>
        </div>
     );
    }   