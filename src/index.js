import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import ColorMode from './components/ColorProvider/ColorMode';
import 'react-lazy-load-image-component/src/effects/blur.css';  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColorMode>
      <App />
    </ColorMode>
  </React.StrictMode>
);

reportWebVitals();
