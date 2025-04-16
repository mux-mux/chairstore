import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import PRODUCTS from '../data.json';

export type ProductType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
};

type ProductsContextType = {
  products: ProductType[] | null;
  setProducts: Dispatch<SetStateAction<ProductType[] | null>>;
};

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductType[] | null>(PRODUCTS);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
