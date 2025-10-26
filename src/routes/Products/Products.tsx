import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/selector';
import ProductCard from '../../components/ProductCard/ProductCard';
import SidebarFilters from '../../components/SidebarFilters/SidebarFilters';
import Spinner from '../../components/Spinner/Spinner';
import type { ProductType, ProductsRouteParams } from '../../types/product';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { FiFilter } from 'react-icons/fi';

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filtered, setFiltered] = useState<ProductType[]>([]);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const { category } = useParams<ProductsRouteParams>();
  const categories = useSelector(selectCategories);

  const categoryData = categories.find(
    (cat) =>
      cat.path.replace(/^\/|\/$/g, '').toLowerCase() ===
      (category || '').toLowerCase()
  );

  useEffect(() => {
    if (categoryData) {
      setProducts(categoryData.items || []);
      setFiltered(categoryData.items || []);
    }
  }, [categoryData]);

  const handleFilterChange = useCallback(
    (filters: {
      color?: string | null;
      seat?: string | null;
      legs?: string | null;
      spec?: string | null;
    }) => {
      let filteredProducts = products;

      if (filters.color) {
        filteredProducts = filteredProducts.filter(
          (p) => p.filters.color === filters.color
        );
      }

      if (filters.seat) {
        filteredProducts = filteredProducts.filter((p) =>
          p.filters.seat.includes(filters.seat!)
        );
      }

      if (filters.legs) {
        filteredProducts = filteredProducts.filter(
          (p) => p.filters.legs === filters.legs
        );
      }

      if (filters.spec) {
        filteredProducts = filteredProducts.filter((p) =>
          p.filters.specs?.includes(filters.spec!)
        );
      }

      setFiltered(filteredProducts);
    },
    [products]
  );

  return (
    <>
      <BreadcrumbsWrapper>
        <Breadcrumbs />
        <FilterButton onClick={() => setFilterOpen(true)}>
          <FilterIcon size={24} />
        </FilterButton>
      </BreadcrumbsWrapper>
      <section>
        <Title>{categoryData?.title}</Title>
        {!categories || categories.length === 0 ? (
          <Spinner />
        ) : (
          <MainContainer>
            <SidebarFilters
              products={products}
              handleFilterChange={handleFilterChange}
              isOpen={isFilterOpen}
              onClose={() => setFilterOpen(false)}
            />

            <ProductsContainer>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductsContainer>
          </MainContainer>
        )}
      </section>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
`;

const BreadcrumbsWrapper = styled.div`
  position: relative;
`;

const FilterButton = styled.button`
  display: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  width: 60px;

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    display: initial;
  }
`;

const FilterIcon = styled(FiFilter)`
  transform: translateY(2px);
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  align-items: flex-start;
  place-content: flex-start;
  padding: ${({ theme }) => theme.space[0]} ${({ theme }) => theme.space[4]};
  gap: ${({ theme }) => theme.space[4]};
  flex: 1;

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    padding: ${({ theme }) => theme.space[0]};
  }
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize[6]};
  margin-bottom: ${({ theme }) => theme.space[5]};
`;

export default Products;
