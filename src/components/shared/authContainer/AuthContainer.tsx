import s from './AuthContainer.module.scss';

interface IAuthContainer {
  children: JSX.Element;
}

const AuthContainer: React.FC<IAuthContainer> = ({ children }) => {
  return (
    <>
      <section className={s.container}>{children}</section>
    </>
  );
};

export default AuthContainer;
