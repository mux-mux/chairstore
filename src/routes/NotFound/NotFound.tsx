import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../constants';

const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Message>Sorry, the page you are looking for doesn't exist.</Message>
      <HomeLink to="/">🏠 Go Back Home</HomeLink>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  color: ${COLORS.textColorPrimary};
`;

const Title = styled.h1`
  font-size: 120px;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 32px;
  margin-top: -20px;
`;

const Message = styled.p`
  margin: 20px 0;
  font-size: 18px;
`;

const HomeLink = styled(Link)`
  margin-top: 20px;
  padding: 12px 24px;
  color: ${COLORS.textColorPrimary};
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
`;

export default NotFound;
