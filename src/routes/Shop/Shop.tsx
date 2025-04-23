import { useContext } from 'react';
import CategoriesContext, { CategoriesType } from '../../contexts/categories';
import CategoryPreview from '../../components/CategoryPreview/CategoryPreview';

const Shop = () => {
  const { categories } = useContext(CategoriesContext) as {
    categories: CategoriesType;
  };
  console.log(categories);

  return (
    <>
      {Object.keys(categories).map((title, index) => {
        const products = categories[title];
        return (
          <CategoryPreview
            key={index}
            title={title}
            products={products}
          ></CategoryPreview>
        );
      })}
    </>
  );
};

export default Shop;
