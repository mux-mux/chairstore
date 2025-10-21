import { Link } from 'react-router-dom';
import { memo } from 'react';
import styled from 'styled-components';
import ButtonAddToCart from '../ButtonAddToCart/ButtonAddToCart';
import AddToCartIcon from '../../assets/add-to-cart.svg?react';
import type { ProductType } from '../../types/product';

const ProductCard = ({ product }: { product: ProductType }) => {
  const { id, name, imageSrc, price } = product;

  return (
    <ProductCardContainer to={id}>
      <Title>{name}</Title>
      <img src={`/${imageSrc}`} alt={name} />
      <Footer>
        <Price>${price}</Price>
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
  position: relative;
  padding: ${({ theme }) => theme.space[2]};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.low};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.1s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.mid};
  }
`;

const Footer = styled.div`
  width: 100%;
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  padding-left: ${({ theme }) => theme.space[4]};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize[3]};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize[3]};
  font-weight: 500;
  margin-top: ${({ theme }) => theme.space[0]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Price = styled.span`
  font-size: ${({ theme }) => theme.fontSize[3]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export default memo(ProductCard);
