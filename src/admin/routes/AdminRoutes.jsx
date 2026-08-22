import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import AdminUsers from '../pages/AdminUsers';
import AdminFarms from '../pages/AdminFarms';
import AdminCrops from '../pages/AdminCrops';
import AdminFarmingTips from '../pages/AdminFarmingTips';
import AdminAnnouncements from '../pages/AdminAnnouncements';

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="*" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="farms" element={<AdminFarms />} />
                <Route path="crops" element={<AdminCrops />} />
                <Route path="farming-tips" element={<AdminFarmingTips />} />
                <Route path="announcements" element={<AdminAnnouncements />} />
            </Route>
        </Routes>

        
    );
}