import styled from 'styled-components';
import Icon from '../../assets/shopping-bag.svg?react';

import { COLORS } from '../../constants';

const CartIcon = () => {
  return (
    <CartIconContainer>
      <Icon
        width={28}
        height={28}
        aria-label="Shopping Bag"
        fill="currentColor"
      />
      <CartCount>0</CartCount>
    </CartIconContainer>
  );
};

export default CartIcon;

const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.thertiary};
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  color: currentColor;
  bottom: 10px;
`;
