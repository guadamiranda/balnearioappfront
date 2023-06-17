import React from 'react'
import style from './titulo.module.scss'

interface ITitle{
    title: string,
    icon: any,
    subTitle: string,
}

const Title: React.FC<ITitle> = ({title, icon, subTitle}) => {
    return(
        <div className={style.title}>
            <div className={style.title__iconContainer}>
                <div className={style.title__iconContainer__icon}>{icon}</div>
            </div>
            <div className={style.title__titlesContainer}>
                <span className={style.title__titlesContainer__title}><b>{title}</b></span>
                <span className={style.title__titlesContainer__subTitle}>{subTitle}</span>
            </div>  
        </div>
    )
}

export default Title
