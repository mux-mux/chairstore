import { useState, useRef, Suspense, lazy } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/selector';
import { selectUser } from '../../store/user/selector';
import { signOutUser } from '../../utils/firebase/firebase';
import Logo from '../Logo/Logo';
import CartIcon from '../CartIcon/CartIcon';
import Spinner from '../Spinner/Spinner';
import Search from '../Search/Search';
const CartDropdown = lazy(() => import('../CartDropdown/CartDropdown'));
import Footer from '../Footer/Footer';
import useClickOutside from '../../hooks/useClickOutside';
import { overlayStyles } from '../../styles/shared';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const currentUser = useSelector(selectUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  useClickOutside(mobileMenuRef, setMenuOpen);

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
        <>
          <MobileMenu ref={mobileMenuRef}>
            {!isRoot && (
              <MobileLink to="/" onClick={() => setMenuOpen(false)}>
                CATEGORIES
              </MobileLink>
            )}
            {currentUser ? (
              <MobileButton
                onClick={() => {
                  signOutUser();
                  setMenuOpen(false);
                }}
              >
                SIGN OUT
              </MobileButton>
            ) : (
              <MobileLink to="/auth" onClick={() => setMenuOpen(false)}>
                SIGN IN
              </MobileLink>
            )}
          </MobileMenu>
          <MobileMenuOverlay />
        </>
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
  border-radius: ${({ theme }) => theme.radius.md};
  position: sticky;
  top: 0;
  z-index: 20;

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    height: 60px;
    padding: ${({ theme }) => theme.space[2]}px;
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

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    justify-content: flex-start;
    margin-left: ${({ theme }) => theme.space[2]}px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]}px;

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    gap: ${({ theme }) => theme.space[2]}px;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]}px;

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    display: none;
  }
`;

const NavLinkStyles = css`
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavLink = styled(Link)`
  ${NavLinkStyles}
`;

const NavButton = styled.button`
  ${NavLinkStyles}
  font-size: ${({ theme }) => theme.fontSize[2]};
  font-family: inherit;
  background: transparent;
  border: none;
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

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
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
  border-radius: ${({ theme }) => theme.radius.md};
  z-index: 101;

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    top: 60px;
  }
`;

const MobileMenuOverlay = styled.div`
  ${overlayStyles}
`;

const MobileLink = styled(Link)`
  font-weight: 500;
  text-transform: uppercase;
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 8px 0;

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

  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.mobile}) {
    right: 40px;
  }
`;

export default Navigation;
