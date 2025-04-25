import { ProductType } from './contexts/categories';

export type DataType = {
  title: string;
  url: string;
  items: ProductType[];
};

const DATA: DataType[] = [
  {
    title: 'Office chairs',
    url: 'office',
    items: [
      {
        id: 1,
        name: 'Q-118R',
        imageUrl: './img/products/q-118r.jpg',
        price: 25,
      },
      {
        id: 2,
        name: 'Q-080',
        imageUrl: './img/products/q-080.jpg',
        price: 18,
      },
    ],
  },
  {
    title: 'Gaming chairs',
    url: 'gaming',
    items: [
      {
        id: 3,
        name: 'Winner Lux',
        imageUrl: './img/products/winner-lux.jpg',
        price: 35,
      },
    ],
  },
  {
    title: 'Dining chairs',
    url: 'dining',
    items: [
      {
        id: 4,
        name: 'Mike Velvet',
        imageUrl: './img/products/mike-velvet.jpg',
        price: 16,
      },
    ],
  },
  {
    title: 'Soft chairs',
    url: 'soft',
    items: [
      {
        id: 5,
        name: 'Servio Brego',
        imageUrl: './img/products/servio-brego.jpg',
        price: 25,
      },
      {
        id: 6,
        name: 'Wind Brego',
        imageUrl: './img/products/wind-brego.jpg',
        price: 14,
      },
    ],
  },
  {
    title: 'Bar chairs',
    url: 'bar',
    items: [
      {
        id: 7,
        name: 'Mila H-2 Velvet',
        imageUrl: './img/products/mila-h2-velvet.jpg',
        price: 18,
      },
      {
        id: 8,
        name: 'Colin B Velvet H-2',
        imageUrl: './img/products/colin-b-h2-velvet.jpg',
        price: 14,
      },
    ],
  },
  {
    title: "Children's chairs",
    url: 'children',
    items: [
      {
        id: 9,
        name: 'Q-333',
        imageUrl: './img/products/q-333.jpg',
        price: 20,
      },
      {
        id: 10,
        name: 'Q-G2',
        imageUrl: './img/products/q-g2.jpg',
        price: 12,
      },
    ],
  },
];

export default DATA;
