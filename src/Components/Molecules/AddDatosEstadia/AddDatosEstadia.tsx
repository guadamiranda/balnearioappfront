'use client'

import Checkbox from '@/Components/Atoms/Checkbox/Checkbox';
import Input from '@/Components/Atoms/Input/input';
import style from './addDatosEstadia.module.scss'
import { AiOutlineCar } from "react-icons/ai";
import { FaHorse } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import DateSection from '@/Components/Organism/DateSection/DateSection';

interface IAddDatosEstadia {
    setVehiculePlateFunction: any,
    setAnimalAmountFunction: any,
}

const AddDatosEstadia: React.FC<IAddDatosEstadia> = ({ setVehiculePlateFunction, setAnimalAmountFunction }) => {
    const [hasVehicule, setHasVehicule] = useState(false)
    const [vehiculePlate, setVehiculePlate] = useState('')
    const [animalAmount, setAnimalAmount] = useState(0)
    const [dateFromUnix, setDateFromUnix] = useState(0)
    const [dateToUnix, setDateToUnix] = useState(0)
    const [numberOfDays, setNumberOfDays] = useState(0)
    const [checkOneDay, setCheckOneDay] = useState(false)

    console.log('Fecha desde', dateFromUnix)
    console.log('fecha hasta', dateToUnix)
    console.log('numero de dias', numberOfDays)
    console.log('un dia', checkOneDay)


    const checkVehicule = () => {
        setHasVehicule(!hasVehicule)
        setVehiculePlate('')
    }

    useEffect(() => {
        setVehiculePlateFunction(vehiculePlate)
        setAnimalAmountFunction(animalAmount)
    }, [vehiculePlate, animalAmount])

    return(
        <div className={style.addDatosEstadia}>
            <div className={style.addDatosEstadia__title}>Datos de Vehiculo y Animales</div>

            <div className={style.addDatosEstadia__checkBoxContainer}>
                <Checkbox title='¿Tiene Vehiculo?' onClickFunction={() => checkVehicule()}></Checkbox>

                {hasVehicule && 
                    <Input
                        useStateFunction={setVehiculePlate}
                        icon={<AiOutlineCar />}
                        placeholder='AS 234 RT'
                        title='Patente del Vehiculo' 
                        value={vehiculePlate}
                    /> 
                }
            </div>

            <Input
                useStateFunction={setAnimalAmount}
                icon={<FaHorse />}
                type='number'
                placeholder='0'
                title='Cantidad de Caballos' 
                value={animalAmount}
            /> 
            
                <br/>

            <div className={style.addDatosEstadia__title}>Fecha de la estadía</div>
            <DateSection
                setDateFromUnix={setDateFromUnix}
                setDateToUnix={setDateToUnix}
                setNumberOfDays={setNumberOfDays}
                setCheckOneDay={setCheckOneDay}>
            </DateSection>
           
        </div>
    )
}

export default AddDatosEstadia
