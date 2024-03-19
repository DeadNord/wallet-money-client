// Import necessary libraries and components
import s from './Dashboard.module.scss';
import { getUserInfo } from 'store/auth/auth-selectors';
import { useSelector } from 'react-redux';
import Budget from './budget/Budget';
import Categories from './categories/Categories';
import Analytics from './analytics/Analytics';
import Transactions from './transactions/Transactions';
import SvgIcon from 'components/shared/icons/SvgIcon';

// Dashboard component
const Dashboard = () => {
  // Retrieving the current user's information from the store
  const user = useSelector(getUserInfo);

  // Rendering the dashboard content
  return (
    <>
      <section className={s.background}>
        <div className={s.dashboardContainer}>
          <div className={s.heroContainer}>
            <div>
              <h1 className={s.titleName}>Welcome Back, {user.name}</h1>
              <p className={s.textName}>Here’s what’s happening with your store today.</p>
            </div>
            <div className={s.iconContainer}>
              <SvgIcon name={'icon-plus'} className={s.iconAdd} />
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
      </section>
    </>
  );
};

export default Dashboard;
