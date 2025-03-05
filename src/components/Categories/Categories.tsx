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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
`;

export default Categories;
