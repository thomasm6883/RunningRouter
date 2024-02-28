import React from 'react';
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';
import './main.css';
const root = createRoot(document.getElementById('root'))
root.render(
    <div className='h-screen w-screen'>
    <App className="App"/>
    </div>
);
