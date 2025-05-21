import { createSelector } from 'reselect';
import { ProductType } from '../../types/product';
import { StoreType } from '../../types/store';

const selectCartReducer = (state: StoreType) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cartItem: ProductType) => total + cartItem.quantity!,
    0
  )
);

export const selectCartPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cartItem: ProductType) =>
      total + cartItem.quantity! * cartItem.price,
    0
  )
);
