import CardInfoEntity from '../../Molecules/residentReserve/cardInfoEntity';
import PeriodReserve from '../../Molecules/periodReserve/periodReserve';
import style from "./infoReserve.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { useState } from 'react';

const InfoReserve:React.FC<any>  = ({infoReserve}) => {
    const {stay, group, visitors} = infoReserve as ISpecificStay
    const [manager,setManager] = useState<ISpecificVisitor>(visitors.find(visitor => visitor.isManager) || {} as ISpecificVisitor)
    const getNroDocVisitors = (visitors: ISpecificVisitor[]): string[] => {
        const visitorThatAreNotManager = visitors.filter(visitor => !visitor.isManager)
        return visitorThatAreNotManager.map(visitor => (visitor.nroDoc ? visitor.nroDoc.toString() : ''))
    }
    //TODO: Agregar el idStay a la interfaz
    return (
        <div className={style.reserveContainer}>
            <PeriodReserve initDateUnix={stay.initDate} finishDateUnix={stay.finishDate} isStayDay={false}/>
            <div className={style.reserveContainer__managerSection}>
                <div className={style.reserveContainer__icon}>
                    <FaUserAlt/>
                </div>
                <div className={style.reserveContainer__managerData}>
                    <div className={style.reserveContainer__managerDataBody}>
                        <span><b>Nombre completo:</b> {manager.person.firstName}, {manager.person.lastName}</span>
                        <span><b>DNI: </b>{manager.person.nroDoc}</span>
                        <span><b>Número de Patente:</b> {group.carPlate? group.carPlate : '-'}</span>
                        <span><b>Cantidad de caballos:</b> {group.animals.quantity || 0}</span>
                    </div>
                </div>
            </div>
            <CardInfoEntity typeInfoName={'dni'} infoNames={getNroDocVisitors(visitors)}/>
        </div>
    );
};

export default InfoReserve;
