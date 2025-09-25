import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
      <div>
        <Attributes>&copy; 2025 All rights reserved</Attributes>
      </div>
      <nav>
        <LinksHeading>Links</LinksHeading>
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
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  margin: 0 auto;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 64px;
  width: 100%;
  max-width: 55rem;
  padding: 16px;
`;

const Attributes = styled.p`
  margin-top: 24px;
  font-size: 0.875rem;
  max-width: 18rem;
`;

const LinksHeading = styled.h2`
  font-size: 1.25rem;
`;

const LinksList = styled.ul`
  margin-top: 24px;
  list-style-type: none;
  padding: 0;

  & li:not(:last-child) {
    margin-bottom: 8px;
  }

  & a {
    text-decoration: none;
    font-size: 1rem;
  }
`;

export default Footer;
