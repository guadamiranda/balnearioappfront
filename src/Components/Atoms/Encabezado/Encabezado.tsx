import React from 'react'
import style from './encabezado.module.scss'

interface IEncabezado{
    title: string,
    alignment?: 'left' | 'center' | 'right'
}

const Encabezado: React.FC<IEncabezado> = ({title, alignment}) => {
    const styleHeader = style[`encabezado${alignment? `-${alignment}`: '-left'}`]
    return(
        <div className={styleHeader}>
            <span><b>{title}</b></span>
        </div>
    )
}

export default Encabezado
