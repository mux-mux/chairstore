import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/selector';
import ProductCard from '../../components/ProductCard/ProductCard';
import Spinner from '../../components/Spinner/Spinner';
import type { ProductType, ProductsRouteParams } from '../../types/product';

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { category } = useParams<ProductsRouteParams>();
  const categories = useSelector(selectCategories);

  const categoryData = categories.find(
    (cat) =>
      cat.path.replace(/^\/|\/$/g, '').toLowerCase() ===
      (category || '').toLowerCase()
  );

  useEffect(() => {
    if (categoryData) {
      setProducts(categoryData.items || []);
    }
  }, [categoryData]);

  return (
    <>
      <Title>{categoryData?.title}</Title>
      {!categories || categories.length === 0 ? (
        <Spinner />
      ) : (
        <ProductsContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </ProductsContainer>
      )}
    </>
  );
};

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  place-content: center;
  gap: 20px;
`;
const Title = styled.h2`
  text-transform: uppercase;
  font-size: 38px;
  margin-bottom: 25px;
`;

export default Products;
