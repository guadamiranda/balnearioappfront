import React from 'react'
import style from './input.module.scss'

interface IInput {
  icon: any;
  placeholder: string;
  title: string;
  isFullWidth?: boolean;
  onChange?: () => void;
}

const Input: React.FC<IInput> = ({
  icon,
  placeholder,
  title,
  isFullWidth,
  onChange,
}) => {
  const fullWidthProp = isFullWidth ? "-fullWidth" : "";
  const styleInputContainer = style[`inputContainer${fullWidthProp}`];
  return (
    <div className={styleInputContainer}>
      <span className={style.inputContainer__title}>{title}</span>
      <div className={style.inputContainer__input}>
        <div className={style.inputContainer__input__icon}>{icon}</div>
        <input
          placeholder={placeholder}
          onChange={onChange}
          className={style.inputContainer__input__input}
        ></input>
      </div>
    </div>
  );
};

export default Input
