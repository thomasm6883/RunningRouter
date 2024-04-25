import React from 'react';
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';
import './main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StripeReturn from './components/stripeComponents/StripeReturn.jsx';

const root = createRoot(document.getElementById('root'))
root.render(
    <div className='h-screen w-screen flex flex-col'>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App className="App"/>} />
            <Route path="/stripe-return" element={<StripeReturn/>} />
        </Routes>


        </BrowserRouter>
    </div>
);

// <App className="App"/>
