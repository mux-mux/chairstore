import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
