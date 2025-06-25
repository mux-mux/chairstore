import { Link } from 'react-router-dom';
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addItemToCart } from '../../store/cart/reducer';
import Button from '../Button/Button';
import { COLORS } from '../../constants';
import type { ProductType } from '../../types/product';

const ProductCard = ({ product }: { product: ProductType }) => {
  const dispatch = useDispatch();
  const { id, name, imageSrc, price } = product;

  const fileName = imageSrc.split('/').pop()?.split('.')[0];
  if (!fileName) throw new Error('incorrect file name');

  const addProductHandler = useCallback(() => {
    dispatch(addItemToCart(product));
  }, [dispatch, product]);

  return (
    <ProductCardContainer to={id}>
      <ProductImage src={imageSrc} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <span>{price}$</span>
      </Footer>
      <ProductButton variant="inverted" onClick={addProductHandler}>
        ADD TO CART
      </ProductButton>
    </ProductCardContainer>
  );
};

const ProductCardContainer = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  border: 1px solid ${COLORS.borderPrimary};
  border-radius: 10px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 95%;
  object-fit: cover;
  margin-bottom: 5px;
`;

const ProductButton = styled(Button)`
  position: absolute;
  justify-content: center;
  width: 80%;
  opacity: 0.7;
  top: 245px;

  @media (prefers-reduced-motion: no-preference) {
    opacity: 0;
    will-change: opacity;
    transition: opacity 200ms ease-in-out;
  }

  ${ProductCardContainer}:hover & {
    opacity: 0.85;
  }

  @media (hover: none) {
    opacity: 0.85;
  }
`;

const Footer = styled.div`
  width: 100%;
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 0 20px;
  border-top: 1px solid ${COLORS.borderPrimary};
  font-size: 18px;
`;

const Name = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export default memo(ProductCard);
