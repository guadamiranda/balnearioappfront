'use client'

import LittleABMTemplate from '@/Components/templates/littleAbmTemplate/LittleABMTemplate';
import ActualReserve from '@/Components/Molecules/ActualReserves/ActualReserves';
import Button from '@/Components/Atoms/button/button';
import { useRouter } from 'next/navigation';
import style from './reserves.module.scss'
import { useState } from "react";


const Reserves = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleClick = (route:string) => {
        router.push(route);
    }


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
                        <Button text='Buscar reserva' type='secondary' onClickFunction={() => handleClick('/queryReserve')}></Button>
                        <Button text='Registrar reserva' type='primary' onClickFunction={() => handleClick('/RegistrarEstadia')}></Button>
                    </div>
                    
                </LittleABMTemplate>
            </>
        }  

        </>
    );
};

export default Reserves;
