import s from './DashboardPage.module.scss';
import Header from 'components/widgets/header/Header';
import Dashboard from 'components/widgets/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <>
      <div className={s.flex}>
        <Header />
        <Dashboard />
      </div>
    </>
  );
};

export default DashboardPage;
