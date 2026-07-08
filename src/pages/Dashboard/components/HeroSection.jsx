export default function HeroSection() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Karibu kwenye Kilimo cha Kisasa</h1>
            <p style={styles.subtitle}>Pata taarifa za hali ya hewa, takwimu za kilimo, na vidokezo vya kilimo bora, kwa teknolojia ya kisasa.</p>
        </div>
    );
}

const styles = {
    container: {
        background: 'linear-gradient(135deg, #052e16 0%, #14532d 45%, #0f766e 100%)',
        color: '#ecfdf5',
        padding: '56px 28px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(4, 47, 30, 0.45), inset 0 1px 0 rgba(94, 234, 212, 0.08)',
        border: '1px solid rgba(94, 234, 212, 0.15)',
        position: 'relative',
        overflow: 'hidden'
    },
    title: {
        fontSize: '2.1rem',
        marginBottom: '14px',
        fontWeight: '500',
        letterSpacing: '0.3px',
        lineHeight: '1.3',
        background: 'linear-gradient(90deg, #bbf7d0 0%, #5eead4 60%, #99f6e4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },
    subtitle: {
        fontSize: '1.05rem',
        fontWeight: '400',
        color: '#a7f3d0',
        lineHeight: '1.7',
        maxWidth: '560px',
        margin: '0 auto',
        letterSpacing: '0.2px',
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }
};