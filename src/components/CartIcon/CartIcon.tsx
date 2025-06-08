import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Icon from '../../assets/shopping-bag.svg?react';
import { setIsCartOpen } from '../../store/cart/reducer';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/selector';
import { COLORS } from '../../constants';

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartTotalCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleCartModal = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleCartModal}>
      <Icon
        width={36}
        height={36}
        aria-label="Shopping Bag"
        fill="currentColor"
      />
      <CartCount style={{ fontSize: cartTotalCount > 99 ? '11px' : '12px' }}>
        {cartTotalCount > 99 ? '99+' : cartTotalCount}
      </CartCount>
    </CartIconContainer>
  );
};

const CartIconContainer = styled.button`
  position: relative;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: ${COLORS.thertiary};
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  font-weight: bold;
  color: currentColor;
  bottom: 12px;
  left: 50%;
  transform: translateX(-55%);
`;

export default CartIcon;
