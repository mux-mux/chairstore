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
  width: 900px;
  justify-content: space-between;
  margin: 30px auto;
`;

export default Authentication;
