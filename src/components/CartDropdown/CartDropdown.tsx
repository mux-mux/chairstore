import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';
import { setIsCartOpen } from '../../store/cart/reducer';
import { selectCartItems, selectIsCartOpen } from '../../store/cart/selector';
import useOutsideClick from '../../hooks/useClickOutside';
import { overlayStyles } from '../../styles/shared';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const toggleCartModal = () => dispatch(setIsCartOpen(!isCartOpen));
  useOutsideClick(cartRef, toggleCartModal);

  const handleClick = () => {
    navigate('/checkout');
    toggleCartModal();
  };

  return (
    <>
      <CartDropdownContainer ref={cartRef}>
        <CloseCart onClick={toggleCartModal}>&#10006;</CloseCart>
        <CartItems>
          {cartItems.length ? (
            cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
          ) : (
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )}
          {cartItems.length > 0 && (
            <CartButton onClick={handleClick}>GO TO CHECKOUT</CartButton>
          )}
        </CartItems>
      </CartDropdownContainer>
      <CartOverlay />
    </>
  );
};

const CartOverlay = styled.div`
  ${overlayStyles}
`;

const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.low};
  background-color: ${({ theme }) => theme.colors.surface};
  top: 60px;
  right: 10px;
  overflow: hidden;
  isolation: isolate;
  z-index: 101;
`;

const CloseCart = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  border-radius: 0 0 0 5px;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSize[2]};
  cursor: pointer;
`;
const CartItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const EmptyMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSize[4]};
  margin: auto;
`;

const CartButton = styled(Button)`
  margin-top: auto;
`;

export default CartDropdown;
