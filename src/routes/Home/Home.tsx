import { Outlet } from 'react-router-dom';

import Categories from '../../components/Categories/Categories';

const Home = () => {
  return (
    <>
      <Outlet />
      <Categories />
    </>
  );
};

export default Home;
