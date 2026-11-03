import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/style.css';
import './styles/auth.css';
import './styles/admin.css';
import './styles/user.css';
import './styles/organizer.css';
import './styles/react-fixes.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
