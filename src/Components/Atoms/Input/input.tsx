import React from 'react'
import style from './input.module.scss'

interface IInput {
  icon?: any;
  placeholder: string;
  title: string;
  type?: 'number' | 'date' | 'password'
  isFullWidth?: boolean;
  useStateFunction: (value: any) => void;
  value?: any;
}

const Input: React.FC<IInput> = ({
  icon,
  placeholder,
  title,
  type,
  isFullWidth,
  useStateFunction,
  value
}) => {
  const fullWidthProp = isFullWidth ? "-fullWidth" : "";
  const styleInputContainer = style[`inputContainer${fullWidthProp}`];

  const handleUseStateFunction = (value: any) => {
    if(type === 'number'){
      value = value? parseInt(value): 0
    }
    useStateFunction(value);
  };

  return (
    <div className={styleInputContainer}>
      <span className={style.inputContainer__title}>{title}</span>
      <div className={style.inputContainer__input}>
        <div className={style.inputContainer__input__icon}>{icon}</div>
        <input
          placeholder={placeholder}
          onChange={e => handleUseStateFunction(e.target.value)}
          type={type}
          className={style.inputContainer__input__input}
          value= {value? value: null}
        ></input>
      </div>
    </div>
  );
};

export default Input
