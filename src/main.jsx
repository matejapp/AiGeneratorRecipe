import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';


// No need for dotenv.config() in React
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App />
   
  </StrictMode>
);


