import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './routes/Home/Home';

const Navigation = () => {
  return (
    <div>
      <div>
        <h1>Navigation bar</h1>
      </div>
      <Outlet />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
