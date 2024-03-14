import s from './Analytics.module.scss';
import sprite from '../../assets/svg/sprites.svg';
import { Route, Router, Routes } from 'react-router-dom';
import Icon from 'components/shared/icon/Icon';
import { getUserInfo } from 'store/auth/auth-selectors';
import { useSelector } from 'react-redux';

const Analytics = () => {
  const user = useSelector(getUserInfo);

  return (
    <>
       <div className={s.analyticsContainer}></div>
    </>
  );
};

export default Analytics;
