import { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { signOutUser } from '../../utils/firebase/firebase';

import UserContext from '../../contexts/user';
import CartContext from '../../contexts/cart';

import Logo from '../../components/Logo/Logo';
import CartIcon from '../../components/CartIcon/CartIcon';
import CartDropdown from '../../components/CartDropdown/CartDropdown';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const location = useLocation();
  const isRoot = location.pathname === '/';

  return (
    <>
      <NavContainer>
        <LogoLink to="/">
          <Logo size={50} />
        </LogoLink>
        <NavLinks>
          {!isRoot && <NavLink to="/">CATEGORIES</NavLink>}
          {currentUser ? (
            <NavLink to="/" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavContainer>
      <Outlet />
    </>
  );
};

const NavContainer = styled.div`
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
  padding: 10px;
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
