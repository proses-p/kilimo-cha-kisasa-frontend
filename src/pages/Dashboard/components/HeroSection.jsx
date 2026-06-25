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
        background: '#1a3a0e',
        color: 'white',
        padding: '40px 20px',
        borderRadius: '8px',
        textAlign: 'center'
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '10px'
    },
    subtitle: {
        fontSize: '1.2rem'
    }
};