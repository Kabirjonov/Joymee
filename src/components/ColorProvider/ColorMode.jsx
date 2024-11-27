import React, { useState } from 'react';
import ColorModeContext from './ColorModeContext';

const ColorMode = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ColorModeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ColorModeContext.Provider>
    );
};

export default ColorMode;
