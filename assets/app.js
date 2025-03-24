import React from 'react';
import { createRoot } from 'react-dom/client';
import HelloReact from './js/components/HelloReact';

const root = createRoot(document.getElementById('root'));
root.render(<HelloReact />);