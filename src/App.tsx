import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  onAuthStateChangedListener,
  createUserDocument,
  getCollectionsAndDocuments,
} from './utils/firebase/firebase';

import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { setCurrentUser } from './store/user';
import { setCategories } from './store/categories';

import { UserType } from './types/user';

import Home from './routes/Home/Home';
import Navigation from './routes/Navigation/Navigation';
import Authentication from './routes/Authentication/Authentication';
import Products from './routes/Products/Products';
import Checkout from './routes/Checkout/Checkout';
import NotFound from './routes/NotFound/NotFound';

const App = () => {
  const dispatch = useDispatch();

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
    const getCategories = async () => {
      const categoriesMap = await getCollectionsAndDocuments();
      dispatch(setCategories(categoriesMap));
    };
    getCategories();
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
