'use client'

import LittleABMTemplate from '@/Components/templates/littleAbmTemplate/LittleABMTemplate';
import ActualReserve from '@/Components/Molecules/ActualReserves/ActualReserves';
import Button from '@/Components/Atoms/button/button';
import { useState } from "react";
import style from './reserves.module.scss'



const Reserves = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
        {
            isLoading? 
            <div className={style.reservesContainer}>
                <div className={style.reservesContainer__loaderContainer}>
                    <div className={style.reservesContainer__loader}></div>
                </div>
            </div> :
            
            <>
                <LittleABMTemplate title="Reservas" subTitle="Administración de reservas"> 
                    <div className={style.reservesContainer__actualReserve}>
                        <ActualReserve></ActualReserve>
                    </div>
                    <div className={style.reservesContainer__buttonContainer}>
                        <Button text='Buscar reserva' type='secondary'></Button>
                        <Button text='Registrar reserva' type='primary'></Button>
                    </div>
                    
                </LittleABMTemplate>
            </>
        }  

        </>
    );
};

export default Reserves;
