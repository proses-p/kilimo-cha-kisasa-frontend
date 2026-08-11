import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import Login      from './pages/Login';
import Register   from './pages/Register';
import Landing  from './pages/Dashboard/Landing';
import Farms      from './pages/Farms';
import FarmDetail from './pages/FarmDetail';
import Dashboard  from './pages/Dashboard';
import AdminRoutes from './admin/routes/AdminRoutes';
import AIChat from './components/AI/AIChat';
    
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem', color: '#166534' }}>🌾 Inapakia...</div>;
    return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
    const { user, loading } = useAuth();

    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/farms"
                    element={
                        <ProtectedRoute>
                            <Farms />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/farms/:id"
                    element={
                        <ProtectedRoute>
                            <FarmDetail />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <AdminRoutes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>

            {!loading && user && <AIChat />}
        </>
    );
};

export default function App() {
    return (
        
        <AuthProvider>
            <BrowserRouter>
                <AppContent/>
            </BrowserRouter>
        </AuthProvider>
    );
}