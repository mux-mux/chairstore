import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import { getCollectionsAndDocuments } from '../utils/firebase/firebase';

import DATA from '../data';

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
  const [products, setProducts] = useState<ProductType[] | null>(
    DATA.flatMap((category) => category.items)
  );

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCollectionsAndDocuments();
      console.log(categoryMap);
    };

    getCategoriesMap();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
