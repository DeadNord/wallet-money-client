import s from './Dashboard.module.scss';
import sprite from '../../assets/svg/sprites.svg';
import { Route, Router, Routes } from 'react-router-dom';
import Icon from 'components/shared/icon/Icon';
import { getUserInfo } from 'store/auth/auth-selectors';
import { useSelector } from 'react-redux';

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
            <div className={s.budgetContainer}></div>
            <div className={s.middleContainer}>
              <div className={s.categoriesContainer}></div>
              <div className={s.analyticsContainer}></div>
            </div>
            <div className={s.transactionsContainer}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
