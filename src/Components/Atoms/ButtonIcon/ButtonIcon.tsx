'use client'

import React from 'react'
import style from './buttonIcon.module.scss'

interface IButton {
  icon: any;
  onClickFunction: () => void;
  type: 'info' | 'danger' | 'secondary';
}

const ButtonIcon: React.FC<IButton> = ({
  icon,
  onClickFunction, 
  type
}) => {

  const className = `${style.buttonIconContainer} ${style[`buttonIconContainer-${type}`]}`
  
  return (
    <div className={className} onClick={() => onClickFunction()}>
        <div>{icon}</div>
    </div>
  );
};

export default ButtonIcon
