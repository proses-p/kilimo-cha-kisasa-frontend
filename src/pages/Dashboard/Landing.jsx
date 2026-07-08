import HeroSection from "./components/HeroSection";
import CropCards from "./components/CropCards";
{/*import WeatherWidget from "./components/WeatherWidget";*/}
{/*import StatsCards from "./components/StatsCards";*/}
import TipsSection from "./components/TipsSection";
import Navbars from "./components/Navbars";
import Footer from './components/Footer';


export default function Dashboard() {
    return (
        <div style={styles.container}>
            <HeroSection />
            <Navbars />
            <CropCards />
            {/*<WeatherWidget />*/}
           {/* <StatsCards />*/}
            <TipsSection />
            <Footer />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0px',
        width: '100%',
        padding: '0px',
        background: `
            radial-gradient(circle at 10% 0%, rgba(94, 234, 212, 0.10), transparent 40%),
            radial-gradient(circle at 90% 100%, rgba(74, 222, 128, 0.08), transparent 45%),
            linear-gradient(import HeroSection from "./components/HeroSection";
import CropCards from "./components/CropCards";
import WeatherWidget from "./components/WeatherWidget";
{/*import StatsCards from "./components/StatsCards";*/}
import TipsSection from "./components/TipsSection";
import Navbars from "./components/Navbars";
import Footer from './components/Footer';


export default function Dashboard() {
    return (
        <div style={styles.container}>
            <HeroSection />
            <Navbars />
            <CropCards />
            <WeatherWidget />
           {/* <StatsCards />*/}
            <TipsSection />
            <Footer />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0px',
        width: '100%',
        padding: '0px',
        background: '#f0fdf4',
        minHeight: '100vh'
    },
};180deg, #052e16 0%, #0b3d24 35%, #0f4c3a 65%, #0f766e 100%)
        `,
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },
};