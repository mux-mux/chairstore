'use client';

import styled from 'styled-components';

export default function NotFound() {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Description>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Description>
      <Button href="/">Back to Home</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin: 1rem 0 2rem;
  opacity: 0.9;
`;

const Description = styled.p`
  font-size: 1.125rem;
  margin-bottom: 3rem;
  opacity: 0.8;
  max-width: 500px;
  line-height: 1.6;
`;

const Button = styled.a`
  display: inline-block;
  padding: 12px 32px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;
