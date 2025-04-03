import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Find the root element in the HTML where the React app will be mounted.
const rootElement = document.getElementById('root');

// Ensure the root element exists before attempting to render the app.
if (!rootElement) {
  throw new Error(
    "Fatal Error: Root element with ID 'root' was not found in the DOM. Ensure it exists in `public/index.html`."
  );
}

// Create a React root attached to the target element.
const root = ReactDOM.createRoot(rootElement);

// Render the application into the root.
// BrowserRouter provides routing context for the entire application.
// React.StrictMode enables additional checks and warnings for development.
// App is the main application component containing layout and routing logic.
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);