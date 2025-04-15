import styled from 'styled-components';
import Button from '../Button/Button';
import { ProductsType } from '../../contexts/products';
import { COLORS } from '../../constants';

const ProductCard: React.FC<{ product: ProductsType }> = ({ product }) => {
  const { name, imageUrl, price } = product;

  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <span>{price}$</span>
      </Footer>
      <ProductButton variant="inverted">ADD TO CART</ProductButton>
    </ProductCardContainer>
  );
};

export default ProductCard;

const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  border: 1px solid ${COLORS.borderPrimary};
  border-radius: 10px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 95%;
  object-fit: cover;
  margin-bottom: 5px;
`;

const ProductButton = styled(Button)`
  position: absolute;
  justify-content: center;
  width: 80%;
  opacity: 0.7;
  top: 245px;
  opacity: 0;
  transition: opacity 200ms ease-in-out;

  ${ProductCardContainer}:hover & {
    opacity: 0.85;
  }
`;

const Footer = styled.div`
  width: 100%;
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 0 20px;
  border-top: 1px solid ${COLORS.borderPrimary};
  font-size: 18px;
`;

const Name = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;
