'use client'

import LittleABMTemplate from '@/Components/templates/littleAbmTemplate/LittleABMTemplate';
import Button from '@/Components/Atoms/button/button';
import style from './reserves.module.scss'
import { useEffect, useState } from "react";
import ActiveReserveCard from '@/Components/Molecules/ActiveReservesCard/ActiveReserveCard';
import reserveServices from '../../Services/stayServices'
import Loader from "@/Components/Organism/loaderScreen/loader";
import { useRouter } from 'next/navigation';
import AlertServices from '@/utils/AlertServices';
import GuardLogin from '@/utils/guardLogin';
import { FaListAlt } from "react-icons/fa";
import QueryReserve from '../queryReserve/page';

interface IAllReservesData {
    id: string,
    name: string,
    dni: string,
    amount: string,
    phone: string,
    managerMemberNumber: string,
    finishDate: string,
    initDate: string,
    managerCarPlate: string,
    stayType: string
}

interface IReserves {
    changeComponent: any
}

const Reserves: React.FC<IReserves> = ({ changeComponent }) =>{
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

        if(!allActiveReservesData) {
            AlertServices.rederAlertWithConfirm(
                'Falla en el servidor',
                'No se puede conectar con el servidor, contactese con el administrador',
                'error',
                'Finalizar',
                () => {router.push('/')}
            )
            return
        }
        setAllReservesData(allActiveReservesData) 
        setIsLoading(false)
    }

    function onDelete(id:string) {
        const reserves = allReservesData
        setAllReservesData([... reserves.filter(reserve => reserve.id != id)])
    }

    useEffect(() => {
        getActiveReserves()
    }, [])

    return (
        <GuardLogin>
        {
            isLoading? <Loader/> :
            <>
                <LittleABMTemplate title="Reservas" subTitle="Administración de reservas" icon={<FaListAlt/>}> 
                <div className={style.reservesContainer__titleTableButtonContainer}>
                    <div className={style.reservesContainer__titleTableContainer}>
                            <span className={style.reservesContainer__title}><b>Reservas activas</b></span>
                            <div className={style.reservesContainer__actualReserve}>
                                {allReservesData.map((reserve, index) => 
                                <ActiveReserveCard 
                                key={reserve.id}
                                id={reserve.id}
                                name={reserve.name}
                                typeStay={reserve.stayType}
                                managerDNI={reserve.dni}
                                managerMemberNumber={reserve.managerMemberNumber}
                                managerCarPlate = {reserve.managerCarPlate}
                                finishDate={reserve.finishDate}
                                initDate={reserve.initDate}
                                phone={reserve.phone}
                                amount={reserve.amount}
                                onDelete={() => onDelete(reserve.id)}
                                />
                                
                                )}
                                
                            </div>

                    </div>
                        
                    <div className={style.reservesContainer__buttonContainer}>
                        <Button isLoading={isLoadingButtons[0]} text='Buscar reserva por DNI' type='primary' isFullWidth={true} onClickFunction={() => changeComponent('buscarReserva')}></Button>
                    </div>
                </div>
                    
                    
                </LittleABMTemplate>
            </>
        }  

        </GuardLogin>
    );
};

export default Reserves;
