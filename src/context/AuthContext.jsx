import { createContext, useState, useEffect } from "react";
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token')));

    const normalizeUser = (payload) => {
        if (!payload) return null;
        const baseUser = payload.user ?? payload;
        if (!baseUser) return null;

        return {
            ...baseUser,
            role: typeof baseUser.role === 'string' ? baseUser.role.toLowerCase() : baseUser.role,
        };
    };

    // angalia kama user ameshaingia
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        let isMounted = true;

        api.get('/me')
           .then(res => {
               if (isMounted) setUser(normalizeUser(res.data.data));
           })
           .catch(() => localStorage.removeItem('token'))
           .finally(() => {
               if (isMounted) setLoading(false);
           });

        return () => {
            isMounted = false;
        };
    }, []);

    // register
    const register = async (data) => {
        const res = await api.post('/register', data);
        localStorage.setItem('token', res.data.data.token);
        setUser(normalizeUser(res.data.data));
        return res.data;
    };

    // login
    const login = async (data) => {
        console.log("LOGIN PAYLOAD SENT 👉", data);
        const res = await api.post('/login', data);
        localStorage.setItem('token', res.data.data.token);
        setUser(normalizeUser(res.data.data));
        return res; // return full axios response to match callers expecting res.data
    };

    // logout
    const logout = async () => {
        await api.post('/logout');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>{children}</AuthContext.Provider>
    );
};

export { AuthContext };
