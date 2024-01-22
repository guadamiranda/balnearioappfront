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
    setDatosFecha: any,
    setHasVehiculeFinal: any
}

const AddDatosEstadia: React.FC<IAddDatosEstadia> = ({ setVehiculePlateFunction, setAnimalAmountFunction, setDatosFecha, setHasVehiculeFinal }) => {
    const [hasVehicule, setHasVehicule] = useState(false)
    const [vehiculePlate, setVehiculePlate] = useState(0)
    const [animalAmount, setAnimalAmount] = useState(0)
    const [dateFromUnix, setDateFromUnix] = useState(0)
    const [dateToUnix, setDateToUnix] = useState(0)
    const [numberOfDays, setNumberOfDays] = useState(0)
    const [checkOneDay, setCheckOneDay] = useState(false)

    const checkVehicule = () => {
        setHasVehicule(!hasVehicule)
        setVehiculePlate(0)
        setHasVehiculeFinal(!hasVehicule)
    }

    useEffect(() => {
        setVehiculePlateFunction(vehiculePlate)
        setAnimalAmountFunction(animalAmount)
        setDatosFecha({
            dateFromUnix: dateFromUnix,
            dateToUnix: dateToUnix,
            numberOfDays: numberOfDays,
            checkOneDay: checkOneDay
        }
        )
    }, [vehiculePlate, animalAmount, dateFromUnix, dateToUnix, numberOfDays, checkOneDay])

    return(
        <>
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

                <div className={style.addDatosEstadia__checkBoxContainer}>
                    <Input
                        useStateFunction={setAnimalAmount}
                        icon={<FaHorse />}
                        type='number'
                        placeholder='0'
                        title='Cantidad de Caballos' 
                        value={animalAmount}
                    /> 
                </div> 
            </div>

            <br></br>

            <div className={style.addDatosEstadia}>
                <div className={style.addDatosEstadia__titleStayDate}>Fecha de la estadía</div>
                <div className={style.addDatosEstadia__checkBoxContainer}>
                    <DateSection
                        setDateFromUnix={setDateFromUnix}
                        setDateToUnix={setDateToUnix}
                        setNumberOfDays={setNumberOfDays}
                        setCheckOneDay={setCheckOneDay} />
                </div>
            </div>
        </>
    )
}

export default AddDatosEstadia
