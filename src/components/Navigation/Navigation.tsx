import { useState, useRef, Suspense, lazy } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/selector';
import { selectUser } from '../../store/user/selector';
import { signOutUser } from '../../utils/firebase/firebase';
import Logo from '../Logo/Logo';
import CartIcon from '../CartIcon/CartIcon';
import Spinner from '../Spinner/Spinner';
import Search from '../Search/Search';
const CartDropdown = lazy(() => import('../CartDropdown/CartDropdown'));
import { MEDIA_QUERIES } from '../../constants';
import Footer from '../Footer/Footer';
import useOutsideClick from '../../hooks/useClickOutside';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const currentUser = useSelector(selectUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  useOutsideClick(mobileMenuRef, setMenuOpen);

  const location = useLocation();
  const isRoot = location.pathname === '/';

  return (
    <>
      <NavContainer>
        <LogoLink to="/">
          <Logo size={50} />
        </LogoLink>

        <SearchWrapper>
          <Search />
        </SearchWrapper>

        <RightSection>
          <NavLinks>
            {!isRoot && <NavLink to="/">CATEGORIES</NavLink>}
            {currentUser ? (
              <NavButton onClick={signOutUser}>SIGN OUT</NavButton>
            ) : (
              <NavLink to="/auth">SIGN IN</NavLink>
            )}
          </NavLinks>

          <CartIcon />

          <Hamburger
            onClick={() => setMenuOpen((prev: boolean) => !prev)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </Hamburger>
        </RightSection>
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

      {menuOpen && (
        <MobileMenu ref={mobileMenuRef}>
          {!isRoot && <MobileLink to="/">CATEGORIES</MobileLink>}
          {currentUser ? (
            <MobileButton onClick={signOutUser}>SIGN OUT</MobileButton>
          ) : (
            <MobileLink to="/auth">SIGN IN</MobileLink>
          )}
        </MobileMenu>
      )}

      <Outlet />
      <Footer />
    </>
  );
};

const NavContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.low};
  padding: ${({ theme }) => theme.space[3]}px ${({ theme }) => theme.space[4]}px;
  position: sticky;
  top: 0;
  z-index: 20;

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    height: 60px;
    justify-content: space-between;
    position: unset;
  }
`;
const LogoLink = styled(Link)`
  height: 100%;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-right: auto;

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    justify-content: flex-start;
    margin-left: ${({ theme }) => theme.space[2]}px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]}px;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]}px;

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    display: none;
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

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 22px;
  height: 16px;
  background: none;
  border: none;
  cursor: pointer;

  span {
    display: block;
    height: 2px;
    width: 100%;
    background: ${({ theme }) => theme.colors.textPrimary};
    border-radius: 2px;
  }

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]}px;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.space[4]}px;
  box-shadow: ${({ theme }) => theme.shadows.mid};
  position: absolute;
  top: 70px;
  right: 0;
  width: 200px;
  border-radius: ${({ theme }) => theme.radii.md};
  z-index: 100;

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    top: 60px;
  }
`;

const MobileLink = styled(Link)`
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavButton = styled.button`
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileButton = styled(NavButton)`
  width: 100%;
  text-align: left;
  padding: 8px 0;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  right: 16px;

  @media screen and (max-width: ${MEDIA_QUERIES.mobile}) {
    right: 54px;
  }
`;

export default Navigation;
