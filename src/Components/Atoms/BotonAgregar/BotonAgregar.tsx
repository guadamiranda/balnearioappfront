import React from 'react'
import style from './botonAgregar.module.scss'
import { VscAdd } from 'react-icons/vsc'

interface IBotonAgregar{
    title: string,
}

const BotonAgregar: React.FC<IBotonAgregar> = ({title}) => {
    return(
        <div className={style.botonAgregar}>
            <span className={style.botonAgregar__label}>Agregar {title}</span>
            <div className={style.botonAgregar__button}><VscAdd/></div>
        </div>
    )
}

export default BotonAgregar
