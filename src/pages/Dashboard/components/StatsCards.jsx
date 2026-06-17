export default function StatsCards() {
    return (
        <div style={styles.grid}>
            <div style={styles.card}>
                <h3 style={styles.title}>Shamba Linalofaa</h3>
                <p style={styles.value}>Shamba la Mkulima A</p>
            </div>
            <div style={styles.card}>
                <h3 style={styles.title}>Msimu Bora</h3>
                <p style={styles.value}>Msimu wa Masika</p>
            </div>
        </div>
    );
}

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
    },
    card: {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '10px'
    },
    value: {
        fontSize: '1.2rem',
        color: '#16a34a'
    }
};