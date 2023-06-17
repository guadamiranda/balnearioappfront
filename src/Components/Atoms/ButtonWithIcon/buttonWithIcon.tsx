import React from 'react'
import style from './buttonWithIcon.module.scss'
import { IconType } from 'react-icons/lib'

interface IButtonWithIcon{
    Icon: IconType
}

const ButtonWithIcon: React.FC<IButtonWithIcon> = ({Icon}) => {
    return(
        <div className={style.containerButton}>
            <div className={style.containerButton__button}> <Icon/> </div>
        </div>
    )
}

export default ButtonWithIcon