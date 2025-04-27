import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';
import CartContext from '../../contexts/cart';
import { COLORS } from '../../constants';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <CartButton variant="default" onClick={() => navigate('/checkout')}>
        GO TO CHECKOUT
      </CartButton>
    </CartDropdownContainer>
  );
};

const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${COLORS.borderPrimary};
  background-color: ${COLORS.bgColorPrimary};
  top: 65px;
  right: 20px;
  z-index: 5;
`;
const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const EmptyMessage = styled.span`
  font-size: 18px;
  margin: auto;
`;

const CartButton = styled(Button)`
  margin-top: auto;
`;

export default CartDropdown;
