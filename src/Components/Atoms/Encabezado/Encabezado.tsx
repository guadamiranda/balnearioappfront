import React from 'react'
import style from './encabezado.module.scss'

interface IEncabezado{
    title: string,
}

const Encabezado: React.FC<IEncabezado> = ({title}) => {
    return(
        <div className={style.encabezado}>
            <span><b>{title}</b></span>
        </div>
    )
}

export default Encabezado
