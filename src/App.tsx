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
      <h1>Chairs Store</h1>
      {CATEGORIES.map(({ id, title }) => (
        <CategoryContainer key={id}>
          <CategoryBody>
            <h2>{title}</h2>
            <a href="#">Open</a>
          </CategoryBody>
        </CategoryContainer>
      ))}
    </CategoriesContainer>
  );
};

export default App;
