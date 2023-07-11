import React from 'react'
import style from './titleHome.module.scss'

interface ITitleHome{
    title: string,
    icon: any,
    subTitle: string,
}

const TitleHome: React.FC<ITitleHome> = ({title, subTitle}) => {
    return(
        <div className={style.title}>
            <span className={style.title__title}><b>{title}</b></span>
            <span className={style.title__subTitle}>{subTitle}</span>
        </div>  
    )
}

export default TitleHome
