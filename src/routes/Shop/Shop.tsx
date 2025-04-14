import PRODUCTS from '../../data.json';

const Shop = () => {
  return (
    <div>
      {PRODUCTS.map(({ id, name, imageUrl, price }) => (
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
