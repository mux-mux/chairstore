import { useContext } from 'react';
import styled from 'styled-components';
import Icon from '../../assets/shopping-bag.svg?react';
import CartContext from '../../contexts/cart';
import { COLORS } from '../../constants';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, getCartTotalCount } =
    useContext(CartContext);

  return (
    <CartIconContainer onClick={() => setIsCartOpen(!isCartOpen)}>
      <Icon
        width={32}
        height={32}
        aria-label="Shopping Bag"
        fill="currentColor"
      />
      <CartCount>{getCartTotalCount()}</CartCount>
    </CartIconContainer>
  );
};

const CartIconContainer = styled.button`
  position: relative;
  width: 45px;
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
  font-size: 11px;
  font-weight: bold;
  color: currentColor;
  bottom: 12px;
`;

export default CartIcon;
