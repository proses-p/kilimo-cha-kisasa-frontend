import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        api.get('/notifications')
            .then(res => setNotifications(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setShow(!show)}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.5rem'
                }}
            >
                🔔 ({notifications.length})
            </button>

            {show && (
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: '40px',
                        width: '300px',
                        background: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        padding: '10px',
                        zIndex: 1000
                    }}
                >
                    <h4>Notifications</h4>

                    {notifications.length === 0 ? (
                        <p>Hakuna notifications.</p>
                    ) : (
                        notifications.map(notification => (
                            <div
                                key={notification.id}
                                style={{
                                    padding: '10px',
                                    borderBottom: '1px solid #eee'
                                }}
                            >
                                <strong>
                                    {notification.data.title}
                                </strong>

                                <p>
                                    {notification.data.message}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}