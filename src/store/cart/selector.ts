import { createSelector } from 'reselect';
import { ProductType } from '../../types/product';
import { RootState } from '../../types/rootReducer';

const selectCartReducer = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart): ProductType[] => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart): boolean => cart.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems): number =>
    cartItems.reduce(
      (total: number, cartItem: ProductType) =>
        total + (cartItem.quantity ?? 1),
      0
    )
);

export const selectCartPrice = createSelector(
  [selectCartItems],
  (cartItems): number =>
    cartItems.reduce(
      (total: number, cartItem: ProductType) =>
        total + cartItem.price * (cartItem.quantity ?? 1),
      0
    )
);
