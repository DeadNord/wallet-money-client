// index.js
// The main entry file of the React application.

// Importing main React and ReactDOM dependencies for UI handling.
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import functionality for monitoring application performance.
import reportWebVitals from './reportWebVitals';

// Importing the root component of the application.
import App from './App';

// Importing global styles for the application.
import './index.scss';

// Importing dependencies for handling routing in the React application.
import { BrowserRouter } from 'react-router-dom';

// Importing necessary dependencies for working with the Redux store and its persistent integration.
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Getting a reference to the root DOM element.
const rootElement = document.getElementById('root') as HTMLElement;
// Creating a root React instance to manage the application.
const root = ReactDOM.createRoot(rootElement);

// Rendering the React application in the DOM, wrapping App in the necessary providers.
root.render(
  <React.StrictMode>
    {/* React.StrictMode to detect potential problems */}
    <Provider store={store}>
      {/* Providing the Redux store to the entire application */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Delaying UI load until Redux state is restored */}
        <BrowserRouter>
          {/* Ensuring routing support */}
          <App /> {/* The root component of the application */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// Launching the performance monitoring of the application.
reportWebVitals();
