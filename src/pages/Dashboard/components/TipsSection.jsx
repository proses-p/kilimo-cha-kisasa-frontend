import { useState, useEffect } from 'react';

const tips = [
    'Fanya uchunguzi wa udongo kabla ya kupanda.',
    'Matumizi ya mbolea bora kwa mimea yako.',
    'Kulima kwa kutumia teknolojia ya kisasa.',
    'Kufuata hali ya hewa ili kupanga shughuli zako za kilimo.'
];

export default function TipsSection() {
    const [tipIndex, setTipIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const cycle = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setTipIndex(prev => (prev + 1) % tips.length);
                setVisible(true);
            }, 450);
        }, 3000);

        return () => clearInterval(cycle);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.glow}></div>

            <h2 style={styles.title}>Vidokezo vya Kilimo Bora</h2>

            <div style={styles.featuredWrap}>
                <span style={styles.featuredLabel}>Kidokezo cha Leo</span>
                <span
                    style={{
                        ...styles.featuredTip,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0px)' : 'translateY(6px)'
                    }}
                >
                    {tips[tipIndex]}
                </span>
            </div>

            <ul style={styles.list}>
                <li style={styles.listItem}>
                    <span style={styles.bullet}>🌱</span>
                    Fanya uchunguzi wa udongo kabla ya kupanda.
                </li>
                <li style={styles.listItem}>
                    <span style={styles.bullet}>🌾</span>
                    Matumizi ya mbolea bora kwa mimea yako.
                </li>
                <li style={styles.listItem}>
                    <span style={styles.bullet}>💧</span>
                    Kulima kwa kutumia teknolojia ya kisasa.
                </li>
                <li style={styles.listItem}>
                    <span style={styles.bullet}>☀️</span>
                    Kufuata hali ya hewa ili kupanga shughuli zako za kilimo.
                </li>
            </ul>
        </div>
    );
}

const styles = {
    container: {
        background: `
            radial-gradient(circle at 90% 0%, rgba(94, 234, 212, 0.16), transparent 45%),
            linear-gradient(135deg, #052e16 0%, #14532d 50%, #0f766e 100%)
        `,
        padding: '32px 24px',
        fontSize: '14px',
        borderRadius: 'px',
        boxShadow: '0 20px 45px rgba(4, 47, 30, 0.4), inset 0 1px 0 rgba(94, 234, 212, 0.08)',
        border: '1px solid rgba(94, 234, 212, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },

    glow: {
        position: 'absolute',
        top: '-70px',
        right: '-60px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.2), transparent 70%)',
        filter: 'blur(6px)',
        pointerEvents: 'none'
    },

    title: {
        fontSize: '1.5rem',
        marginBottom: '18px',
        fontWeight: '500',
        letterSpacing: '0.2px',
        background: 'linear-gradient(90deg, #bbf7d0 0%, #5eead4 60%, #99f6e4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        position: 'relative',
        zIndex: 1
    },

    featuredWrap: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 18px',
        borderRadius: '999px',
        background: 'linear-gradient(90deg, rgba(20, 83, 45, 0.6), rgba(15, 118, 110, 0.6))',
        border: '1px solid rgba(94, 234, 212, 0.25)',
        marginBottom: '22px',
        position: 'relative',
        zIndex: 1,
        maxWidth: '100%',
        boxSizing: 'border-box'
    },

    featuredLabel: {
        fontSize: '0.78rem',
        fontWeight: '400',
        color: '#6ee7b7',
        letterSpacing: '0.4px',
        whiteSpace: 'nowrap'
    },

    featuredTip: {
        fontSize: '0.85rem',
        fontWeight: '500',
        color: '#d1fae5',
        transition: 'opacity 0.45s ease, transform 0.45s ease'
    },

    list: {
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        fontSize: '14px',
        paddingLeft: '0px',
        listStyleType: 'none',
        position: 'relative',
        zIndex: 1,
        margin: 0
    },

    listItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        color: '#a7f3d0',
        fontWeight: '400',
        lineHeight: '1.6',
        padding: '10px 14px',
        borderRadius: '10px',
        marginBottom: '6px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(94, 234, 212, 0.1)'
    },

    bullet: {
        fontSize: '1rem',
        lineHeight: '1.4',
        flexShrink: 0
    }
};