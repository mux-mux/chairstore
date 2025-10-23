import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import type { FiltersTypes, SidebarFiltersProps } from '../../types/filter';
import useClickOutside from '../../hooks/useClickOutside';
import { overlayStyles } from '../../styles/shared';

const SidebarFilters = ({
  products,
  handleFilterChange,
  isOpen = false,
  onClose,
}: SidebarFiltersProps) => {
  const [filters, setFilters] = useState<FiltersTypes>({
    color: null,
    seat: null,
    legs: null,
    spec: null,
  });
  const sidebarRef = useRef(null);
  useClickOutside(sidebarRef, onClose);

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
    <>
      <Overlay $isOpen={isOpen} />

      <Sidebar $isOpen={isOpen} ref={sidebarRef}>
        <Header>
          Filters
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

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
    </>
  );
};

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.low};
  padding: ${({ theme }) => theme.space[4]};
  min-width: 240px;
  text-align: left;
  transition: transform 0.3s ease-in-out;

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(${(p) => (p.$isOpen ? '0' : '-100%')});
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 0;
    width: 70%;
    display: block;
    isolation: isolate;
    z-index: 110;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    display: ${(p) => (p.$isOpen ? 'block' : 'none')};
    ${overlayStyles}
  }
`;

const Header = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.space[0]};
`;

const CloseBtn = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSize[4]};
  cursor: pointer;

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    display: initial;
  }
`;

const FilterName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize[2]};
  margin-bottom: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSize[2]};
  color: ${({ theme }) => theme.colors.textPrimary};

  input {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default SidebarFilters;
