import { Suspense, lazy } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/selector';
import { selectUser } from '../../store/user/selector';
import { signOutUser } from '../../utils/firebase/firebase';
import Logo from '../../components/Logo/Logo';
import CartIcon from '../../components/CartIcon/CartIcon';
import Spinner from '../../components/Spinner/Spinner';
import Search from '../../components/Search/Search';
const CartDropdown = lazy(
  () => import('../../components/CartDropdown/CartDropdown')
);
import { MEDIA_QUERIES } from '../../constants';

const Navigation = () => {
  const currentUser = useSelector(selectUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const location = useLocation();
  const isRoot = location.pathname === '/';

  return (
    <>
      <NavContainer>
        <LogoLink to="/">
          <Logo size={50} />
        </LogoLink>
        <NavLinks>
          <Search />
          {!isRoot && <NavLink to="/">CATEGORIES</NavLink>}
          {currentUser ? (
            <NavLink to="/" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <NavLink to="/contact">CONTACT US</NavLink>
          <CartIcon />
        </NavLinks>
        {isCartOpen && (
          <Suspense
            fallback={
              <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
            }
          >
            <CartDropdown />
          </Suspense>
        )}
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

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    height: 60px;
    margin-bottom: 15px;
  }
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

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    width: 80%;
  }
`;
const NavLink = styled(Link)`
  padding: 10px 15px;
  text-transform: uppercase;
  cursor: pointer;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  right: 0;
`;

export default Navigation;
