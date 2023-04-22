import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function RequireAuth({ children }) {
  const { isAutorization } = useSelector((state) => state.user);

  if (!isAutorization) {
    return <Navigate to='/auth' />;
  }

  return children;
}
