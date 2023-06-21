'use client'
import React, { useEffect, useState } from 'react'
import style from './botonVehiculo.module.scss'

interface IBotonVehiculo{
    onClickFunction: () => void,
    icon: any,
    text: string,
    priceSelected: number,
    price: number
}

const BotonVehiculo: React.FC<IBotonVehiculo> = ({icon, text, onClickFunction, priceSelected, price}) => {
    const [ isSelected, setIsSelected ] = useState(false)
    
    const classNameNormal = `${style.botonVehiculo}`
    const classNameSelected = `${style.botonVehiculo} ${style.botonVehiculoSeleccionado}`
    const className = isSelected === true ? classNameSelected : classNameNormal

    useEffect(() => {
        priceSelected === price ? setIsSelected(true) : setIsSelected(false)
      }, [price]);

    return(
        <div onClick={() => onClickFunction()} className={className}>
            <div className={style.botonVehiculo__icon}>{icon}</div>
            <span>{text}</span>
        </div>
    )
}

export default BotonVehiculo
