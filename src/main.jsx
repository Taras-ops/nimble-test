import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './routes/Root';
import ContactPage from './routes/ContactPage.jsx';
import { store } from './store/index.js';
import './index.css';

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
  },
  {
    path: '/:contactId',
    element: <ContactPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
