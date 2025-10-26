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
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: ${({ theme }) => theme.space[5]};
  margin: ${({ theme }) => theme.space[0]} auto;
  max-width: 1200px;
`;

export default Categories;
