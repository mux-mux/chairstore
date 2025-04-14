import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import PRODUCTS from '../data.json';

type ProductsType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

type ProductsContextType = {
  products: ProductsType[] | null;
  setProducts: Dispatch<SetStateAction<ProductsType[] | null>>;
};

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductsType[] | null>(PRODUCTS);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
