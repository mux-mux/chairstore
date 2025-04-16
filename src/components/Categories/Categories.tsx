import styled from 'styled-components';
import Category, { CategoryProps } from '../Category/Category';

type CategoriesProps = {
  data: CategoryProps[];
};

const Categories = ({ data }: CategoriesProps) => {
  return (
    <CategoriesContainer>
      {data.map((category) => (
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
