import s from './Header.module.scss';

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
              <SvgIcon name={'icon-board'} className={s.icon} />
              <p>Dashboard</p>
            </li>
            <li className={s.menuItem}>
              <SvgIcon name={'icon-chart'} className={s.icon} />
              <p>Analytics</p>
            </li>
            <li className={s.menuItem}>
              <SvgIcon name={'icon-user'} className={s.icon} />
              <p>Accounts</p>
            </li>
            <li className={s.menuItem}>
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
            <SvgIcon name={'icon-arrow'} className={s.iconInfoProfile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
