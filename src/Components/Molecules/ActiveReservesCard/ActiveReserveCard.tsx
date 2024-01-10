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
    typeStay: string,
    managerCarPlate: string,
    onDelete: any,
    phone: string
}

const ActiveReserveCard: React.FC<IActiveReserveCard> = ({
    id,
    name,
    managerDNI,
    managerMemberNumber,
    finishDate,
    initDate,
    typeStay,
    managerCarPlate,
    phone,
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
                    <span><b>Tipo:</b> {typeStay}</span>
                    <span><b>Responsable:</b> {managerDNI} - {name.trim()? name: 'Nombre no informado'} </span>
                    <span><b>Telefono:</b> {phone? phone: 'No informado'}</span>
            </div>

            <div className={style.addEditPriceContainer___rightSide}>
                <PeriodReserve initDateUnix={initDate} finishDateUnix={finishDate} isStayDay={typeStay == 'Dia'}></PeriodReserve>
            </div>
            
        </div>
        <Button text="Eliminar" type="danger" isLoading={isEliminteReserve} isFullWidth={true} onClickFunction={() => eliminateReserve()}></Button>
        <br />
        </>
    )
}

export default ActiveReserveCard