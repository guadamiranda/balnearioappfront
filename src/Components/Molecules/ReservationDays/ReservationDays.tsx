'use client'
import React, { useState } from 'react'
import style from './reservationDays.module.scss'
import Input from '@/Components/Atoms/Input/input'
import { RxCalendar } from 'react-icons/rx'

interface IReservationDays{
    setFechaDesdeFunction: any,
    setFechaHastaFunction: any,
}

const ReservationDays: React.FC<IReservationDays> = ({setFechaDesdeFunction, setFechaHastaFunction}) => {
    return(
        <div className={style.reservationDays}>
            <Input icon={<RxCalendar/>} placeholder='Desde' title='Fecha Desde' type='date' useStateFunction={setFechaDesdeFunction} ></Input>
            <Input icon={<RxCalendar/>} placeholder='Hasta' title='Fecha Hasta' type='date' useStateFunction={setFechaHastaFunction} ></Input>
        </div>
    )
}

export default ReservationDays
