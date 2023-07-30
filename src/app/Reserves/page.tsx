'use client'

import LittleABMTemplate from '@/Components/templates/littleAbmTemplate/LittleABMTemplate';
import ActualReserve from '@/Components/Molecules/ActualReserves/ActualReserves';
import Button from '@/Components/Atoms/button/button';
import { useState } from "react";
import style from './reserves.module.scss'
import { useRouter } from 'next/navigation';

const Reserves = () => {
    const [isLoadingButtons, setIsLoadingButton] = useState([false,false])
    const router = useRouter();
    const redirectPage = (route: string, buttonId: number) => {
        const loadingButtons = isLoadingButtons
        loadingButtons[buttonId] = true;

        setIsLoadingButton([...loadingButtons])
        router.push(route);
    }

    return (
        <LittleABMTemplate title="Reservas" subTitle="Administración de reservas"> 
            <div className={style.reservesContainer__actualReserve}>
                <ActualReserve></ActualReserve>
            </div>
            <div className={style.reservesContainer__buttonContainer}>
                <Button text='Buscar reserva' type='secondary' isLoading={isLoadingButtons[0]} onClickFunction={()=> redirectPage('/queryReserve', 0)}></Button>
                <Button text='Registrar reserva' type='primary' isLoading={isLoadingButtons[1]} onClickFunction={()=> redirectPage('/RegistrarEstadia', 1)}></Button>
            </div>
            
        </LittleABMTemplate>
    );
};

export default Reserves;
