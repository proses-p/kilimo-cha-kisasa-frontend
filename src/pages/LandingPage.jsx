import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
               <div style={styles.links}>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
               </div> 

                  
            </div>

            <div style={styles.body}>
                <p>Kilimo cha kisasa, ni platform inayomwezesha mtumiaji kuwa na uwezo wa kuchagua kwa usahihi<br></br>
                zao kwa aina ya udongo wa shamba, kilimo cha kisasa ni teknologia inayolenga<br/>
                kukuza uchumi binafsi na wa ujumla kupitia kilimo na ufugaji<br></br>
                inatoa elimo kamili juu ya namna ya kulima na kufuga.<br></br>
                karibu.</p>
            </div>

        </div>
    );
   
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f0fdf4',

    },
    
    header: {
        padding: '20px',
        backgroundColor: '#166534',
    },

    links: {
        gap: '1rem',
        right: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
    },
     body: {
        padding: '15px',
        gap: '1rem',
        
     }
}