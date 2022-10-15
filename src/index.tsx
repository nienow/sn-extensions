import React from 'react';
import './index.scss';

import App from './App';
import './stylesheets/main.scss';
import {createRoot} from "react-dom/client";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
