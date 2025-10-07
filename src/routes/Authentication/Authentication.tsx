import styled from 'styled-components';
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignIn />
      <SignUp />
    </AuthenticationContainer>
  );
};

const AuthenticationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[6]}px;
  justify-content: space-evenly;
  margin: auto 0;
`;

export default Authentication;
