import CardInfoEntity from '../../Molecules/residentReserve/cardInfoEntity';
import PeriodReserve from '../../Molecules/periodReserve/periodReserve';
import style from "./infoReserve.module.scss";
import { FaUserAlt } from "react-icons/fa";

interface IInfoReserve {
    infoReserve: ReserveDto
}

const InfoReserve:React.FC<IInfoReserve>  = ({infoReserve}) => {
    const getInfoResidents = (residents: ResidentDto[]): string[] => {
        return residents.map(resident => (resident.dni != '0' ? resident.dni : resident.memberNumber))
    }

    const getInfoVehicles = (vehicles: VehicleDto[]): string[] => {
        return vehicles.map(vehicle => vehicle.carPlate)
    }

    return (
        <div className={style.reserveContainer}>
            <PeriodReserve initDateUnix={infoReserve.initDate} finishDateUnix={infoReserve.finishDate}></PeriodReserve>
            <div className={style.reserveContainer__managerSection}>
                <div className={style.reserveContainer__icon}>
                    <FaUserAlt/>
                </div>
                <div className={style.reserveContainer__managerData}>
                    <div className={style.reserveContainer__managerDataBody}>
                        <span><b>Nombre completo:</b> {infoReserve.managerLastName}, {infoReserve.managerFirstName}</span>
                        <span><b>DNI/NroSocio: </b>{infoReserve.managerMemberNumber === '' ? infoReserve.managerDni : infoReserve.managerMemberNumber}</span>
                        <span><b>Número de Patente:</b> {infoReserve.managerCarPlate}</span>
                    </div>
                </div>
            </div>
            <CardInfoEntity typeInfoName={'dni'} infoNames={getInfoResidents(infoReserve.residents)}/>
            <CardInfoEntity typeInfoName={'carPlate'} infoNames={getInfoVehicles(infoReserve.vehicles)}/>
        </div>
    );
};

export default InfoReserve;
