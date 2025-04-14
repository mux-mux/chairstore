import { useContext } from 'react';
import styled from 'styled-components';
import ProductsContext from '../../contexts/products';
import ProductCard from '../../components/ProductCard/ProductCard';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <ProductsContainer>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductsContainer>
  );
};

export default Shop;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 30px;
  place-content: center;
  text-align: center;
`;
