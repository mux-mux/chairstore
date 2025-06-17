import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';
import { setIsCartOpen } from '../../store/cart/reducer';
import { selectCartItems, selectIsCartOpen } from '../../store/cart/selector';
import useOutsideClick from '../../hooks/useClickOutside';
import { COLORS } from '../../constants';

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
        <CartItems>
          {cartItems.length ? (
            cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
          ) : (
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )}
        </CartItems>
        <CartButton variant="default" onClick={handleClick}>
          GO TO CHECKOUT
        </CartButton>
      </CartDropdownContainer>
      <CartOverlay />
    </>
  );
};

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  height: 100vh;
  @supports (height: max(100%, 100vh)) {
    height: max(100%, 100vh);
  }
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  isolation: isolate;
  z-index: 100;
`;
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
  isolation: isolate;
  z-index: 101;
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
