import styled from 'styled-components';
import ProductCard from '../ProductCard/ProductCard';
import { ProductType } from '../../contexts/categories';

type CategoryProps = {
  title: string;
  products: ProductType[];
};

const CategoryPreview = ({ title, products }: CategoryProps) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title>{title}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const Title = styled.span`
  text-transform: uppercase;
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
`;
const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`;

export default CategoryPreview;
