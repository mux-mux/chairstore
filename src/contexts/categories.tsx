import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import {
  getCollectionsAndDocuments,
  // addCollectionsAndDocuments,
} from '../utils/firebase/firebase';

// import DATA from '../data';

import { CategoryType } from '../data';

export type ProductType = {
  id: number;
  name: string;
  imageSrc: string;
  price: number;
  quantity?: number;
};

type CategoriesContextType = {
  categories: CategoryType[];
  setCategories: Dispatch<SetStateAction<CategoryType[]>>;
};

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  setCategories: () => {},
});

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  //For adding firestore data
  // useEffect(() => {
  //   addCollectionsAndDocuments('categories', DATA);
  // }, []);

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
