import style from "./activeReserveCard.module.scss";
import PeriodReserve from "../periodReserve/periodReserve";
import Button from "@/Components/Atoms/button/button";
import AlertServices from "@/utils/AlertServices";
import reserveServices from "@/Services/stayServices";
import { useState } from "react";

interface IActiveReserveCard {
    id: string,
    name: string,
    managerDNI: string,
    managerMemberNumber: string,
    finishDate: string,
    initDate: string,
    managerCarPlate: string,
    onDelete: any,
}

const ActiveReserveCard: React.FC<IActiveReserveCard> = ({
    id,
    name,
    managerDNI,
    managerMemberNumber,
    finishDate,
    initDate,
    managerCarPlate,
    onDelete,
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
                onDelete()
            }
        )
    }
    return(
        <>
        <div className={style.addEditPriceContainer}>
            <div className={style.addEditPriceContainer___leftSide}>
                    <span>Responsable: <b>{managerDNI}</b> - <b>{name}</b> </span>
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