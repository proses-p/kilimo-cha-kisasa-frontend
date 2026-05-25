import { createContext, useContext, useState, useEffect } from "react";
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // angalia kama user ameshaingia
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/me')
               .then(res => setUser(res.data.data))
               .catch(() => localStorage.removeItem('token'))
               .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);


    // register
    const register = async (data) => {
        const res = await api.post('/register', data);
        localStorage.setItem('token', res.data.data.token);
        setUser(res.data.data.user);
        return res.data;
    };

    // login
    const login = async (data) => {
        const res = await api.post('/login', data);
        localStorage.setItem('token', res.data.data.token);
        setUser(res.data.data.user);
        return res.data;
    };

    // logout
    const logout = async () => {
        await api.post('/logout');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register,login, logout }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);