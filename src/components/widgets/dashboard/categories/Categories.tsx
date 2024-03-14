import s from './Categories.module.scss';
import sprite from '../../assets/svg/sprites.svg';
import { Route, Router, Routes } from 'react-router-dom';
import Icon from 'components/shared/icon/Icon';
import { getUserInfo } from 'store/auth/auth-selectors';
import { useSelector } from 'react-redux';

const Categories = () => {
  const user = useSelector(getUserInfo);

  return (
    <>
      <div className={s.categoriesContainer}></div>
    </>
  );
};

export default Categories;
