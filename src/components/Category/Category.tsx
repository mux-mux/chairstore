import { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants';
import type { CategoryType } from '../../types/category';

const Category = ({ title, path, imageSrc }: CategoryType) => {
  return (
    <CategoryLink to={path}>
      <Image src={imageSrc}></Image>
      <Box>
        <Name>{title}</Name>
      </Box>
    </CategoryLink>
  );
};

const CategoryLink = styled(Link)`
  position: relative;
  height: 240px;
  border: 1px solid ${COLORS.borderPrimary};
  border-radius: 5px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;

const Box = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  border: 1px solid ${COLORS.borderPrimary};
  background-color: ${COLORS.bgColorPrimary};
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
  will-change: transform;
  transition: transform 500ms ease-in;

  @media (hover: hover) and (pointer: fine) {
    ${CategoryLink}:hover & {
      transform: scale(1.05);
      transition: transform 700ms ease-in;
    }
  }
`;

const Name = styled.span`
  padding: 0 5px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
`;

export default memo(Category);
