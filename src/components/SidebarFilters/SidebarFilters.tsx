import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { ProductType } from '../../types/product';
import { COLORS } from '../../constants';

type FiltersTypes = {
  color: string | null;
  material: string | null;
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
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  const allMaterials = new Set<string>();
  const allColors = new Set<string>();
  const allSpecs = new Set<string>();

  products.forEach((p) => {
    p.filters.material.forEach((m) => allMaterials.add(m));
    allColors.add(p.filters.color);
    p.filters.specs?.forEach((s) => allSpecs.add(s));
  });

  useEffect(() => {
    handleFilterChange({
      color: selectedColor,
      material: selectedMaterial,
      spec: selectedSpec,
    });
  }, [selectedColor, selectedMaterial, selectedSpec, handleFilterChange]);

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

      <FilterGroup>Material:</FilterGroup>
      {[...allMaterials].map((material) => (
        <Label key={material}>
          <input
            type="checkbox"
            name="material"
            checked={selectedMaterial === material}
            onChange={() => {
              setSelectedMaterial(
                material === selectedMaterial ? null : material
              );
            }}
          />
          {material}
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
