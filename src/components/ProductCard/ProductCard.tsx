import { Link } from 'react-router-dom';
import { memo } from 'react';
import styled from 'styled-components';
import ButtonAddToCart from '../ButtonAddToCart/ButtonAddToCart';
import AddToCartIcon from '../../assets/add-to-cart.svg?react';
import { COLORS } from '../../constants';
import type { ProductType } from '../../types/product';

const ProductCard = ({ product }: { product: ProductType }) => {
  const { id, name, imageSrc, price } = product;

  return (
    <ProductCardContainer to={id}>
      <ProductImage src={imageSrc} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <span>{price}$</span>
        <ButtonAddToCart product={product}>
          <AddToCartIcon
            width={18}
            height={18}
            aria-label="Add to Cart"
            fill="currentColor"
          />
        </ButtonAddToCart>
      </Footer>
    </ProductCardContainer>
  );
};

export const ProductCardContainer = styled(Link)`
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
`;

const Footer = styled.div`
  width: 100%;
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-left: 20px;
  text-align: left;
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
