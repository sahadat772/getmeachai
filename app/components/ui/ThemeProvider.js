'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');

    useEffect(function () {
        const saved = localStorage.getItem('theme') || 'dark';
        setTimeout(function () {
            setTheme(saved);
            document.documentElement.setAttribute('data-theme', saved);
        }, 0);
    }, []);

    function toggleTheme() {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTimeout(function () {
            setTheme(next);
            localStorage.setItem('theme', next);
            document.documentElement.setAttribute('data-theme', next);
        }, 0);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}