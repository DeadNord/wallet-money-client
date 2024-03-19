import s from './Header.module.scss';

import Logo from 'components/shared/icons/logo/Logo';
import SvgIcon from 'components/shared/icons/SvgIcon';
import { useSelector } from 'react-redux';
import { getUserInfo } from 'store/auth/auth-selectors';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: 'icon-board' },
  { name: 'Analytics', icon: 'icon-chart' },
  { name: 'Accounts', icon: 'icon-user' },
  { name: 'Settings', icon: 'icon-settings' },
];

const Header = () => {
  const user = useSelector(getUserInfo);

  return (
    <>
      <header className={s.headerContainer}>
        <div className={s.sidebar}>
          <Logo />
          <nav>
            <ul>
              {MENU_ITEMS.map(item => (
                <li key={item.name} className={s.menuItem}>
                  <SvgIcon name={item.icon} className={s.icon} />
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={s.profileContainer}>
          <SvgIcon name={'icon-profile'} className={s.iconProfile} />
          <p className={s.profileName}>{user?.name}</p>
          <SvgIcon name={'icon-arrow'} className={s.iconInfoProfile} />
        </div>
      </header>
    </>
  );
};

export default Header;
