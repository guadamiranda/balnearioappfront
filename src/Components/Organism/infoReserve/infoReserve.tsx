import GaugerReserve from './gaugerReserve'
import style from "./infoReserve.module.scss";
import Button from '../../Atoms/button/button';

const InfoReserve = () => {

    const getInfoReserve = (cardPlate: string, dni: string) => {
        return {
            amountTruck: Math.floor(Math.random() * 5),
            amountPickup: Math.floor(Math.random() * 5),
            amountCars: Math.floor(Math.random() * 5),
            amountPerson: Math.floor(Math.random() * 5),
            initReserve: '12/05/2023',
            finishReserve: '15/05/2023'
        }
    }

    const infoReserve = getInfoReserve('','')

    return (
        <div className={style.reserveContainer}>
            <div className={style.gaugers}>
                <GaugerReserve entityName='truck' amount={infoReserve.amountTruck}></GaugerReserve>
                <GaugerReserve entityName='pickup' amount={infoReserve.amountPickup}></GaugerReserve>
                <GaugerReserve entityName='car' amount={infoReserve.amountCars}></GaugerReserve>
                <GaugerReserve entityName='person' amount={infoReserve.amountPerson}></GaugerReserve>
            </div>
        </div>
    );
};

export default InfoReserve;
