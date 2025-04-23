import styled from 'styled-components';
import { ProductType } from '../../contexts/categories';

const CartItem = ({ cartItem }: { cartItem: ProductType }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={name} />
      </ImageContainer>
      <Details>
        <Name>{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </Details>
    </CartItemContainer>
  );
};

const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;
`;
const ImageContainer = styled.div`
  width: 30%;
`;
const Image = styled.img`
  aspect-ratio: 1/1.5;
`;
const Details = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  padding: 5px 20px;
  overflow: hidden;
`;
const Name = styled.span`
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default CartItem;
