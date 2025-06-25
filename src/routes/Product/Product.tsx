import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/selector';
import styled from 'styled-components';

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
    <ProductPageContainer>
      <img src={`/${productData.imageSrc}`} alt={productData.name} />
      <h2>{productData.name}</h2>
      <strong>${productData.price}</strong>
    </ProductPageContainer>
  );
};

const ProductPageContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

export default Product;
