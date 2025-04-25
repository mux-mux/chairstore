import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../Categories/Categories';
import Category from '../Category/Category';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
