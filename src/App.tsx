import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getCurrentUser } from './utils/firebase/firebase';
import { fetchCategoriesStart } from './store/categories';
import type { AppDispatch } from './store/store';
import GlobalStyles from './GlobalStyles';

import Home from './routes/Home/Home';
import Navigation from './routes/Navigation/Navigation';
import Authentication from './routes/Authentication/Authentication';
import Products from './routes/Products/Products';
import Checkout from './routes/Checkout/Checkout';
import NotFound from './routes/NotFound/NotFound';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getCurrentUser().then((user) => console.log(user));
  }, []);

  useEffect(() => {
    dispatch(fetchCategoriesStart());
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
