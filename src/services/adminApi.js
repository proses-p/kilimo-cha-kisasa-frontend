import api from '../api/axios';

export const getAdminList = (response) => {
	const data = response?.data?.data;
	return Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
};

export const fetchDashboard = () => api.get('/admin/dashboard/stats');

export const fetchUsers = (params) => api.get('/admin/users', { params });
export const fetchUser = (id) => api.get(`/admin/users/${id}`);
export const createUser = (data) => api.post('/admin/users', data);
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export const fetchFarms = (params) => api.get('/admin/farms', { params });
export const createFarm = (data) => api.post('/admin/farms', data);
export const updateFarm = (id, data) => api.put(`/admin/farms/${id}`, data);
export const deleteFarm = (id) => api.delete(`/admin/farms/${id}`);

export const fetchCrops = (params) => api.get('/admin/crops', { params });
export const createCrop = (data) => api.post('/admin/crops', data);
export const updateCrop = (id, data) => api.put(`/admin/crops/${id}`, data);
export const deleteCrop = (id) => api.delete(`/admin/crops/${id}`);

export const fetchFarmingTips = (params) => api.get('/admin/tips', { params });
export const createTip = (data) => api.post('/admin/tips', data);
export const updateTip = (id, data) => api.put(`/admin/tips/${id}`, data);
export const deleteFarmingTip = (id) => api.delete(`/admin/tips/${id}`);

export const fetchAnnouncements = (params) => api.get('/admin/announcements', { params });
export const createAnnouncement = (data) => api.post('/admin/announcements', data);
export const updateAnnouncement = (id, data) => api.put(`/admin/announcements/${id}`, data);
export const deleteAnnouncement = (id) => api.delete(`/admin/announcements/${id}`);

