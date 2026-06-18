import HeroSection from "./components/HeroSection";
import CropCards from "./components/CropCards";
import WeatherWidget from "./components/WeatherWidget";
import StatsCards from "./components/StatsCards";
import TipsSection from "./components/TipsSection";
import Navbars from "./components/Navbars";

export default function Dashboard() {
    return (
        <div style={styles.container}>
            <HeroSection />
            <Navbars />
            <CropCards />
            <WeatherWidget />
            <StatsCards />
            <TipsSection />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        background: '#f0fdf4',
        minHeight: '100vh'
    },
};