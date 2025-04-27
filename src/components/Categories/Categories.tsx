import styled from 'styled-components';
import { useContext } from 'react';
import Category from '../Category/Category';
import CategoriesContext from '../../contexts/categories';
import { CategoryType } from '../../data';

const Categories = () => {
  const { categories } = useContext(CategoriesContext);

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
