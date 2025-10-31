import styled from 'styled-components';
import type { CartItemProps } from '../../types/cart';
import { useDispatch } from 'react-redux';
import { clearItemFromCart } from '../../store/cart/reducer';
import { BaseButton } from '../CheckoutItem/CheckoutItem';

const CartItem = ({ cartItem }: CartItemProps) => {
  const dispatch = useDispatch();
  const { name, imageSrc, price, quantity } = cartItem;

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));

  return (
    <CartItemContainer>
      <ImageContainer>
        <Image src={`/${imageSrc}`} alt={name} />
      </ImageContainer>
      <Details>
        <Name>{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </Details>
      <BaseButton onClick={clearItemHandler}>&#10006;</BaseButton>
    </CartItemContainer>
  );
};

const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: ${({ theme }) => theme.space[4]};

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
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
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[5]};
  overflow: hidden;
`;
const Name = styled.span`
  font-size: ${({ theme }) => theme.fontSize[2]};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default CartItem;
