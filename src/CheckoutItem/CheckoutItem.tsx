import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../store/cart/reducer';
import { selectCartItems } from '../store/cart/selector';
import { COLORS } from '../constants';
import { ProductType } from '../types/product';

const CheckoutItem = ({ cartItem }: { cartItem: ProductType }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageSrc, price, quantity } = cartItem;

  return (
    <CheckoutItemContainer>
      <>
        <ImageContainer>
          <img src={imageSrc} alt={name} />
        </ImageContainer>
        <Name>{name}</Name>
        <QuantityContainer>
          <BaseButton
            onClick={() => dispatch(removeItemFromCart(cartItems, cartItem))}
          >
            &#10094;
          </BaseButton>
          <Quantity>{quantity}</Quantity>
          <BaseButton
            onClick={() => dispatch(addItemToCart(cartItems, cartItem))}
          >
            &#10095;
          </BaseButton>
        </QuantityContainer>
        <Price>{price}</Price>
        <RemoveButton
          onClick={() => dispatch(clearItemFromCart(cartItems, cartItem))}
        >
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
  border-bottom: 1px solid ${COLORS.borderSecondary};
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
