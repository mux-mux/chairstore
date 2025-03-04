import styled from 'styled-components';

interface Category {
  id: number;
  title: string;
  imagePath: string;
}

interface CategoriesProps {
  data: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ data }) => {
  return (
    <CategoriesContainer>
      {data.map(({ id, title, imagePath }) => (
        <CategoryContainer key={id}>
          <CategoryImage
            style={{ backgroundImage: `url(${imagePath})` }}
          ></CategoryImage>
          <CategoryBody>
            <CategoryLink href="#">{title}</CategoryLink>
          </CategoryBody>
        </CategoryContainer>
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
const CategoryContainer = styled.div`
  position: relative;
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin: 0 7.5px 15px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;
const CategoryBody = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid lightgrey;
  background-color: white;
  opacity: 0.85;
  will-change: opacity;
  transition: 500ms ease-in-out;

  ${CategoryContainer}:hover & {
    opacity: 0.95;
  }
`;

const CategoryImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  will-change: transform;
  transition: transform 500ms ease-in;

  ${CategoryContainer}:hover & {
    transform: scale(1.1);
    transition: transform 1s ease-in;
  }
`;

const CategoryLink = styled.a`
  padding: 0 5px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
`;

export default Categories;
