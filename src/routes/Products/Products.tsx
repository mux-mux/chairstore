import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/selector';
import ProductCard from '../../components/ProductCard/ProductCard';
import SidebarFilters from '../../components/SidebarFilters/SidebarFilters';
import Spinner from '../../components/Spinner/Spinner';
import type { ProductType, ProductsRouteParams } from '../../types/product';

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filtered, setFiltered] = useState<ProductType[]>([]);
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
      <Title>{categoryData?.title}</Title>
      {!categories || categories.length === 0 ? (
        <Spinner />
      ) : (
        <MainContainer>
          <SidebarFilters
            products={products}
            handleFilterChange={handleFilterChange}
          />

          <ProductsContainer>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsContainer>
        </MainContainer>
      )}
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  padding: 0 20px;
  gap: 20px;
  flex: 1;
`;
const Title = styled.h1`
  text-transform: uppercase;
  font-size: 38px;
  margin-bottom: 25px;
`;

export default Products;
