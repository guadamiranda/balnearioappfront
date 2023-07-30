'use client'

import LittleABMTemplate from '@/Components/templates/littleAbmTemplate/LittleABMTemplate';
import ActualReserve from '@/Components/Molecules/ActualReserves/ActualReserves';
import Button from '@/Components/Atoms/button/button';
import { useState } from "react";
import style from './reserves.module.scss'
import Loader from '@/Components/Organism/loaderScreen/loader';

const Reserves = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LittleABMTemplate title="Reservas" subTitle="Administración de reservas"> 
            <div className={style.reservesContainer__actualReserve}>
                <ActualReserve></ActualReserve>
            </div>
            <div className={style.reservesContainer__buttonContainer}>
                <Button text='Buscar reserva' type='secondary' onClickFunction={()=> console.log('hola')}></Button>
                <Button text='Registrar reserva' type='primary' onClickFunction={()=> console.log('hola')}></Button>
            </div>
            
        </LittleABMTemplate>
    );
};

export default Reserves;
