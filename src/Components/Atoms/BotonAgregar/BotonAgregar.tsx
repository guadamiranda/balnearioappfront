import React from 'react'
import style from './botonAgregar.module.scss'


interface IBotonAgregar{
    title?: string,
    icon: any,
    onClickFunction: () => void
}

const BotonAgregar: React.FC<IBotonAgregar> = ({title, icon, onClickFunction}) => {
    return(
        <div className={style.botonAgregar}>
            { title ? <span className={style.botonAgregar__label}>Agregar {title}</span> : <></>}
            <div className={style.botonAgregar__button} onClick={() => onClickFunction()}>{icon}</div>
        </div>
    )
}

export default BotonAgregar
