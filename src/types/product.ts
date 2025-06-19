export type ProductType = {
  id: string;
  name: string;
  imageSrc: string;
  price: number;
  quantity?: number;
};

export type ProductsRouteParams = {
  category?: string;
};
