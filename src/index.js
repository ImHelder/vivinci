import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PriseRDV from './Components/PriseRDV/PriseRDV';
import SuiviRDV from './Components/SuiviRDV/SuiviRDV';
import PageDoc from './Components/PageDoc/PageDoc';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<PriseRDV/>} />
        <Route path="/test" element={<App/>} />
        <Route path="/suiviRDV" element={<SuiviRDV />} />
        <Route path="/PageMedecin" element={<PageDoc />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
