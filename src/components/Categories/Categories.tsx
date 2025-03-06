import styled from 'styled-components';
import Category, { CategoryProps } from '../Category/Category';

interface CategoriesProps {
  data: CategoryProps[];
}

const Categories: React.FC<CategoriesProps> = ({ data }) => {
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
  min-height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 300px);
  gap: 30px;
  place-content: center;
  text-align: center;
`;

export default Categories;
