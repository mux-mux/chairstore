import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import styled from 'styled-components';
import { ProductType } from '../../types/product';
import Spinner from '../../Spinner/Spinner';
import {
  selectCategories,
  selectCategoriesIsLoading,
} from '../../store/categories';

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { category } = useParams();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);

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

  if (!categoryData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Title>{categoryData.title}</Title>
      {isLoading ? (
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
  column-gap: 20px;
  row-gap: 50px;
`;
const Title = styled.h2`
  text-transform: uppercase;
  font-size: 38px;
  margin-bottom: 25px;
`;

export default Products;
