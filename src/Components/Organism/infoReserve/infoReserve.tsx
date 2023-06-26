import GaugerReserve from '../../Molecules/gaugerReserve/gaugerReserve'
import style from "./infoReserve.module.scss";
import Button from '../../Atoms/button/button';
import PeriodReserve from '../../Molecules/periodReserve/periodReserve';

const InfoReserve = () => {

    const getInfoReserve = (cardPlate: string, dni: string) => {
        return {
            dniResidents: ['45.552.653', '35.306.215', '13.568.986'],
            cardPlates: ['AB 349 FIO', 'BD 493 PE'],
            initReserve: 1687478400000,
            finishReserve: 1687910400000
        }
    }

    const infoReserve = getInfoReserve('','')

    return (
        <div className={style.reserveContainer}>
            <PeriodReserve initDateUnix={infoReserve.initReserve} finishDateUnix={infoReserve.finishReserve}></PeriodReserve>
            <div className={style.reserveContainer__gaugers}>

            </div>
        </div>
    );
};

export default InfoReserve;
