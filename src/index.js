import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { makeServer } from './mocks'; 

console.log("NODE_ENV should be development" + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    makeServer();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);