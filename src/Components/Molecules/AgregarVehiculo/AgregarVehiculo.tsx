'use client'
import React, { useState } from 'react'
import style from './agregarVehiculo.module.scss'
import BotonAgregar from '@/Components/Atoms/BotonAgregar/BotonAgregar'
import BotonVehiculo from '@/Components/Atoms/BotonVehiculo/BotonVehiculo'
import { FaCarSide, FaTruckPickup, FaTruckMoving } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

interface IAgregarVehiculo{
    index: number,
    onClickDelete: () => void
}

const AgregarVehiculo: React.FC<IAgregarVehiculo> = ({index, onClickDelete}) => {
    const [ price, setPrice ] = useState(0) 

    return(
        <div key={index} className={style.agregarVehiculo}>
            <div className={style.agregarVehiculo__botonesContainer}>
                <span className={style.agregarVehiculo__botonesContainer__title}>{index} - Tipo de vehiculo:</span>
                <div className={style.agregarVehiculo__botonesContainer__buttons}>
                    <BotonVehiculo icon={<FaCarSide/>} text='Auto' onClickFunction={() => setPrice(1000)} priceSelected={1000} price={price}/>
                    <BotonVehiculo icon={<FaTruckPickup/>} text='Camioneta' onClickFunction={() => setPrice(2000)} priceSelected={2000} price={price}/>
                    <BotonVehiculo icon={<FaTruckMoving/>} text='Camión' onClickFunction={() => setPrice(3000)} priceSelected={3000} price={price}/>
                </div>
            </div>

            <div className={style.agregarVehiculo__precioContainer}>
                <span>Precio:</span>
                <span className={style.agregarVehiculo__precioContainer__price}>$ <b className={style.agregarVehiculo__precioContainer__space}>{price}</b></span>
            </div>

            <div className={style.agregarVehiculo__eliminarContainer}>
                <div className={style.agregarVehiculo__eliminarContainer}>
                    <BotonAgregar onClickFunction={() => onClickDelete()}icon={<IoMdClose/>}/>
                </div>
            </div>
        </div>
    )
}

export default AgregarVehiculo
