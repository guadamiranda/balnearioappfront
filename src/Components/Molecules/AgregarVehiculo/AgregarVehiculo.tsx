'use client'
import React, { useState, useEffect } from 'react'
import style from './agregarVehiculo.module.scss'
import BotonAgregar from '@/Components/Atoms/ButtonAdd/BotonAgregar'
import BotonVehiculo from '@/Components/Atoms/BotonVehiculo/BotonVehiculo'
import { FaCarSide, FaTruckPickup, FaTruckMoving } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

interface IAgregarVehiculo{
    index: number,
    deleteComponent: () => void,
}

const AgregarVehiculo: React.FC<IAgregarVehiculo> = ({index, deleteComponent}) => {

    const [price, setPrice] = useState(0) 
    console.log(index)
        /*
    const [oldPrice, setOldPrice] = useState(0)
    console.log('Nuevo precio: ', price)
    console.log('Viejo Precio: ', oldPrice)
    console.log('-------------------------------')

    */
    /*
    const updatePrice = (newPrice:number) => {
        setOldPrice(price);
        setPrice(newPrice)
        
        setNewTotalVehiculePrice(oldPrice + price)
    } 
    */

    return(
        <div key={index} className={style.agregarVehiculo}>
            <div className={style.agregarVehiculo__botonesContainer}>
                <span className={style.agregarVehiculo__botonesContainer__title}>{index} - Tipo de vehiculo:</span>
                <div className={style.agregarVehiculo__botonesContainer__buttons}>
                    <BotonVehiculo icon={<FaCarSide/>} text='Auto' onClickFunction={() => 'updatePrice(1000)'} priceSelected={1000} price={1}/>
                    <BotonVehiculo icon={<FaTruckPickup/>} text='Camioneta' onClickFunction={() => 'updatePrice(2000)'} priceSelected={2000} price={2}/>
                    <BotonVehiculo icon={<FaTruckMoving/>} text='Camión' onClickFunction={() => 'updatePrice(3000)'} priceSelected={3000} price={3}/>
                </div>
            </div>

            <div className={style.agregarVehiculo__precioContainer}>
                <span>Precio:</span>
                <span className={style.agregarVehiculo__precioContainer__price}>$ <b className={style.agregarVehiculo__precioContainer__space}>{price}</b></span>
            </div>

            <div className={style.agregarVehiculo__eliminarContainer}>
                <div className={style.agregarVehiculo__eliminarContainer}>
                    <BotonAgregar onClickFunction={() => deleteComponent()}icon={<IoMdClose/>}/>
                </div>
            </div>
        </div>
    )
}

export default AgregarVehiculo

/*
<div className={style.agregarVehiculo__eliminarContainer}>
                    
                </div>
                

/*
 <BotonVehiculo icon={<FaCarSide/>} text='Auto' onClickFunction={() => updatePrice(1000)} priceSelected={1000} price={price}/>
                    <BotonVehiculo icon={<FaTruckPickup/>} text='Camioneta' onClickFunction={() => updatePrice(2000)} priceSelected={2000} price={price}/>
                    <BotonVehiculo icon={<FaTruckMoving/>} text='Camión' onClickFunction={() => updatePrice(3000)} priceSelected={3000} price={price}/>
                    */
