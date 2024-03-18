import s from './Logo.module.scss';
import sprite from '../../../../assets/svg/sprite.svg';

const Logo = () => {
  return (
    <>
      <svg className={s.icon}>
        <use href={sprite + '#icon-logo'} />
      </svg>
    </>
  );
};

export default Logo;
