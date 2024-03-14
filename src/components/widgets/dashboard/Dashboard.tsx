import s from './Dashboard.module.scss';
import sprite from '../../assets/svg/sprites.svg';
import { Route, Router, Routes } from 'react-router-dom';
import Icon from 'components/shared/icon/Icon';
import { getUserInfo } from 'store/auth/auth-selectors';
import { useSelector } from 'react-redux';
import Budget from './budget/Budget';
import Categories from './categories/Categories';
import Analytics from './analytics/Analytics';
import Transactions from './transactions/Transactions';

const Dashboard = () => {
  const user = useSelector(getUserInfo);

  return (
    <>
      <div className={s.background}>
        <div className={s.dashboardContainer}>
          <div className={s.heroContainer}>
            <div>
              <h1 className={s.titleName}>Welcome Back, {user.name}</h1>
              <p className={s.textName}>Here’s what’s happening with your store today.</p>
            </div>
            <div>
              <svg className={s.iconAdd}>{/* <use href={sprite + '#icon-logo'} /> */}</svg>
            </div>
          </div>
          <div>
            <Budget />
            <div className={s.middleContainer}>
              <Categories />
              <Analytics />
            </div>
            <Transactions />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
