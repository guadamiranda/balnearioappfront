'use client'
import { BiLoaderCircle } from 'react-icons/bi';
import style from './button.module.scss'
import React from 'react'

interface IButton {
  text: string;
  isFullWidth?: boolean;
  isLoading?: boolean;
  type: 'primary' | 'secondary' | 'danger';
  onClickFunction: () => void;
}

const Button: React.FC<IButton> = ({
  text,
  isFullWidth,
  onClickFunction,
  isLoading = false,
  type
}) => {
  const className = `
  ${style.button} 
  ${style[`button-${type}`]}
  ${isFullWidth ? style['-fullWidth'] : null}
`
  return (
    <div className={className} onClick={() => onClickFunction()}>
         {isLoading ? <BiLoaderCircle className={style['button-loading']} /> : <div className={style.button__text}>{text}</div>}
    </div>
  );
};

export default Button
