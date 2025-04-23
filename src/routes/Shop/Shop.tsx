import { useContext, Fragment } from 'react';
import styled from 'styled-components';
import CategoriesContext, { CategoriesType } from '../../contexts/categories';
import ProductCard from '../../components/ProductCard/ProductCard';

const Shop = () => {
  const { categories } = useContext(CategoriesContext) as {
    categories: CategoriesType;
  };
  console.log(categories);

  return (
    <Fragment>
      {Object.keys(categories).map((title, index) => (
        <Fragment key={index}>
          <h2>{title}</h2>
          <CategoriesContainer>
            {categories[title]?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </CategoriesContainer>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Shop;

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  gap: 10px;
  place-content: center;
  text-align: center;
`;
