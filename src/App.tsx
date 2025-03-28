import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import Navigation from './routes/Navigation/Navigation';
import SignIn from './routes/SignIn/SignIn';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="signIn" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
