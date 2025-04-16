import styled from 'styled-components';
import { ProductType } from '../../contexts/products';

const CartItem = ({ cartItem }: { cartItem: ProductType }) => {
  const { name, quantity } = cartItem;
  return (
    <CartItemContainer>
      <h2>{name}</h2>
      <span>{quantity}</span>
    </CartItemContainer>
  );
};

const CartItemContainer = styled.div`
  text-align: center;
`;

export default CartItem;
