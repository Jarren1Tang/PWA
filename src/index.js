import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Add event listener for beforeinstallprompt
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt from showing
  event.preventDefault();
  // Stash the event so it can be triggered later
  window.deferredPrompt = event;
  // Optionally, display your own custom UI to prompt the user to install the app
  // For example, display a button that, when clicked, triggers the installation prompt
});

// Logging performance results or sending them to an analytics endpoint
reportWebVitals();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);