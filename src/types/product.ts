export type ProductType = {
  id: string;
  name: string;
  imageSrc: string;
  description: string;
  price: number;
  quantity?: number;
  filters: {
    width: number;
    height: number;
    depth: number;
    color: string;
    material: string[];
    legs: string;
    seatHeight: number;
    seatDepth: number;
    maxWeight: number;
    specs?: string[];
  };
};

export type ProductsRouteParams = {
  category?: string;
};

export type ProductRouteParams = {
  product?: string;
};
