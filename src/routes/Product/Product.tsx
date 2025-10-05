import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../store/categories/selector';
import styled from 'styled-components';
import ButtonAddToCart from '../../components/ButtonAddToCart/ButtonAddToCart';
import ProductAttributes from '../../components/ProductAttributes/ProductAttributes';
import Spinner from '../../components/Spinner/Spinner';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

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
  if (!productData) return <Spinner />;

  const { name, price, imageSrc, description } = productData;

  return (
    <>
      <Breadcrumbs />
      <ProductContainer>
        <Image src={`/${imageSrc}`} alt={name} />
        <DataBlock>
          <h2>{name}</h2>
          <Description>{description}</Description>
          <ProductAttributes product={productData} />
          <Price>${price}</Price>
          <ButtonWrapper>
            <ButtonAddToCart product={productData}>ADD TO CART</ButtonAddToCart>
          </ButtonWrapper>
        </DataBlock>
      </ProductContainer>
    </>
  );
};

const ProductContainer = styled.div`
  display: flex;
  text-align: center;
  gap: 16px;
`;

const Image = styled.img`
  max-width: 600px;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.low};
`;

const DataBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Description = styled.p`
  text-align: left;
`;

const Price = styled.strong`
  font-size: 1.6rem;
`;

const ButtonWrapper = styled.div`
  margin: 0 auto;
  max-width: 240px;
`;

export default Product;
