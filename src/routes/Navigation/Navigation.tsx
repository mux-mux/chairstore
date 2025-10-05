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
import Footer from '../../components/Footer/Footer';

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
      <Footer />
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
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.low};
  padding: ${({ theme }) => theme.space[3]}px ${({ theme }) => theme.space[4]}px;
  border-radius: ${({ theme }) => theme.radii.md};
  position: sticky;
  top: 0;
  z-index: 10;

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
const NavLinks = styled.nav`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space[4]}px;

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    width: 80%;
  }
`;
const NavLink = styled(Link)`
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
  right: 16px;
`;

export default Navigation;
