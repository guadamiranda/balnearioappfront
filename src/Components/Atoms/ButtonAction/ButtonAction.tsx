import React from 'react'
import style from './buttonAction.module.scss'


interface IButtonAction{
    title?: string,
    icon: any,
    onClickFunction: any
}

const ButtonAction: React.FC<IButtonAction> = ({title, icon, onClickFunction}) => {
    return(
        <div className={style.buttonAction}>
            <div className={style.buttonAction__button} onClick={() => onClickFunction()}>{icon}</div>
            { title ? <span className={style.buttonAction__label}>Agregar {title}</span> : <></>}
        </div>
    )
}

export default ButtonAction
