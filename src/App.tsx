import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  onAuthStateChangedListener,
  createUserDocument,
} from './utils/firebase/firebase';

import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { setCurrentUser } from './store/user';
import { fetchCategoriesAsync } from './store/categories';
import type { AppDispatch } from './store/store';

import { UserType } from './types/user';

import Home from './routes/Home/Home';
import Navigation from './routes/Navigation/Navigation';
import Authentication from './routes/Authentication/Authentication';
import Products from './routes/Products/Products';
import Checkout from './routes/Checkout/Checkout';
import NotFound from './routes/NotFound/NotFound';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        const userAuth: UserType = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
        };
        createUserDocument(userAuth, {});
        dispatch(setCurrentUser(userAuth));
      } else {
        dispatch(setCurrentUser(null));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path=":category" element={<Products />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <GlobalStyles />
    </>
  );
};

export default App;
