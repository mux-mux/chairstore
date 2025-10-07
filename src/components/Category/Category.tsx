import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { CategoryType } from '../../types/category';

const Category = ({ title, path, imageSrc }: CategoryType) => {
  return (
    <CategoryLink to={path}>
      <ImageWrapper>
        <Image src={`/${imageSrc}`}></Image>
        <Name>{title}</Name>
      </ImageWrapper>
    </CategoryLink>
  );
};

const CategoryLink = styled(Link)`
  display: block;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.low};
  background: ${({ theme }) => theme.colors.surface};
  transition: box-shadow 0.1s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.mid};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`;

const Name = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  padding: ${({ theme }) => theme.space[1]}px;
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`;

export default Category;
