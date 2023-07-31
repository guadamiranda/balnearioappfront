import style from "./activeReserveCard.module.scss";
import PeriodReserve from "../periodReserve/periodReserve";
import Button from "@/Components/Atoms/button/button";
import AlertServices from "@/utils/AlertServices";
import reserveServices from "@/Services/reserveServices";
import { useState } from "react";

interface IActiveReserveCard {
    id: string,
    managerName: string,
    managerLastName: string,
    managerDNI: string,
    managerMemberNumber: string,
    finishDate: string,
    initDate: string,
    managerCarPlate: string
}

const ActiveReserveCard: React.FC<IActiveReserveCard> = ({
    id,
    managerName, 
    managerLastName,
    managerDNI,
    managerMemberNumber,
    finishDate,
    initDate,
    managerCarPlate

    }) => {
    const [isEliminteReserve, setIsEliminateReserve] = useState<boolean>(false)
    const eliminateReserve = () => {
        AlertServices.rederAlertWithConfirm(
            '¿Esta seguro?', 
            'Esta a punto de eliminar una reserva y no es reversible', 
            'warning',
            async () => {
                setIsEliminateReserve(true) 
                await reserveServices.deleteReserve(id)
                window.location.reload()
            }
        )
    }
    return(
        <>
        <div className={style.addEditPriceContainer}>
            <div className={style.addEditPriceContainer___leftSide}>
                <span>Responsable: </span>
                <span><b>Nombre:</b> {managerName}, {managerLastName}</span>
                <span><b>DNI:</b> {managerDNI}</span>
                <span><b>N° Socio:</b> {managerMemberNumber === '' ? '-' : managerMemberNumber}</span>
                <span><b>Patente:</b> {managerCarPlate} </span>

            </div>
            <div className={style.addEditPriceContainer___rightSide}>
                <PeriodReserve initDateUnix={initDate} finishDateUnix={finishDate}></PeriodReserve>
            </div>
            
        </div>
        <Button text="Eliminar" type="danger" isLoading={isEliminteReserve} isFullWidth={true} onClickFunction={() => eliminateReserve()}></Button>
        <br />
        </>
    )
}

export default ActiveReserveCard