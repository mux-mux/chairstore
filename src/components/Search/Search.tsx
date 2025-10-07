import { useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  selectCategories,
  selectProducts,
} from '../../store/categories/selector';
import type { ProductType } from '../../types/product';
import type { CategoryType } from '../../types/category';
import useOutsideClick from '../../hooks/useClickOutside';
import { COLORS } from '../../constants';

const Search = () => {
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const allProducts = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const handleClickOutside = () => {
    setQuery('');
  };

  useOutsideClick(searchRef, handleClickOutside);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    return allProducts.filter((product: ProductType) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allProducts]);

  const findCategoryByProductId = (id: string, categories: CategoryType[]) => {
    for (const category of categories) {
      if (category.items.some((product) => product.id === id)) {
        return category.path;
      }
    }
    return null;
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchInput
        type="text"
        placeholder="Search for a product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.trim() && filteredProducts.length > 0 && (
        <ResultsList>
          {filteredProducts.map(({ id, name, imageSrc, price }) => {
            const categoryPath = findCategoryByProductId(id, categories);
            return (
              <ResultItem key={`${categoryPath}/${id}`}>
                <ResultLink
                  to={`${categoryPath}/${id}`}
                  onClick={() => setQuery('')}
                >
                  <ResultImage src={`/${imageSrc}`} alt={name} />
                  <span>{name}</span>
                  <span>${price}</span>
                </ResultLink>
              </ResultItem>
            );
          })}
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
  font-size: 0.8rem;
  padding: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[3]}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
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
  box-shadow: ${({ theme }) => theme.shadows.low};
  border-radius: 0 0 5px 5px;
`;

const ResultItem = styled.li`
  padding: 5px 0;
  cursor: pointer;
  transition: background opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ResultLink = styled(Link)`
  display: grid;
  grid-template-columns: 80px 1fr 40px;
  gap: 5px;
  align-items: center;
`;

const ResultImage = styled.img`
  max-width: 100px;
`;

const EmptyMessage = styled.div`
  position: absolute;
  left: 50%;
  width: 100%;
  padding: ${({ theme }) => theme.space[2]}px;
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.low};

  transform: translateX(-50%);
  margin-top: ${({ theme }) => theme.space[1]}px;
  text-align: center;
  color: ${COLORS.textColorTertiary};
  background-color: #fff;
  font-size: 0.875rem;
`;

export default Search;
