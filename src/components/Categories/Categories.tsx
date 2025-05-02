import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Category from '../Category/Category';
import { CategoryType } from '../../types/category';
import { StoreType } from '../../types/store';

const Categories = () => {
  const categories = useSelector(
    (state: StoreType) => state.categories.categories
  );

  return (
    <CategoriesContainer>
      {categories && categories.length > 0 ? (
        categories.map((category: CategoryType) => (
          <Category key={category.id} {...category} />
        ))
      ) : (
        <p>Loading categories...</p>
      )}
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
