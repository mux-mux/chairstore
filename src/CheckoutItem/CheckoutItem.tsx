import styled, { css } from 'styled-components';
import { ProductType } from '../contexts/products';

const CheckoutItem = ({ cartItem }: { cartItem: ProductType }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CheckoutItemContainer>
      <>
        <ImageContainer>
          <img src={imageUrl} alt={name} />
        </ImageContainer>
        <Name>{name}</Name>
        <Quantity>{quantity}</Quantity>
        <Price>{price}</Price>
        <RemoveButton>&#10006;</RemoveButton>
      </>
    </CheckoutItemContainer>
  );
};

const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

const commonWidth = css`
  width: 23%;
`;

const ImageContainer = styled.div`
  ${commonWidth}
`;
const Name = styled.span`
  ${commonWidth}
`;
const Quantity = styled.span`
  ${commonWidth}
`;
const Price = styled.span`
  ${commonWidth}
`;
const RemoveButton = styled.button`
  border: none;
  background-color: transparent;
  margin: 0 auto;
  padding: 10px 15px;
  cursor: pointer;
`;

export default CheckoutItem;
