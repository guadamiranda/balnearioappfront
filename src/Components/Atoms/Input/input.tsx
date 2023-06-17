import React from 'react'
import style from './input.module.scss'

interface IInput{
    icon: any,
    placeholder: string,
    title: string,
    type: string,
    useStateFunction: any
}

const Input: React.FC<IInput> = ({icon, placeholder, title, type, useStateFunction}) => {
    return(
        <div className={style.inputContainer}>
            <span className={style.inputContainer__title}>{title}</span>
            <div className={style.inputContainer__input}>
                <div className={style.inputContainer__input__icon}>
                    {icon}
                </div>
                <input placeholder={placeholder} type={type} className={style.inputContainer__input__input} onChange={e => useStateFunction(e.target.value)}></input>
            </div>
        </div>
    )
}

export default Input
