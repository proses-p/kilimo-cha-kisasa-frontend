export default function TipsSection() {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Vidokezo vya Kilimo Bora</h2>
            <ul style={styles.list}>
                <li>Fanya uchunguzi wa udongo kabla ya kupanda.</li>
                <li>Matumizi ya mbolea bora kwa mimea yako.</li>
                <li>Kulima kwa kutumia teknolojia ya kisasa.</li>
                <li>Kufuata hali ya hewa ili kupanga shughuli zako za kilimo.</li>
            </ul>
        </div>
    );
}

const styles = {
    container: {
        background: 'white',
        padding: '20px',
        fontSize: '14px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '10px'
    },
    list: {
        fontFamily: 'apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
        fontSize: '14px',
        color: '#16a34a',
        paddingLeft: '20px',
        listStyleType: 'none'

    }
};