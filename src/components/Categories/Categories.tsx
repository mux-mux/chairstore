import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/selector';
import Category from '../Category/Category';
import Spinner from '../Spinner/Spinner';
import type { CategoryType } from '../../types/category';

const Categories = () => {
  const categories = useSelector(selectCategories);

  if (!categories || categories.length === 0) {
    return <Spinner />;
  }

  return (
    <CategoriesContainer>
      {categories.map((category: CategoryType) => (
        <Category key={category.id} {...category} />
      ))}
    </CategoriesContainer>
  );
};

const CategoriesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 30px;
  place-content: center;
  text-align: center;
`;

export default Categories;
