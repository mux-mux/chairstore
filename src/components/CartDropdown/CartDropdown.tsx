import styled from 'styled-components';
import Button from '../Button/Button';

import { COLORS } from '../../constants';

const CartDropdown = () => {
  return (
    <CartDropdownContainer>
      <CartItems></CartItems>
      <CartButton variant="default">GO TO CHECKOUT</CartButton>
    </CartDropdownContainer>
  );
};

export default CartDropdown;

const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${COLORS.borderPrimary};
  background-color: white;
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

const CartButton = styled(Button)`
  margin-top: auto;
`;
