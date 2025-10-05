import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { CategoryType } from '../../types/category';

const Category = ({ title, path, imageSrc }: CategoryType) => {
  return (
    <CategoryLink to={path}>
      <Image src={`/${imageSrc}`}></Image>
      <Box>
        <Name>{title}</Name>
      </Box>
    </CategoryLink>
  );
};

const CategoryLink = styled(Link)`
  position: relative;
  padding: ${({ theme }) => theme.space[2]}px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.low};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.mid};
  }
`;

const Box = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  opacity: 0.85;
  will-change: opacity;
  transition: 500ms ease-in-out;

  @media (hover: hover) and (pointer: fine) {
    ${CategoryLink}:hover & {
      opacity: 0.95;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;

  @media (prefers-reduced-motion: no-preference) {
    will-change: transform;
    transition: transform 500ms ease-in;
  }

  @media (prefers-reduced-motion: no-preference) {
    @media (hover: hover) and (pointer: fine) {
      ${CategoryLink}:hover & {
        transform: scale(1.05);
        transition: transform 700ms ease-in;
      }
    }
  }
`;

const Name = styled.span`
  padding: 0 5px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
`;

export default Category;
