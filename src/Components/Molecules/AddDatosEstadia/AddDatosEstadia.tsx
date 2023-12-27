'use client'

import Checkbox from '@/Components/Atoms/Checkbox/Checkbox';
import Input from '@/Components/Atoms/Input/input';
import style from './addDatosEstadia.module.scss'
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineCar } from "react-icons/ai";
import { FaHorse } from "react-icons/fa";
import React, { useState } from 'react'

const AddDatosEstadia = () => {
    const [hasVehicule, setHasVehicule] = useState(false)

    const checkVehicule = () => {
        setHasVehicule(!hasVehicule)
    }

    return(
        <div className={style.addDatosEstadia}>
            <div className={style.addDatosEstadia__title}>Datos de Vehiculo y Animales</div>

            <div className={style.addDatosEstadia__checkBoxContainer}>
                <Checkbox title='¿Tiene Vehiculo?' onClickFunction={() => checkVehicule()}></Checkbox>

                {hasVehicule && 
                    <Input useStateFunction={() =>console.log('')} 
                    icon={<AiOutlineCar/>} 
                    placeholder='AS 234 RT' 
                    title='Patente del Vehiculo' 
                    value={''}/> 
                }
            </div>

            <Input useStateFunction={() =>console.log('')} 
                   icon={<FaHorse/>} 
                   type='number'
                   placeholder='0' 
                   title='Cantidad de Caballos' 
                   value={''}/> 
            
                <br/>

            <div className={style.addDatosEstadia__title}>Fecha de la estadía</div>
           
        </div>
    )
}

export default AddDatosEstadia
