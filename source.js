import { useState } from 'react';
import { createRoot } from 'react-dom.client';
import { ProfilePhoto } from './components/about';

const rootElt = document.getElementById('root');
const root = createRoot(rootElt);
root.render(<ProfilePhoto />);