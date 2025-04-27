import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants';

export type DirectoryProps = {
  id: number;
  title: string;
  url: string;
  imagePath: string;
};

const Directory = ({ title, url, imagePath }: DirectoryProps) => {
  return (
    <DirectoryLink to={url}>
      <Image imagePath={imagePath}></Image>
      <Box>
        <Name>{title}</Name>
      </Box>
    </DirectoryLink>
  );
};

const DirectoryLink = styled(Link)`
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

  ${DirectoryLink}:hover & {
    opacity: 0.95;
  }
`;

const Image = styled.div<{ imagePath: string }>`
  width: 100%;
  height: 100%;
  background-image: ${({ imagePath }) => `url(${imagePath})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  will-change: transform;
  transition: transform 500ms ease-in;

  ${DirectoryLink}:hover & {
    transform: scale(1.1);
    transition: transform 700ms ease-in;
  }
`;

const Name = styled.span`
  padding: 0 5px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
`;

export default Directory;
