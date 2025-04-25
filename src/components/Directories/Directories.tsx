import styled from 'styled-components';
import Directory, { DirectoryProps } from '../Directory/Directory';

type DirectoriesProps = {
  data: DirectoryProps[];
};

const Directories = ({ data }: DirectoriesProps) => {
  return (
    <DirectoriesContainer>
      {data.map((category) => (
        <Directory key={category.id} {...category} />
      ))}
    </DirectoriesContainer>
  );
};

const DirectoriesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 30px;
  place-content: center;
  text-align: center;
`;

export default Directories;
