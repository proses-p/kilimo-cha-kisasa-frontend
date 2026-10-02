import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, ChevronRight, CloudSun, Droplets, LayoutDashboard, Leaf,
    LogOut, Menu, Plus, Sprout, Tractor, TrendingUp, UserRound, Wind, X,
    MapPinned, Bot, Sun
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';
import NotificationBell from '../components/NotificationBell';
import AIChat from '../components/AI/AIChat';
import './Dashboard.css';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, action: 'dashboard' },
    { label: 'My Farms', icon: Tractor, action: 'farms' },
    { label: 'Crops', icon: Sprout, action: 'crops', soon: true },
    { label: 'Weather', icon: CloudSun, action: 'weather', soon: true },
    { label: 'AI Assistant', icon: Bot, action: 'assistant', soon: true },
];
const chartValues = [44, 57, 48, 66, 61, 78, 72, 91, 82, 94, 86, 100];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Dashboard() {
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        api.get('/farms').then(res => setFarms(res.data.data)).finally(() => setLoading(false));
    }, []);
    const handleLogout = async () => { await logout(); navigate('/login'); };
    const totalCrops = farms.reduce((sum, farm) => sum + (farm.crops_count || 0), 0);
    const firstName = user?.name?.split(' ')[0] || 'Mkulima';
    const go = action => { setSidebarOpen(false); if (action === 'farms') navigate('/farms'); if (action === 'dashboard') navigate('/dashboard'); };

    return <div className="dashboard-shell">
        <button className={`dashboard-overlay ${sidebarOpen ? 'visible' : ''}`} aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />
        <aside className={`dashboard-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
            <div className="sidebar-brand"><span className="brand-icon"><Leaf size={19} /></span><span>Kilimo <b>Smart</b></span><button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={19} /></button></div>
            <div className="sidebar-label">Workspace</div>
            <nav className="sidebar-nav" aria-label="Dashboard navigation">{navItems.map(({ label, icon: Icon, action, soon }) => <button key={label} className={`sidebar-link ${action === 'dashboard' ? 'active' : ''}`} onClick={() => go(action)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{soon && <small>Soon</small>}</button>)}</nav>
            <div className="sidebar-spacer" />
            <div className="sidebar-tip"><div className="tip-sun"><Sun size={17} /></div><strong>Good farming starts with good insight.</strong><span>Keep your farm details up to date for better recommendations.</span></div>
            <button className="sidebar-link sidebar-profile"><span className="profile-avatar">{firstName.charAt(0)}</span><span className="profile-copy"><b>{user?.name || 'Mkulima'}</b><small>Farm owner</small></span><UserRound size={16} /></button>
            <button className="sidebar-logout" onClick={handleLogout}><LogOut size={17} /> Log out</button>
        </aside>
        <main className="dashboard-main">
            <header className="dashboard-topbar"><button className="mobile-menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={22} /></button><div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><b>Dashboard</b></div>
            <div className="topbar-actions">
    <span className="topbar-date">Friday, 11 September 2026</span>
    <AIChat />
    <div className="notification-wrap">
        <NotificationBell />
        <Bell className="notification-fallback" size={0} />
    </div>
    <button className="topbar-avatar" aria-label="Open profile">
        {firstName.charAt(0)}
    </button>
</div>
                    </header>
            <div className="dashboard-content">
                <section className="welcome-row"><div>
                    <p className="overline">YOUR FARM OVERVIEW</p>
                    <h1>Good morning, {firstName} <span>✦</span></h1>
                    <p className="welcome-copy">Here is what is happening across your farms today.</p>
                    </div><button className="primary-action" onClick={() => navigate('/farms')}><Plus size={17} /> Add new farm</button>
                    </section>
                <section className="hero-panel">
                    <div className="hero-panel-copy">
                        <span className="status-pill">
                            <span /> Season is looking good</span><h2>Small steps today,<br /><em>stronger harvests tomorrow.</em></h2><p>Stay close to your farm activity and make each growing decision count.</p><button className="hero-link" onClick={() => navigate('/farms')}>View your farms <ChevronRight size={16} /></button></div><div className="hero-panel-art"><div className="art-circle" /><img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=85" alt="Healthy green crops in a field" /></div></section>
                <section className="metrics-grid" aria-label="Farm summary"><MetricCard icon={Tractor} label="Total farms" value={farms.length} note="Registered farms" tone="green" /><MetricCard icon={Sprout} label="Active crops" value={totalCrops} note="Across all farms" tone="lime" /><MetricCard icon={TrendingUp} label="Farm activity" value="+18.4%" note="Compared to last month" tone="blue" trend /><MetricCard icon={Droplets} label="Water balance" value="Good" note="Next check in 2 days" tone="amber" /></section>
                <section className="dashboard-grid"><article className="dashboard-card activity-card"><div className="card-heading"><div><p className="card-kicker">FARM PERFORMANCE</p><h3>Growth activity</h3></div><button className="select-button">This year <ChevronRight size={15} /></button></div><div className="chart-summary"><strong>86%</strong><span><TrendingUp size={14} /> 12.8% <small>vs last year</small></span></div><div className="bar-chart" aria-label="Growth activity chart">{chartValues.map((value, index) => <div className="bar-column" key={index}><div className="bar-value" style={{ height: `${value}%` }} /><span>{months[index]}</span></div>)}</div></article><article className="dashboard-card weather-card"><div className="card-heading"><div><p className="card-kicker">TODAY'S CONDITIONS</p><h3>Farm weather</h3></div><CloudSun className="weather-icon" size={25} /></div><div className="weather-reading"><strong>24°</strong><div><b>Partly cloudy</b><span>Morogoro, Tanzania</span></div></div><div className="weather-details"><span><Droplets size={15} /> 68% humidity</span><span><Wind size={15} /> 12 km/h wind</span></div><div className="weather-footer"><span>Good conditions for field work</span><span className="weather-dot" /></div></article></section>
                <section className="farms-section"><div className="section-heading"><div><p className="card-kicker">YOUR PORTFOLIO</p><h3>My farms <span>{farms.length}</span></h3></div><button className="text-button" onClick={() => navigate('/farms')}>View all farms <ChevronRight size={16} /></button></div>{loading ? <div className="farm-loading"><span /> Loading your farms...</div> : farms.length === 0 ? <div className="empty-farms"><div><Sprout size={25} /></div><h4>Your farm story starts here.</h4><p>Add your first farm to unlock tailored insights and activity tracking.</p><button className="primary-action" onClick={() => navigate('/farms')}><Plus size={17} /> Add your first farm</button></div> : <div className="farm-list">{farms.slice(0, 3).map((farm, index) => <FarmRow key={farm.id} farm={farm} index={index} onClick={() => navigate(`/farms/${farm.id}`)} />)}</div>}</section>
            </div>
        </main>
    </div>;
}
function MetricCard({ icon: Icon, label, value, note, tone, trend }) { return <article className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={19} /></div><div className="metric-content"><span>{label}</span><strong>{value}</strong><small>{trend && <TrendingUp size={12} />} {note}</small></div><div className="metric-sparkline"><i /><i /><i /><i /><i /></div></article>; }
function FarmRow({ farm, index, onClick }) { return <button className="farm-row" onClick={onClick}><div className={`farm-thumb thumb-${index}`}><MapPinned size={19} /></div><div className="farm-row-main"><strong>{farm.name}</strong><span>{farm.location}</span></div><div className="farm-row-stat"><span>Size</span><b>{farm.size_acres} <small>acres</small></b></div><div className="farm-row-stat"><span>Active crops</span><b>{farm.crops_count || 0}</b></div><span className="farm-row-arrow"><ChevronRight size={18} /></span></button>; }
