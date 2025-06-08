import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/selector';
import Category from '../Category/Category';
import Spinner from '../Spinner/Spinner';
import type { CategoryType } from '../../types/category';

const Categories = () => {
  const categories = useSelector(selectCategories);

  const renderedCategories = useMemo(() => {
    if (!categories || categories.length === 0) {
      return <Spinner />;
    }
    return categories.map((category: CategoryType) => (
      <Category key={category.id} {...category} />
    ));
  }, [categories]);

  return <CategoriesContainer>{renderedCategories}</CategoriesContainer>;
};

const CategoriesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 30px;
  place-content: center;
  text-align: center;
`;

export default memo(Categories);
