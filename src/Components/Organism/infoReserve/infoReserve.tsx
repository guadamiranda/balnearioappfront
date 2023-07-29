import CardInfoEntity from '../../Molecules/residentReserve/cardInfoEntity';
import PeriodReserve from '../../Molecules/periodReserve/periodReserve';
import style from "./infoReserve.module.scss";

interface IInfoReserve {
    infoReserve: ReserveDto
}

const InfoReserve:React.FC<IInfoReserve>  = ({infoReserve}) => {
    const getInfoResidents = (residents: ResidentDto[]): string[] => {
        return residents.map(resident => resident.dni)
    }

    const getInfoVehicles = (vehicles: VehicleDto[]): string[] => {
        return vehicles.map(vehicle => vehicle.carPlate)
    }

    return (
        <div className={style.reserveContainer}>
            <PeriodReserve initDateUnix={infoReserve.initDate} finishDateUnix={infoReserve.finishDate}></PeriodReserve>
            <CardInfoEntity typeInfoName={'dni'} infoNames={getInfoResidents(infoReserve.residents)}/>
            <CardInfoEntity typeInfoName={'carPlate'} infoNames={getInfoVehicles(infoReserve.vehicles)}/>
        </div>
    );
};

export default InfoReserve;
