import { useSelector } from 'react-redux';
import { Navigate, To } from 'react-router-dom';
import { getIsLoggedIn } from '../../store/auth/auth-selectors';

interface IMyProps {
  element: JSX.Element;
  redirectTo: To;
  restricted: boolean;
}

const PublicRoute: React.FC<IMyProps> = (props: IMyProps) => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  if (!props.redirectTo && props.restricted) {
    return <Navigate to="/" />;
  }
  return <>{isLoggedIn && props.restricted ? <Navigate to={props.redirectTo} /> : props.element}</>;
};

export default PublicRoute;
