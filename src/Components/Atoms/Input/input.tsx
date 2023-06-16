import React from 'react'
import style from './input.module.scss'

interface IInput{
    icon: any,
    placeholder: string,
    title: string
}

const Input: React.FC<IInput> = ({icon, placeholder, title}) => {
    return(
        <div className={style.inputContainer}>
            <span className={style.inputContainer__title}>{title}</span>
            <div className={style.inputContainer__input}>
                <div className={style.inputContainer__input__icon}>
                    {icon}
                </div>
                <input placeholder={placeholder} className={style.inputContainer__input__input}></input>
            </div>
        </div>
    )
}

export default Input
