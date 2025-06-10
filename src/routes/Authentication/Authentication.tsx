import { Suspense, lazy } from 'react';
import styled from 'styled-components';
const SignUp = lazy(() => import('../../components/SignUp/SignUp'));
const SignIn = lazy(() => import('../../components/SignIn/SignIn'));
import Spinner from '../../components/Spinner/Spinner';

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <Suspense fallback={<Spinner />}>
        <SignIn />
        <SignUp />
      </Suspense>
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
