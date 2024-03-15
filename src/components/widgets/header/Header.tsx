import s from './Header.module.scss';
import sprite from '../../../assets/svg/sprites.svg';
import { Route, Router, Routes } from 'react-router-dom';
import Icon from 'components/shared/icon/Icon';

const Header = () => {
  return (
    <>
      <div className={s.headerContainer}>
        <div className={s.sidebar}>
          <Icon />
          <ul className={s.menuList}>
            <li className={s.menuItem}>
              <svg className={s.icon}>
                <use href={sprite + '#icon-board'} />
              </svg>
              <p>Dashboard</p>
            </li>
            <li className={s.menuItem}>
              <svg className={s.icon}>
                <use href={sprite + '#icon-chart'} />
              </svg>
              <p>Analytics</p>
            </li>
            <li className={s.menuItem}>
              <svg className={s.icon}>
                <use href={sprite + '#icon-user'} />
              </svg>
              <p>Accounts</p>
            </li>
            <li className={s.menuItem}>
              <svg className={s.icon}>
                <use href={sprite + '#icon-settings'} />
              </svg>
              <p>Settings</p>
            </li>
          </ul>
        </div>
        <div className={s.profileContainer}>
          <div>
            <svg className={s.iconProfile}>{/* <use href={sprite + '#icon-logo'} /> */}</svg>
          </div>
          <p className={s.profileName}>Ali Riaz</p>
          <div>
            <svg className={s.iconInfoProfile}>
              <use href={sprite + '#icon-arrow'} />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
