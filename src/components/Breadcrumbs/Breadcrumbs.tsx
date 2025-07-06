import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../constants';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <BreadcrumbNav>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        {pathnames.map((segment, index) => {
          const to = '/' + pathnames.slice(0, index + 1).join('/');
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);
          const isLast = index === pathnames.length - 1;

          return (
            <BreadcrumbItem key={to}>
              {isLast ? <span>{label}</span> : <Link to={to}>{label}</Link>}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

const BreadcrumbNav = styled.nav`
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const BreadcrumbList = styled.ul`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    content: '/';
    margin: 0 5px;
    color: ${COLORS.textColorTertiary};
  }
`;

export default Breadcrumbs;
