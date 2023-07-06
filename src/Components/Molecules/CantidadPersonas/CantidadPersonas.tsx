'use client'
import React, { useState, useEffect } from 'react'
import style from './agregarVehiculo.module.scss'
import ButtonAction from '@/Components/Atoms/ButtonAction/ButtonAction'
import { IoMdClose } from 'react-icons/io'

interface IPeopleAmount{
    index: number,
    deleteComponent: () => void,
}

const PeopleAmount: React.FC<IPeopleAmount> = ({index, deleteComponent}) => {

    const [price, setPrice] = useState(0) 

    return(
        <div key={index} className={style.agregarVehiculo}>
            <div className={style.agregarVehiculo__botonesContainer}>
                <span className={style.agregarVehiculo__botonesContainer__title}>{index} - Tipo de vehiculo:</span>

            </div>

            <div className={style.agregarVehiculo__precioContainer}>
                <span>Precio:</span>
                <span className={style.agregarVehiculo__precioContainer__price}>$ <b className={style.agregarVehiculo__precioContainer__space}>{price}</b></span>
            </div>

            <div className={style.agregarVehiculo__eliminarContainer}>
                <div className={style.agregarVehiculo__eliminarContainer}>
                    <ButtonAction onClickFunction={() => deleteComponent()}icon={<IoMdClose/>}/>
                </div>
            </div>
        </div>
    )
}

export default PeopleAmount

