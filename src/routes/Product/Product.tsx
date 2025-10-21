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
    <PageWrapper>
      <Breadcrumbs name={name} />
      <ProductContainer>
        <ImageWrapper>
          <Image src={`/${imageSrc}`} alt={name} />
        </ImageWrapper>
        <DataBlock>
          <Title>{name}</Title>
          <Description>{description}</Description>
          <ProductAttributes product={productData} />
          <PriceWrapper>
            <Price>${price}</Price>
          </PriceWrapper>
          <ButtonWrapper>
            <ButtonAddToCart product={productData}>ADD TO CART</ButtonAddToCart>
          </ButtonWrapper>
        </DataBlock>
      </ProductContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const ProductContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 24px;

  @media (max-width: ${({ theme }) => theme.mediaQueries.laptop}) {
    flex-direction: column;
    gap: 24px;
    margin-top: 16px;
  }

  @media (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    gap: 16px;
  }
`;

const ImageWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.mediaQueries.laptop}) {
    max-width: 100%;
    align-items: center;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 600px;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.low};
  object-fit: cover;

  @media (max-width: ${({ theme }) => theme.mediaQueries.laptop}) {
    max-width: 500px;
  }

  @media (max-width: ${({ theme }) => theme.mediaQueries.tablet}) {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

const DataBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.mediaQueries.laptop}) {
    gap: 16px;
  }

  @media (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    gap: 12px;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize[5]};
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    font-size: ${({ theme }) => theme.fontSize[4]};
  }
`;

const Description = styled.p`
  text-align: left;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[2]};

  @media (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    line-height: 1.5;
    font-size: ${({ theme }) => theme.fontSize[1]};
  }
`;

const PriceWrapper = styled.div`
  margin-top: 8px;

  @media (max-width: ${({ theme }) => theme.mediaQueries.laptop}) {
    margin-top: 4px;
  }
`;

const Price = styled.strong`
  font-size: ${({ theme }) => theme.fontSize[5]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: block;

  @media (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    font-size: ${({ theme }) => theme.fontSize[4]};
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 12px;

  @media (max-width: ${({ theme }) => theme.mediaQueries.laptop}) {
    max-width: 100%;
    margin-top: 8px;
  }

  @media (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    button {
      width: 100%;
    }
  }
`;

export default Product;
