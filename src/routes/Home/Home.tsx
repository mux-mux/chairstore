import { Outlet } from 'react-router-dom';

import Categories from '../../components/Categories/Categories';

const Home = (): React.ReactElement => {
  return (
    <>
      <Outlet />
      <Categories />
    </>
  );
};

export default Home;
