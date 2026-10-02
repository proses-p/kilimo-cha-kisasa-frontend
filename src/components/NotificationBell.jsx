import { useEffect, useRef, useState } from 'react';
import { Bell, Check, X } from 'lucide-react';
import api from '../api/axios';
import './NotificationBell.css';

export default function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [show, setShow] = useState(false);
    const panelRef = useRef(null);

    const loadNotifications = () => {
        api.get('/notifications')
            .then(res => setNotifications(Array.isArray(res.data) ? res.data : []))
            .catch(() => setNotifications([]));
    };

    useEffect(() => {
        loadNotifications();
        const interval = window.setInterval(loadNotifications, 15000);
        return () => window.clearInterval(interval);
    }, []);

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) setShow(false);
        };
        document.addEventListener('mousedown', closeOnOutsideClick);
        return () => document.removeEventListener('mousedown', closeOnOutsideClick);
    }, []);

    const markAsRead = async (id) => {
        setNotifications(current => current.filter(notification => notification.id !== id));
        try { await api.patch(`/notifications/${id}/read`); } catch { loadNotifications(); }
    };

    return (
        <div className="notification-bell" ref={panelRef}>
            <button className="notification-button" onClick={() => setShow(current => !current)} aria-label={`Notifications, ${notifications.length} unread`} aria-expanded={show}>
                <Bell size={20} aria-hidden="true" />
                {notifications.length > 0 && <span className="notification-count">{notifications.length > 99 ? '99+' : notifications.length}</span>}
            </button>
            {show && <section className="notification-panel" aria-label="Notifications">
                <div className="notification-panel-header">
                    <div><h3>Notifications</h3><span>{notifications.length} unread</span></div>
                    <button className="notification-close" onClick={() => setShow(false)} aria-label="Close notifications"><X size={17} /></button>
                </div>
                <div className="notification-list">
                    {notifications.length === 0 ? <div className="notification-empty"><Check size={20} /><p>Hakuna notifications mpya.</p></div> : notifications.map(notification => (
                        <article className="notification-item" key={notification.id}>
                            <div className="notification-item-icon"><Bell size={16} /></div>
                            <div className="notification-item-content">
                                <strong>{notification.data?.title || 'Tangazo jipya'}</strong>
                                <p>{notification.data?.message || ''}</p>
                                <button className="notification-read" onClick={() => markAsRead(notification.id)}>Mark as read</button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>}
        </div>
    );
}
