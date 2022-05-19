import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './store';
import React from 'react';
import App from './App';
  
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
