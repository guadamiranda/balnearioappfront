'use client'
import React, { useState } from 'react'
import style from './cantidadPersonas.module.scss'
import Input from '@/Components/Atoms/Input/input'
import { AiOutlineUser } from 'react-icons/ai'

interface ICantidadPersonas{
    useStateFunction: any,
    finalPriceAllPeople: number
}

const CantidadPersonas: React.FC<ICantidadPersonas> = ({useStateFunction, finalPriceAllPeople}) => {
    const [ price, setPrice ] = useState(1000)

    return(
        <div className={style.cantidadPersonas}>
            <div>
                <Input icon={<AiOutlineUser/>} placeholder='Ej. 5' title='Cantidad de personas:' type='number' useStateFunction={useStateFunction}/>
            </div>
            <div className={style.cantidadPersonas__precioTotalContainer}>
                <div className={style.cantidadPersonas__precioTotalContainer__precioContainer}>
                    <span>Precio por persona:</span>
                    <span className={style.cantidadPersonas__precioTotalContainer__precioContainer__price}>$ <b className={style.cantidadPersonas__precioTotalContainer__space}>{price}</b></span>
                </div>
                <div className={style.cantidadPersonas__precioTotalContainer__totalContainer}>
                    <span><b>Total:</b></span>
                    <span className={style.cantidadPersonas__precioTotalContainer__totalContainer__totalPrice}>$ <b className={style.cantidadPersonas__precioTotalContainer__space}>{finalPriceAllPeople * price}</b></span>
                </div>
            </div>
            
        </div>
    )
}

export default CantidadPersonas
