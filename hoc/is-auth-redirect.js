import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function AuthRedirect({ children }) {
  const { isAutorization } = useSelector((state) => state.user);

  if (isAutorization) {
    return <Navigate to='/books/all' />;
  }

  return children;
}
