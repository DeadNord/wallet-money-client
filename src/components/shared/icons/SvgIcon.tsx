import React from 'react';
import sprite from '../../../assets/svg/sprite.svg';

interface SvgIconProps {
  name: string;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, className }) => {
  return (
    <svg className={className}>
      <use href={sprite + `#${name}`}></use>
    </svg>
  );
};

export default SvgIcon;
