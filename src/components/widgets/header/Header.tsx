import s from './Header.module.scss';
import sprite from '../../../assets/svg/sprites.svg';
import { Route, Router, Routes } from 'react-router-dom';
import Logo from 'components/shared/icons/logo/Logo';
import SvgIcon from 'components/shared/icons/SvgIcon';

const Header = () => {
  return (
    <>
      <div className={s.headerContainer}>
        <div className={s.sidebar}>
          <Logo />
          <ul className={s.menuList}>
            <li className={s.menuItem}>
              {/* <svg className={s.icon}>
                <use href={sprite + '#icon-board'} />
              </svg> */}
              <SvgIcon name={'icon-board'} className={s.icon} />
              <p>Dashboard</p>
            </li>
            <li className={s.menuItem}>
              {/* <svg className={s.icon}>
                <use href={sprite + '#icon-chart'} />
              </svg> */}
              <SvgIcon name={'icon-chart'} className={s.icon} />
              <p>Analytics</p>
            </li>
            <li className={s.menuItem}>
              {/* <svg className={s.icon}>
                <use href={sprite + '#icon-user'} />
              </svg> */}
              <SvgIcon name={'icon-user'} className={s.icon} />
              <p>Accounts</p>
            </li>
            <li className={s.menuItem}>
              {/* <svg className={s.icon}>
                <use href={sprite + '#icon-settings'} />
              </svg> */}
              <SvgIcon name={'icon-settings'} className={s.icon} />
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
