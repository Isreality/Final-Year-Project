import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAllowed }) {
  const access = JSON.parse(sessionStorage.getItem('access'));

  if (!access || (access.super_admin !== 1 && access.owner !== 1)) {
    // Redirect to an unauthorized page or login page if access is denied
    return <Navigate to="/dashboard" />;
  }

  // Render the protected content if access level is authorized
  return children;
}

export default ProtectedRoute;
