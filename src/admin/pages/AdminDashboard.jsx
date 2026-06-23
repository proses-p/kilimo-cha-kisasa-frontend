import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";


export default function AdminDashboard() {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!user) return <Navigate to="/login" />;

    if (user.role !== 'admin') return <Navigate to="/dashboard" />;
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage users, crops, farming tips, and announcements.</p>


            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:20, marginTop:20}}>
                <div style={cardStyle}>Users</div>
                <div style={cardStyle}>Crops</div>
                <div style={cardStyle}>Farming Tips</div>
                <div style={cardStyle}>Announcements</div>

            </div>
        </div>
    );
}

const cardStyle = {
    background:'#fff',
    padding:20,
    borderRadius:8,
    boxShadow:'0 2px 4px rgba(0,0,0,0.1)',
    textAlign:'center',
    fontWeight:600,
    color:'#065f46'
};