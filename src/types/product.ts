export type ProductType = {
  id: number;
  name: string;
  imageSrc: string;
  price: number;
  quantity?: number;
};

export type ProductsRouteParams = {
  category?: string;
};
