'use client'

import LittleABMTemplate from '@/Components/templates/littleAbmTemplate/LittleABMTemplate';
import Button from '@/Components/Atoms/button/button';
import style from './reserves.module.scss'
import { useEffect, useState } from "react";
import ActiveReserveCard from '@/Components/Molecules/ActiveReservesCard/ActiveReserveCard';
import reserveServices from '../../Services/reserveServices'
import Loader from "@/Components/Organism/loaderScreen/loader";
import { useRouter } from 'next/navigation';

interface IAllReservesData {
    id: string,
    managerFirstName: string,
    managerLastName: string,
    managerDni: string,
    managerMemberNumber: string,
    finishDate: string,
    initDate: string,
    managerCarPlate: string
}

const Reserves = () => {
    const router = useRouter();
    const [allReservesData, setAllReservesData] = useState<IAllReservesData[]>([])
    const [isLoadingButtons, setIsLoadingButton] = useState([false,false])
    const [isLoading, setIsLoading] = useState(true)
    const redirectPage = (route: string, buttonId: number) => {
        const loadingButtons = isLoadingButtons
        loadingButtons[buttonId] = true;

        setIsLoadingButton([...loadingButtons])
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
            isLoading? <Loader/> :
            <>
                <LittleABMTemplate title="Reservas" subTitle="Administración de reservas"> 
                    <div className={style.reservesContainer__titleTableContainer}>
                        <span className={style.reservesContainer__title}><b>Reservas activas</b></span>
                        <div className={style.reservesContainer__actualReserve}>
                            {allReservesData.map((reserve) => 
                            <ActiveReserveCard 
                            key={reserve.managerDni}
                            id={reserve.id}
                            managerName={reserve.managerFirstName}
                            managerLastName={reserve.managerLastName}
                            managerDNI={reserve.managerDni}
                            managerMemberNumber={reserve.managerMemberNumber}
                            managerCarPlate = {reserve.managerCarPlate}
                            finishDate={reserve.finishDate}
                            initDate={reserve.initDate}/>
                            )}
                            
                        </div>

                    </div>
                    
                    <div className={style.reservesContainer__buttonContainer}>
                        <Button text='Buscar reserva' type='secondary' isLoading={isLoadingButtons[0]} onClickFunction={()=> redirectPage('/queryReserve', 0)}></Button>
                        <Button text='Registrar reserva' type='primary' isLoading={isLoadingButtons[1]} onClickFunction={()=> redirectPage('/RegistrarEstadia', 1)}></Button>
                    </div>
                    
                </LittleABMTemplate>
            </>
        }  

        </>
    );
};

export default Reserves;
