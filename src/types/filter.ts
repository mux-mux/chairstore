import { ProductType } from './product';

export type FiltersTypes = {
  color: string | null;
  seat: string | null;
  legs: string | null;
  spec: string | null;
};

export type SidebarFiltersProps = {
  products: ProductType[];
  handleFilterChange: (filters: FiltersTypes) => void;
  isOpen: boolean;
  onClose: () => void;
};
