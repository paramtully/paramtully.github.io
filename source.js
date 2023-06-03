// import { useState, StrictMode } from 'react';
// import { createRoot } from 'react-dom.client';
import { ProfilePhoto } from './components/about.js';

const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);
root.render(
    <React.StrictMode>
        <div>Hello world</div>
        <ProfilePhoto />
    </React.StrictMode>
);