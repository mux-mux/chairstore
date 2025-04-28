import { useContext } from 'react';
import styled from 'styled-components';
import Icon from '../../assets/shopping-bag.svg?react';
import CartContext from '../../contexts/cart';
import { COLORS } from '../../constants';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, getCartTotalCount } =
    useContext(CartContext);
  const itemsCount = getCartTotalCount();

  return (
    <CartIconContainer onClick={() => setIsCartOpen(!isCartOpen)}>
      <Icon
        width={36}
        height={36}
        aria-label="Shopping Bag"
        fill="currentColor"
      />
      <CartCount style={{ fontSize: itemsCount > 99 ? '11px' : '12px' }}>
        {itemsCount > 99 ? '99+' : itemsCount}
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
