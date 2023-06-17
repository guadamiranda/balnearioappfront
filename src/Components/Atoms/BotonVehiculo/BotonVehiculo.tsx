import React from 'react'
import style from './botonVehiculo.module.scss'

interface IBotonVehiculo{
    onClickFunction: () => void,
    icon: any,
    text: string,
}

const BotonVehiculo: React.FC<IBotonVehiculo> = ({icon, text, onClickFunction}) => {
    return(
        <div onClick={() => onClickFunction()} className={style.botonVehiculo}>
            <div className={style.botonVehiculo__icon}>{icon}</div>
            <span>{text}</span>
        </div>
    )
}

export default BotonVehiculo
