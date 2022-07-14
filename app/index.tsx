import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './components/App'
import './App.scss'

const container = document.createElement('div');
container.id = 'app'
document.body.appendChild(container);
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
