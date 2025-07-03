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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [selectedLegs, setSelectedLegs] = useState<string | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  const allSeats = new Set<string>();
  const allLegs = new Set<string>();
  const allColors = new Set<string>();
  const allSpecs = new Set<string>();

  products.forEach((p) => {
    p.filters.seat.forEach((m) => allSeats.add(m));
    allColors.add(p.filters.color);
    allLegs.add(p.filters.legs);
    p.filters.specs?.forEach((s) => allSpecs.add(s));
  });

  useEffect(() => {
    handleFilterChange({
      color: selectedColor,
      seat: selectedSeat,
      legs: selectedLegs,
      spec: selectedSpec,
    });
  }, [
    selectedColor,
    selectedSeat,
    selectedLegs,
    selectedSpec,
    handleFilterChange,
  ]);

  return (
    <Sidebar>
      <Header>Filters</Header>

      <FilterGroup>Color:</FilterGroup>
      {[...allColors].map((color) => (
        <Label key={color}>
          <input
            type="checkbox"
            name="color"
            checked={selectedColor === color}
            onChange={() => {
              setSelectedColor(color === selectedColor ? null : color);
            }}
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
            checked={selectedSeat === seat}
            onChange={() => {
              setSelectedSeat(seat === selectedSeat ? null : seat);
            }}
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
            checked={selectedLegs === legs}
            onChange={() => {
              setSelectedLegs(legs === selectedLegs ? null : legs);
            }}
          />
          {legs}
        </Label>
      ))}

      {[...allSpecs].length > 0 ? <FilterGroup>Specs:</FilterGroup> : ''}
      {[...allSpecs].map((spec) => (
        <Label key={spec}>
          <input
            type="checkbox"
            name="spec"
            checked={selectedSpec === spec}
            onChange={() => {
              setSelectedSpec(spec === selectedSpec ? null : spec);
            }}
          />
          {spec}
        </Label>
      ))}
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
