import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import 'leaflet/dist/leaflet.css';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }));
