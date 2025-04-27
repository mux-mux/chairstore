import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

import Home from './routes/Home/Home';
import Navigation from './routes/Navigation/Navigation';
import Authentication from './routes/Authentication/Authentication';
import Products from './routes/Products/Products';
import Checkout from './routes/Checkout/Checkout';
import NotFound from './routes/NotFound/NotFound';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path=":category" element={<Products />} />
          <Route path="404" element={<NotFound />} />
        </Route>
      </Routes>

      <GlobalStyles />
    </>
  );
};

export default App;
