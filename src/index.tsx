import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdventureGame } from './components/AdventureGame';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AdventureGame />
  </React.StrictMode>
);
