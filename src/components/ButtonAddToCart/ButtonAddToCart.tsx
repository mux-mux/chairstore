import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addItemToCart } from '../../store/cart/reducer';
import Button from '../Button/Button';
import type { ProductType } from '../../types/product';

type ButtonAddToCartProps = {
  product: ProductType;
  children: React.ReactNode;
};

const ButtonAddToCart = ({ product, children }: ButtonAddToCartProps) => {
  const dispatch = useDispatch();

  const addProductHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(addItemToCart(product));
    },
    [dispatch, product]
  );

  return (
    <ProductButton variant="inverted" onClick={addProductHandler}>
      {children}
    </ProductButton>
  );
};

const ProductButton = styled(Button)`
  opacity: 0.8;
`;

export default memo(ButtonAddToCart);
