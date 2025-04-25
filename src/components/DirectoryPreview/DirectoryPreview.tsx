import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { ProductType } from '../../contexts/categories';

type DirectoryProps = {
  title: string;
  products: ProductType[];
};

const DirectoryPreview = ({ title, products }: DirectoryProps) => {
  const formattedTitle = decodeURIComponent(title).replace(/\s+/g, '-');
  return (
    <DirectoryPreviewContainer>
      <h2>
        <Title to={formattedTitle}>{title}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </Preview>
    </DirectoryPreviewContainer>
  );
};

const DirectoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const Title = styled(Link)`
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

export default DirectoryPreview;
