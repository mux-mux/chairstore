import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartPrice } from '../../store/cart/selector';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import { COLORS } from '../../constants';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectCartPrice);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderColumn>
          <span>Product</span>
        </HeaderColumn>
        <HeaderColumn>
          <span>Description</span>
        </HeaderColumn>
        <HeaderColumn>
          <span>Quantity</span>
        </HeaderColumn>
        <HeaderColumn>
          <span>Price</span>
        </HeaderColumn>
        <HeaderColumn>
          <span>Remove</span>
        </HeaderColumn>
      </CheckoutHeader>

      {cartItems.map((cartItem) => (
        <CheckoutItem
          key={`${cartItem.id} - $${cartItem.price}`}
          cartItem={cartItem}
        />
      ))}
      <CheckoutTotal>Total: {cartTotalPrice}$</CheckoutTotal>
      <PaymentForm />
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
`;
const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.borderSecondary};
`;
const HeaderColumn = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;
const CheckoutTotal = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

export default Checkout;
