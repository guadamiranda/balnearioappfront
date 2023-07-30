import style from "./activeReserveCard.module.scss";
import PeriodReserve from "../periodReserve/periodReserve";

interface IActiveReserveCard {
    managerName: string,
    managerLastName: string,
    managerDNI: string,
    managerMemberNumber: string,
    finishDate: string,
    initDate: string
}

const ActiveReserveCard: React.FC<IActiveReserveCard> = ({
    managerName, 
    managerLastName,
    managerDNI,
    managerMemberNumber,
    finishDate,
    initDate

    }) => {

    return(
        <div className={style.addEditPriceContainer}>
            <div className={style.addEditPriceContainer___leftSide}>
                <span>Responsable: </span>
                <span><b>Nombre:</b> {managerName}, {managerLastName}</span>
                <span><b>DNI:</b> {managerDNI}</span>
                <span><b>N° Socio:</b> {managerMemberNumber === '' ? '-' : managerMemberNumber}</span>
                <span><b>Patente:</b> </span>

            </div>
            <div className={style.addEditPriceContainer___rightSide}>
                <PeriodReserve initDateUnix={initDate} finishDateUnix={finishDate}></PeriodReserve>
            </div>
        </div>
    )
}

export default ActiveReserveCard