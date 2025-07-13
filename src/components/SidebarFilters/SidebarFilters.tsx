import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { ProductType } from '../../types/product';
import { COLORS } from '../../constants';

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

      <FilterGroup>Color:</FilterGroup>
      {[...allColors].map((color) => (
        <Label key={color}>
          <input
            type="checkbox"
            name="color"
            checked={filters.color === color}
            onChange={() => toggleFilter('color', color)}
          />
          {color}
        </Label>
      ))}

      <FilterGroup>Seat:</FilterGroup>
      {[...allSeats].map((seat) => (
        <Label key={seat}>
          <input
            type="checkbox"
            name="seat"
            checked={filters.seat === seat}
            onChange={() => toggleFilter('seat', seat)}
          />
          {seat}
        </Label>
      ))}

      <FilterGroup>Legs:</FilterGroup>
      {[...allLegs].map((legs) => (
        <Label key={legs}>
          <input
            type="checkbox"
            name="legs"
            checked={filters.legs === legs}
            onChange={() => toggleFilter('legs', legs)}
          />
          {legs}
        </Label>
      ))}

      {[...allSpecs].length > 0 && (
        <>
          <FilterGroup>Specs:</FilterGroup>
          {[...allSpecs].map((spec) => (
            <Label key={spec}>
              <input
                type="checkbox"
                name="spec"
                checked={filters.spec === spec}
                onChange={() => toggleFilter('spec', spec)}
              />
              {spec}
            </Label>
          ))}
        </>
      )}
    </Sidebar>
  );
};

const Sidebar = styled.div`
  min-width: 200px;
  padding: 0 20px;
  text-align: left;
  border-right: 1px solid ${COLORS.borderPrimary};
`;

const Header = styled.h2`
  position: relative;
  top: -5px;
  margin-top: 0;
`;

const FilterGroup = styled.h3`
  margin: 0;
`;

const Label = styled.label`
  display: block;
`;

export default SidebarFilters;
