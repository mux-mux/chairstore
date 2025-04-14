import { useContext } from 'react';
import ProductsContext from '../../contexts/products';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div>
      {products?.map(({ id, name, imageUrl, price }) => (
        <div key={id}>
          <h1>{name}</h1>
          <img src={imageUrl} alt={name} />
          <div>{price}</div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
