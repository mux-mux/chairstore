import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find what you're looking for.</p>
      <Link to="/">Back to Categories</Link>
    </div>
  );
};

export default NotFound;
