import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { ProductType } from '../../types/product';
import { MEDIA_QUERIES } from '../../constants';

type FiltersTypes = {
  color: string | null;
  seat: string | null;
  legs: string | null;
  spec: string | null;
};

type SidebarFiltersProps = {
  products: ProductType[];
  handleFilterChange: (filters: FiltersTypes) => void;
};

const SidebarFilters = ({
  products,
  handleFilterChange,
}: SidebarFiltersProps) => {
  const [filters, setFilters] = useState<FiltersTypes>({
    color: null,
    seat: null,
    legs: null,
    spec: null,
  });

  const allSeats = new Set<string>();
  const allLegs = new Set<string>();
  const allColors = new Set<string>();
  const allSpecs = new Set<string>();

  products.forEach((p) => {
    allColors.add(p.filters.color);
    allLegs.add(p.filters.legs);
    p.filters.seat.forEach((m) => allSeats.add(m));
    p.filters.specs?.forEach((s) => allSpecs.add(s));
  });

  useEffect(() => {
    handleFilterChange(filters);
  }, [filters, handleFilterChange]);

  const toggleFilter = (key: keyof FiltersTypes, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  return (
    <Sidebar>
      <Header>Filters</Header>

      <FilterName>Color:</FilterName>
      {[...allColors].map((color) => (
        <Checkbox key={color}>
          <input
            type="checkbox"
            name="color"
            checked={filters.color === color}
            onChange={() => toggleFilter('color', color)}
          />
          {color}
        </Checkbox>
      ))}

      <FilterName>Seat:</FilterName>
      {[...allSeats].map((seat) => (
        <Checkbox key={seat}>
          <input
            type="checkbox"
            name="seat"
            checked={filters.seat === seat}
            onChange={() => toggleFilter('seat', seat)}
          />
          {seat}
        </Checkbox>
      ))}

      <FilterName>Legs:</FilterName>
      {[...allLegs].map((legs) => (
        <Checkbox key={legs}>
          <input
            type="checkbox"
            name="legs"
            checked={filters.legs === legs}
            onChange={() => toggleFilter('legs', legs)}
          />
          {legs}
        </Checkbox>
      ))}

      {[...allSpecs].length > 0 && (
        <>
          <FilterName>Specs:</FilterName>
          {[...allSpecs].map((spec) => (
            <Checkbox key={spec}>
              <input
                type="checkbox"
                name="spec"
                checked={filters.spec === spec}
                onChange={() => toggleFilter('spec', spec)}
              />
              {spec}
            </Checkbox>
          ))}
        </>
      )}
    </Sidebar>
  );
};

const Sidebar = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.low};
  padding: ${({ theme }) => theme.space[4]}px;
  min-width: 240px;
  text-align: left;

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    display: none;
  }
`;

const Header = styled.h2`
  position: relative;
  margin-top: 0;
`;

const FilterName = styled.h3`
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.space[2]}px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]}px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  input {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default SidebarFilters;
