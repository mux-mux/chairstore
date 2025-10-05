import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import {
  onAuthStateChangedListener,
  createUserDocument,
  getCollectionsAndDocuments,
} from './utils/firebase/firebase';

import { Routes, Route } from 'react-router-dom';
import { setCurrentUser } from './store/user/reducer';
import { setCategories } from './store/categories/reducer';
import type { UserType } from './types/user';

import Home from './routes/Home/Home';
import Navigation from './routes/Navigation/Navigation';
import Spinner from './components/Spinner/Spinner';
import Products from './routes/Products/Products';
import Product from './routes/Product/Product';
import Contact from './routes/Contact/Contact';
import TermsOfUse from './routes/TermsOfUse/TermsOfUse';
import PrivacyPolicy from './routes/PrivacyPolicy/PrivacyPolicy';
const Authentication = lazy(
  () => import('./routes/Authentication/Authentication')
);
const Checkout = lazy(() => import('./routes/Checkout/Checkout'));
const NotFound = lazy(() => import('./routes/NotFound/NotFound'));

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
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path=":category" element={<Products />} />
          <Route path=":category/:product" element={<Product />} />
          <Route path="contact" element={<Contact />} />
          <Route path="termsOfUse" element={<TermsOfUse />} />
          <Route path="privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
