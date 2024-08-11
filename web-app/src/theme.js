// src/components/ThemeToggle.jsx

import React, { useState } from 'react';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(true);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <button onClick={toggleTheme}>
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
    );
};

export default ThemeToggle;
