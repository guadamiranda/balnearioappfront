'use client'

import LittleABMTemplate from '@/Components/templates/littleAbmTemplate/LittleABMTemplate';
import Button from '@/Components/Atoms/button/button';
import { useRouter } from 'next/navigation';
import style from './reserves.module.scss'
import { useEffect, useState } from "react";
import ActiveReserveCard from '@/Components/Molecules/ActiveReservesCard/ActiveReserveCard';
import reserveServices from '../../Services/reserveServices'

interface IAllReservesData {
    managerFirstName: string,
    managerLastName: string,
    managerDni: string,
    managerMemberNumber: string,
    finishDate: number,
    initDate: number
}

const Reserves = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [allReservesData, setAllReservesData] = useState<IAllReservesData[]>([])
    const router = useRouter();

    const handleClick = (route:string) => {
        router.push(route);
    }

    async function getActiveReserves() {
        const allActiveReservesData = await reserveServices.getActiveReserves();
        setAllReservesData(allActiveReservesData) 
        setIsLoading(false)
    }

    useEffect(() => {
        getActiveReserves()
        
    }, [])


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
                    <span className={style.reservesContainer__title}><b>Reservas activas</b></span>
                    <div className={style.reservesContainer__actualReserve}>
                        {allReservesData.map((reserve) => 
                        <ActiveReserveCard 
                        managerName={reserve.managerFirstName}
                        managerLastName={reserve.managerLastName}
                        managerDNI={reserve.managerDni}
                        managerMemberNumber={reserve.managerMemberNumber}
                        finishDate={reserve.finishDate}
                        initDate={reserve.initDate}/>
                        )}
                        
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
