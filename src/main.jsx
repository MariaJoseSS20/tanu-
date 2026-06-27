import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './styles-gallery.css';
import './styles-out-of-city.css';
import './i18n/index.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);
