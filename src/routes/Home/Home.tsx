import { Outlet } from 'react-router-dom';

import Directories from '../../components/Directories/Directories';

const DIRECTORIES = [
  {
    id: 1,
    title: 'Office chairs',
    url: 'office',
    imagePath: './img/category/office-chair.jpg',
  },
  {
    id: 2,
    title: 'Gaming chairs',
    url: 'gaming',
    imagePath: './img/category/gaming-chair.jpg',
  },
  {
    id: 3,
    title: 'Dining chairs',
    url: 'dinning',
    imagePath: './img/category/dining-chair.jpg',
  },
  {
    id: 4,
    title: "Children's chairs",
    url: 'children',
    imagePath: './img/category/childrens-chair.jpg',
  },
  {
    id: 5,
    title: 'Soft chairs',
    url: 'soft',
    imagePath: './img/category/soft-chair.jpg',
  },
  {
    id: 6,
    title: 'Bar chairs',
    url: 'bar',
    imagePath: './img/category/bar-chair.jpg',
  },
];

const Home = () => {
  return (
    <>
      <Outlet />
      <Directories data={DIRECTORIES} />
    </>
  );
};

export default Home;
