'use client'
import React, { useState } from 'react'
import style from './reservationDays.module.scss'
import Input from '@/Components/Atoms/Input/input'
import { RxCalendar } from 'react-icons/rx'

interface IReservationDays{
    setFechaDesdeFunction: any,
    setFechaHastaFunction: any,
    valueDateFrom: any,
    valueDateTo: any
}

const ReservationDays: React.FC<IReservationDays> = ({setFechaDesdeFunction, setFechaHastaFunction, valueDateFrom, valueDateTo}) => {
    return(
        <div className={style.reservationDays}>
            <Input icon={<RxCalendar/>} placeholder='Desde' title='Fecha Desde' type='date' useStateFunction={setFechaDesdeFunction} value={valueDateFrom}></Input>
            <Input icon={<RxCalendar/>} placeholder='Hasta' title='Fecha Hasta' type='date' useStateFunction={setFechaHastaFunction} value={valueDateTo}></Input>
        </div>
    )
}

export default ReservationDays
