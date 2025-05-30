import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ProductType } from '../../types/product';
import { selectCategories } from '../../store/categories/selector';
import Spinner from '../../components/Spinner/Spinner';

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { category } = useParams();
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
  column-gap: 20px;
  row-gap: 50px;
`;
const Title = styled.h2`
  text-transform: uppercase;
  font-size: 38px;
  margin-bottom: 25px;
`;

export default Products;
