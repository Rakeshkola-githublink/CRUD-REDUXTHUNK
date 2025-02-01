
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider
import './index.css';
import App from './App.jsx';
import store from './app/store.js'; // Import your store

createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Wrap App with the Provider and pass the store */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
