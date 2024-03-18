import s from './DashboardPage.module.scss';
import sprite from '../../assets/svg/sprites.svg';
import { Route, Router, Routes } from 'react-router-dom';
import Header from 'components/widgets/header/Header';
import Dashboard from 'components/widgets/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <>
      <div className={s.flex}>
        {/* <Header /> */}
        <Dashboard />
      </div>
    </>
  );
};

export default DashboardPage;
