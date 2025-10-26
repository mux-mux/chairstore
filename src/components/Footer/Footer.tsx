import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
      <div>
        <Attributes>&copy; 2025 All rights reserved</Attributes>
      </div>
      <div>
        <LinksHeading>Links</LinksHeading>
        <nav>
          <LinksList>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/termsOfUse">Terms of Use</NavLink>
            </li>
            <li>
              <NavLink to="/privacyPolicy">Privacy Policy</NavLink>
            </li>
          </LinksList>
        </nav>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  margin-top: ${({ theme }) => theme.space[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.space[6]};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize[1]};

  @media (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    padding: ${({ theme }) => theme.space[3]};
  }
`;

const Attributes = styled.p`
  margin-top: ${({ theme }) => theme.space[5]};
  font-size: ${({ theme }) => theme.fontSize[1]};
  max-width: 280px;
`;

const LinksHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize[3]};
`;

const LinksList = styled.ul`
  margin-top: ${({ theme }) => theme.space[5]};
  list-style-type: none;
  padding: ${({ theme }) => theme.space[0]};

  & li:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space[2]};
  }

  & a {
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSize[2]};
  }
`;

export default Footer;
