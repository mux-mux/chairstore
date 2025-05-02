import { CategoryType } from './types/category';

const DATA: CategoryType[] = [
  {
    id: 1,
    title: 'Office chairs',
    path: '/office',
    imageSrc: './img/category/office-chair.jpg',
    items: [
      {
        id: 1,
        name: 'Q-118R',
        imageSrc: './img/products/q-118r.jpg',
        price: 25,
      },
      {
        id: 2,
        name: 'Q-080',
        imageSrc: './img/products/q-080.jpg',
        price: 18,
      },
    ],
  },
  {
    id: 2,
    title: 'Gaming chairs',
    path: '/gaming',
    imageSrc: './img/category/gaming-chair.jpg',
    items: [
      {
        id: 3,
        name: 'Winner Lux',
        imageSrc: './img/products/winner-lux.jpg',
        price: 35,
      },
    ],
  },
  {
    id: 3,
    title: 'Dining chairs',
    path: '/dining',
    imageSrc: './img/category/dining-chair.jpg',
    items: [
      {
        id: 4,
        name: 'Mike Velvet',
        imageSrc: './img/products/mike-velvet.jpg',
        price: 16,
      },
    ],
  },
  {
    id: 4,
    title: 'Soft chairs',
    path: '/soft',
    imageSrc: './img/category/soft-chair.jpg',
    items: [
      {
        id: 5,
        name: 'Servio Brego',
        imageSrc: './img/products/servio-brego.jpg',
        price: 25,
      },
      {
        id: 6,
        name: 'Wind Brego',
        imageSrc: './img/products/wind-brego.jpg',
        price: 14,
      },
    ],
  },
  {
    id: 5,
    title: 'Bar chairs',
    path: '/bar',
    imageSrc: './img/category/bar-chair.jpg',
    items: [
      {
        id: 7,
        name: 'Mila H-2 Velvet',
        imageSrc: './img/products/mila-h2-velvet.jpg',
        price: 18,
      },
      {
        id: 8,
        name: 'Colin B Velvet H-2',
        imageSrc: './img/products/colin-b-h2-velvet.jpg',
        price: 14,
      },
    ],
  },
  {
    id: 6,
    title: "Children's chairs",
    path: '/children',
    imageSrc: './img/category/childrens-chair.jpg',
    items: [
      {
        id: 9,
        name: 'Q-333',
        imageSrc: './img/products/q-333.jpg',
        price: 20,
      },
      {
        id: 10,
        name: 'Q-G2',
        imageSrc: './img/products/q-g2.jpg',
        price: 12,
      },
    ],
  },
];

//For adding firestore data
// useEffect(() => {
//   addCollectionsAndDocuments('categories', DATA);
// }, []);

export default DATA;
