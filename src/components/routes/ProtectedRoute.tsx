import { useSelector } from 'react-redux';
import { Navigate, To } from 'react-router-dom';
import { authSelectors } from '../../store/auth/auth-selectors';

interface IMyProps {
  element: JSX.Element;
  redirectTo: To;
}

const ProtectedRoute: React.FC<IMyProps> = (props: IMyProps) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return <>{isLoggedIn ? props.element : <Navigate to={props.redirectTo} />}</>;
};

export default ProtectedRoute;
