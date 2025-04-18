import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

import Home from './routes/Home/Home';
import Navigation from './routes/Navigation/Navigation';
import Authentication from './routes/Authentication/Authentication';
import Shop from './routes/Shop/Shop';
import Checkout from './routes/Checkout/Checkout';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>

      <GlobalStyles />
    </>
  );
};

export default App;
