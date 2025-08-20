import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth'; // ✅ Corregido: era '../hooks/useAuth'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && (!user.roles || !user.roles.includes(requiredRole))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;