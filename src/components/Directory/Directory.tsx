import styled from 'styled-components';

export type DirectoryProps = {
  id: number;
  title: string;
  imagePath: string;
};

const Directory = ({ title, imagePath }: DirectoryProps) => {
  return (
    <DirectoryContainer>
      <DirectoryImage
        style={{ backgroundImage: `url(${imagePath})` }}
      ></DirectoryImage>
      <DirectoryBody>
        <DirectoryLink href="#">{title}</DirectoryLink>
      </DirectoryBody>
    </DirectoryContainer>
  );
};

const DirectoryContainer = styled.div`
  position: relative;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  border-radius: 5px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;
const DirectoryBody = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid lightgrey;
  background-color: white;
  opacity: 0.85;
  will-change: opacity;
  transition: 500ms ease-in-out;

  ${DirectoryContainer}:hover & {
    opacity: 0.95;
  }
`;

const DirectoryImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  will-change: transform;
  transition: transform 500ms ease-in;

  ${DirectoryContainer}:hover & {
    transform: scale(1.1);
    transition: transform 700ms ease-in;
  }
`;

const DirectoryLink = styled.a`
  padding: 0 5px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
`;

export default Directory;
