import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/categories/selector';
import type { ProductType } from '../../types/product';
import { styled } from 'styled-components';
import { COLORS } from '../../constants';

const Search = () => {
  const [query, setQuery] = useState('');
  const allProducts = useSelector(selectProducts);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    return allProducts.filter((product: ProductType) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allProducts]);

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search for a product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.trim() && filteredProducts.length > 0 && (
        <ResultsList>
          {filteredProducts.map((product) => (
            <ResultItem key={product.id}>
              <ResultImage src={product.imageSrc} alt={product.name} />
              <span>{product.name}</span>
              <span>${product.price}</span>
            </ResultItem>
          ))}
        </ResultsList>
      )}
      {query.trim() && filteredProducts.length === 0 && (
        <EmptyMessage>No products found.</EmptyMessage>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px;
`;

const SearchInput = styled.input`
  max-width: 200px;
  padding: 5px 10px;
  font-size: 0.8rem;
  border-radius: 5px;
  border: 1px solid ${COLORS.borderPrimary};
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: ${COLORS.borderSecondary};
  }
`;

const ResultsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 0;
  margin-top: 0;
  list-style: none;
  font-size: 0.8rem;
  text-align: left;
  background-color: ${COLORS.bgColorPrimary};
  border-top: none;
  max-height: 350px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 12px ${COLORS.bgColorTertiary};
  border-radius: 0 0 5px 5px;
`;

const ResultItem = styled.li`
  display: grid;
  grid-template-columns: 80px 1fr 40px;
  gap: 5px;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  transition: background opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ResultImage = styled.img`
  max-width: 100px;
`;

const EmptyMessage = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 5px;
  text-align: center;
  color: ${COLORS.textColorTertiary};
  font-size: 0.875rem;
`;

export default Search;
