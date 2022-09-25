import './style/main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const container = document.querySelector('#root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);
root.render(<App />);
