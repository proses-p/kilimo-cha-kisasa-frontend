import api from '../api/axios';

export const adminStats = () => api.get('/admin/dashboard/stats');

export const fetchUsers = (params) => api.get('/admin/users', { params });
export const fetchUser = (id) => api.get(`/admin/users/${id}`);
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export const fetchCrops = (params) => api.get('/admin/crops', { params });
export const createCrop = (formData) => api.post('/admin/crops', formData, { headers: {'Content-Type':'multipart/form-data'} });
export const updateCrop = (id, formData) => api.post(`/admin/crops/${id}`, formData, { headers: {'Content-Type':'multipart/form-data'}, params: {_method:'PUT'} });
export const deleteCrop = (id) => api.delete(`/admin/crops/${id}`);

export const fetchTips = (params) => api.get('/admin/tips', { params });
export const createTip = (data) => api.post('/admin/tips', data);
export const updateTip = (id, data) => api.put(`/admin/tips/${id}`, data);
export const deleteTip = (id) => api.delete(`/admin/tips/${id}`);

export const fetchAnnouncements = (params) => api.get('/admin/announcements', { params });
export const createAnnouncement = (data) => api.post('/admin/announcements', data);
export const updateAnnouncement = (id, data) => api.put(`/admin/announcements/${id}`, data);
export const deleteAnnouncement = (id) => api.delete(`/admin/announcements/${id}`);
