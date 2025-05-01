import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { UserProvider } from './contexts/user.tsx';
import { CategoriesProvider } from './contexts/categories.tsx';
import { CartProvider } from './contexts/cart.tsx';

import App from './App.tsx';
import store from './store/store.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
