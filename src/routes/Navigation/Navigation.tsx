import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation: React.FC = () => {
  return (
    <>
      <Nav>
        <LogoLink to="/">
          <Logo>Logo</Logo>
        </LogoLink>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
        </NavLinks>
      </Nav>
      <Outlet />
    </>
  );
};

const Nav = styled.div``;
const Logo = styled.div``;
const NavLinks = styled.div``;
const NavLink = styled(Link)``;
const LogoLink = styled(Link)``;

export default Navigation;
