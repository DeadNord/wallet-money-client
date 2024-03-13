import s from './AuthContainer.module.scss';


interface IAuthContainer {
  children: JSX.Element;
}

const AuthContainer: React.FC<IAuthContainer> = ({children}) => {

  return (
    <>
      <div className={s.container}>
      {children}
      </div>
    </>
  );
};

export default AuthContainer;
