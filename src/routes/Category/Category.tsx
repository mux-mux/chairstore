import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ProductType } from '../../contexts/categories';
import styled from 'styled-components';

import CategoriesContext from '../../contexts/categories';

const Category = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { category } = useParams();
  const { categories } = useContext(CategoriesContext);

  useEffect(() => {
    if (category && categories[category]) {
      setProducts(categories[category]);
    }
  }, [categories, category]);

  return (
    <>
      <Title>{category}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
};

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;
const Title = styled.h2`
  text-transform: uppercase;
  font-size: 38px;
  margin-bottom: 25px;
`;

export default Category;
