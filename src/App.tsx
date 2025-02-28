import styled from 'styled-components';

const CategoriesContainer = styled.div`
  text-align: center;
`;
const CategoryContainer = styled.div`
  display: flex;
  place-content: center;
  flex-wrap: wrap;
`;
const CategoryBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const CATEGORIES = [
  'Office chairs',
  'Gaming chairs',
  'Dining chairs',
  "Children's chairs",
  'Soft chairs',
];

const App = () => {
  return (
    <CategoriesContainer>
      <h1>Chairs Store</h1>
      {CATEGORIES.map((category) => (
        <CategoryContainer>
          <CategoryBody>
            <h2>{category}</h2>
            <a href="#">View</a>
          </CategoryBody>
        </CategoryContainer>
      ))}
    </CategoriesContainer>
  );
};

export default App;
