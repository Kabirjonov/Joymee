import React, { useContext } from 'react';
import ColorModeContext from '../ColorProvider/ColorModeContext';

const ExampleComponent = () => {
    const { theme, toggleTheme } = useContext(ColorModeContext);

    return (
        <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
            <p>Current Theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

export default ExampleComponent;
