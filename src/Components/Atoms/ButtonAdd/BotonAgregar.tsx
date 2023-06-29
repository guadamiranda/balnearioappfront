import React from 'react'
import style from './botonAgregar.module.scss'


interface IBotonAgregar{
    title?: string,
    icon: any,
    onClickFunction: any
}

const BotonAgregar: React.FC<IBotonAgregar> = ({title, icon, onClickFunction}) => {
    return(
        <div className={style.botonAgregar}>
            <div className={style.botonAgregar__button} onClick={() => onClickFunction()}>{icon}</div>
            { title ? <span className={style.botonAgregar__label}>Agregar {title}</span> : <></>}
        </div>
    )
}

export default BotonAgregar
