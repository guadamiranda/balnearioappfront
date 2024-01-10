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

    const getFullNameManager = () => {
        if(!manager) return 'No informado'
        
        if(manager.person.firstName && manager.person.lastName) {
            return `${manager.person.firstName} ${manager.person.lastName}`
        }

        return 'No informado'
    }

    return (
        <div className={style.reserveContainer}>
            <PeriodReserve initDateUnix={stay.initDate} finishDateUnix={stay.finishDate} isStayDay={stay.stayType == 'Dia'}/>
            <div className={style.reserveContainer__managerSection}>
                <div className={style.reserveContainer__icon}>
                    <FaUserAlt/>
                </div>
                <div className={style.reserveContainer__managerData}>
                    <div className={style.reserveContainer__managerDataBody}>
                        <span><b>Nombre completo:</b> {getFullNameManager()}</span>
                        <span><b>DNI: </b>{manager.person.nroDoc}</span>
                        <span><b>Telefono: </b>{manager.person.phone? manager.person.phone : 'No informado'}</span>
                        <span><b>Número de Patente:</b> {group.carPlate? group.carPlate : 'No informado'}</span>
                        <span><b>Cantidad de caballos:</b> {group.animals?.quantity || 0}</span>
                    </div>
                </div>
            </div>
            <CardInfoEntity typeInfoName={'dni'} infoNames={getNroDocVisitors(visitors)}/>
        </div>
    );
};

export default InfoReserve;
