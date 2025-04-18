import { useContext } from 'react';
import styled from 'styled-components';
import CartContext from '../../contexts/cart';

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  return (
    <CheckoutContainer>
      <h1>Checkout Page</h1>
      <div>
        {cartItems.map((cartItem) => {
          const { id, name, price, quantity, imageUrl } = cartItem;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <img src={imageUrl} alt={name} />
              <div>
                <button onClick={() => removeItemFromCart(cartItem)}>
                  decrement
                </button>
                <span>{quantity}</span>
                <button onClick={() => addItemToCart(cartItem)}>
                  increment
                </button>
              </div>
              <span>{price}</span>
            </div>
          );
        })}
      </div>
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled.div``;

export default Checkout;
