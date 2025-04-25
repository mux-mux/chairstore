import { useContext } from 'react';
import CategoriesContext, { CategoriesType } from '../../contexts/categories';
import DirectoryPreview from '../../components/DirectoryPreview/DirectoryPreview';

const Categories = () => {
  const { categories } = useContext(CategoriesContext) as {
    categories: CategoriesType;
  };

  return (
    <>
      {Object.keys(categories).map((title, index) => {
        const products = categories[title];
        return (
          <DirectoryPreview
            key={index}
            title={title}
            products={products}
          ></DirectoryPreview>
        );
      })}
    </>
  );
};

export default Categories;
