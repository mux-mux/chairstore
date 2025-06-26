import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/selector';
import styled from 'styled-components';
import ButtonAddToCart from '../../components/ButtonAddToCart/ButtonAddToCart';

const Product = () => {
  const { category, product } = useParams();
  const categories = useSelector(selectCategories);

  const categoryData = categories.find(
    (cat) =>
      cat.path.replace(/^\/|\/$/g, '').toLowerCase() ===
      (category || '').toLowerCase()
  );

  const productData = categoryData?.items.find(
    (item) => item.id.toLowerCase() === (product || '').toLowerCase()
  );

  if (!productData) return <div>Product not found</div>;

  return (
    <ProductContainer>
      <ProductImg src={`/${productData.imageSrc}`} alt={productData.name} />
      <ProductDataBlock>
        <h2>{productData.name}</h2>
        <strong>${productData.price}</strong>
        <ButtonAddToCart product={productData}>ADD TO CART</ButtonAddToCart>
      </ProductDataBlock>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  display: flex;
  text-align: center;
`;

const ProductImg = styled.img`
  max-width: 800px;
`;

const ProductDataBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Product;
