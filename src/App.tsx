import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Home from './routes/Home/Home';
import Navigation from './routes/Navigation/Navigation';
import SignIn from './routes/SignIn/SignIn';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>

      <GlobalStyles />
    </>
  );
};

export default App;
