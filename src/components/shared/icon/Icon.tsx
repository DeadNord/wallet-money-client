import s from './Icon.module.scss';
import sprite from '../../../assets/svg/sprites.svg';


const Icon = () => {

    return (
        <>
        <svg className={s.icon}>
        <use href={sprite + '#icon-logo'} />
      </svg>
        </>
      );
};

export default Icon;
