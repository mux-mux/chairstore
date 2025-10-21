import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Icon from '../../assets/shopping-bag.svg?react';
import { setIsCartOpen } from '../../store/cart/reducer';
import { selectCartCount } from '../../store/cart/selector';

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartTotalCount = useSelector(selectCartCount);

  const toggleCartModal = () => dispatch(setIsCartOpen(true));

  return (
    <CartIconContainer onClick={toggleCartModal}>
      <CartSvg
        width={40}
        height={40}
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
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const CartSvg = styled(Icon)`
  transform: translateY(-4px);
`;
const CartCount = styled.span`
  transform: translate(50%, -50%);
  position: absolute;
  top: 50%;
  right: 50%;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: ${({ theme }) => theme.fontSize[0]};
`;

export default CartIcon;
