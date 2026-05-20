import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((p) => p);

  const products = useSelector((state) => state.products.items);
  const noShowRoutes = ['/unauthorized', '/login'];

  if (paths.length === 0) return null;
  const inValidRoute = noShowRoutes.includes(location.pathname);
  if (inValidRoute) return null;
  return (
    <nav className='breadcrumbs'>
      <Link to='/' className='breadcrumb-link'>
        Home
      </Link>
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        let displayName =
          decodeURIComponent(path).charAt(0).toUpperCase() +
          decodeURIComponent(path).slice(1);
        const to = `/${paths.slice(0, index + 1).join('/')}`;
        if (paths[0] === 'productdetail' && index === 1) {
          const product = products.find((p) => p.id === Number(path));
          if (product) displayName = product.name;
        }
        if (displayName.toLowerCase() === 'productdetail') displayName = 'Products';

        return (
          <span key={to} className='breadcrumb-item'>
            <span> / </span>
            {isLast ? (
              <span className='breadcrumb-current'>{displayName}</span>
            ) : (
              <Link
                to={displayName === 'Products' ? '/products' : to}
                className='breadcrumb-link'
              >
                {displayName}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
