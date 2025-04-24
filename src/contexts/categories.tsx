import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import { getCollectionsAndDocuments } from '../utils/firebase/firebase';

export type ProductType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
};

export type CategoriesType = {
  [key: string]: ProductType[];
};

type CategoriesContextType = {
  categories: CategoriesType;
  setCategories: Dispatch<SetStateAction<CategoriesType>>;
};

const CategoriesContext = createContext<CategoriesContextType>({
  categories: {},
  setCategories: () => {},
});

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoriesType>({});

  useEffect(() => {
    const getCategories = async () => {
      const categoriesMap = await getCollectionsAndDocuments();
      setCategories(categoriesMap);
    };

    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;
