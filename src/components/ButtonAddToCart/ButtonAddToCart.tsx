import { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addItemToCart } from '../../store/cart/reducer';
import Button from '../Button/Button';
import type { ProductType } from '../../types/product';
import { selectCartItems } from '../../store/cart/selector';

type ButtonAddToCartProps = {
  product: ProductType;
  children: React.ReactNode;
};

const ButtonAddToCart = ({ product, children }: ButtonAddToCartProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const checkQuantity = (quantity: number): number | string => {
    return quantity < 99 ? quantity : '99+';
  };

  const addProductHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(addItemToCart(product));
    },
    [dispatch, product]
  );

  return (
    <ProductButton variant="primary" onClick={addProductHandler}>
      {children}
      <CartQuantity>
        {cartItems.map((item) => {
          return item.id === product.id
            ? 'In cart ' + checkQuantity(item.quantity ?? 1)
            : '';
        })}
      </CartQuantity>
    </ProductButton>
  );
};

const ProductButton = styled(Button)`
  position: relative;
  opacity: 0.8;
`;
const CartQuantity = styled.span`
  position: absolute;
  left: 50%;
  bottom: -15px;
  transform: translateX(-50%);
  width: 100%;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export default memo(ButtonAddToCart);
