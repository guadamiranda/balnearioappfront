'use client'

import React from 'react'
import style from './button.module.scss'

interface IButton {
  text: string;
  isFullWidth?: boolean;
  type: 'primary' | 'secondary' | 'danger';
  onClickFunction: () => void;
}

const Button: React.FC<IButton> = ({
  text,
  isFullWidth,
  onClickFunction,
  type
}) => {
  const className = `
  ${style.button} 
  ${style[`button-${type}`]}
  ${isFullWidth ? style['-fullWidth'] : ''}
`
  return (
    <div className={className} onClick={() => onClickFunction()}>
        <div className={style.button__text}>{text}</div>
    </div>
  );
};

export default Button
