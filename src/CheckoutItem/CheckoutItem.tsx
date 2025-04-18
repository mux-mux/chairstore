import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { ProductType } from '../contexts/products';
import CartContext from '../contexts/cart';

const CheckoutItem = ({ cartItem }: { cartItem: ProductType }) => {
  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CheckoutItemContainer>
      <>
        <ImageContainer>
          <img src={imageUrl} alt={name} />
        </ImageContainer>
        <Name>{name}</Name>
        <QuantityContainer>
          <BaseButton onClick={() => removeItemFromCart(cartItem)}>
            &#10094;
          </BaseButton>
          <Quantity>{quantity}</Quantity>
          <BaseButton onClick={() => addItemToCart(cartItem)}>
            &#10095;
          </BaseButton>
        </QuantityContainer>
        <Price>{price}</Price>
        <RemoveButton onClick={() => clearItemFromCart(cartItem)}>
          &#10006;
        </RemoveButton>
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

const BaseButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
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
const QuantityContainer = styled.span`
  ${commonWidth}
  display: flex;
  justify-content: center;
  align-items: anchor-center;
`;
const Quantity = styled.span`
  flex-basis: 30px;
`;
const Price = styled.span`
  ${commonWidth}
`;

const RemoveButton = styled(BaseButton)`
  margin: 0 auto;
`;

export default CheckoutItem;
