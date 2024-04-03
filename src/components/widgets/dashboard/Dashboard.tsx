// Import necessary libraries and components
import s from './Dashboard.module.scss';
import { getUserInfo } from 'store/auth/auth-selectors';
import { useSelector } from 'react-redux';
import Budget from './budget/Budget';
import Categories from './categories/Categories';
import Analytics from './analytics/Analytics';
import Transactions from './transactions/Transactions';
import SvgIcon from 'components/shared/icons/SvgIcon';
import { useState } from 'react';
import Modal from 'components/shared/modal/Modal';
import AddTransactionModal from './addTransactionModal/AddTransactionModal';

// Dashboard component
const Dashboard = () => {
  // Retrieving the current user's information from the store
  const user = useSelector(getUserInfo);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
            <button className={s.iconContainer} onClick={openModal}>
              <SvgIcon name={'icon-plus'} className={s.iconAdd} />
            </button>
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddTransactionModal onСlose={closeModal} />
      </Modal>
    </>
  );
};

export default Dashboard;
