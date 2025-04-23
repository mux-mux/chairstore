import { useContext } from 'react';
import styled from 'styled-components';
import CartContext from '../../contexts/cart';
import { ProductType } from '../../contexts/categories';
import Button from '../Button/Button';
import { COLORS } from '../../constants';

const ProductCard = ({ product }: { product: ProductType }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <span>{price}$</span>
      </Footer>
      <ProductButton variant="inverted" onClick={() => addItemToCart(product)}>
        ADD TO CART
      </ProductButton>
    </ProductCardContainer>
  );
};

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

export default ProductCard;
