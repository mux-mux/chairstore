import styled from 'styled-components';

const CATEGORIES = [
  {
    id: 1,
    title: 'Office chairs',
  },
  {
    id: 2,
    title: 'Gaming chairs',
  },
  {
    id: 3,
    title: 'Dining chairs',
  },
  {
    id: 4,
    title: "Children's chairs",
  },
  {
    id: 5,
    title: 'Soft chairs',
  },
];

const App = () => {
  return (
    <CategoriesContainer>
      {CATEGORIES.map(({ id, title }) => (
        <CategoryContainer key={id}>
          <CategoryBody>
            <CategoryTitle>{title}</CategoryTitle>
            <CategoryLink href="#">Open</CategoryLink>
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
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid lightgrey;
  background-color: white;
  opacity: 0.7;

  ${CategoryContainer}:hover & {
    opacity: 0.9;
  }
`;
const CategoryTitle = styled.h2`
  font-weight: bold;
  margin: 0 6px 0;
  font-size: 22px;
  color: #4a4a4a;
`;

const CategoryLink = styled.a`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
`;

export default App;
