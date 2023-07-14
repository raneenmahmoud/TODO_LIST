import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const name = localStorage.getItem('Name') || 'Guest';

const handleLogout = () => {
  // Implement your logout logic here
  // Clear the localStorage or perform any other necessary actions
  localStorage.clear();
};

root.render(
     <React.StrictMode>
     <div className="container mt-3 d-flex justify-content-end col-3">
      <select className="form-select">
        <option value={name}>{name}</option>
      </select>
      <button onClick={handleLogout}>Logout</button>
    </div>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
