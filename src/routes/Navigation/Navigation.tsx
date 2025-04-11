import { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { signOutUser } from '../../utils/firebase/firebase';
import UserContext from '../../contexts/user';

import Logo from '../../components/Logo/Logo';

const Navigation: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const location = useLocation();

  const isAuthRoute = location.pathname.startsWith('/auth');
  const homeOrSignin = isAuthRoute ? (
    <NavLink to="/">HOME</NavLink>
  ) : (
    <NavLink to="/auth">SIGN IN</NavLink>
  );

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <>
      <Nav>
        <LogoLink to="/">
          <Logo size={50} />
        </LogoLink>
        <NavLinks>
          {currentUser ? (
            <NavLink to="/" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            homeOrSignin
          )}
        </NavLinks>
      </Nav>
      <Outlet />
    </>
  );
};

const Nav = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;
const LogoLink = styled(Link)`
  height: 100%;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
`;
const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const NavLink = styled(Link)`
  padding: 10px 15px;
  text-transform: uppercase;
  cursor: pointer;
`;

export default Navigation;
