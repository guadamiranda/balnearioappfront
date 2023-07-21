
import PeriodReserve from '../../Molecules/periodReserve/periodReserve';
import style from "./actualReserve.module.scss";

const ActualReserve = () => {

    const getInfoReserve = (cardPlate: string, dni: string) => {
        return {
            dniResidents: ['45.552.653', '35.306.215', '13.568.986'],
            cardPlates: ['AB 349 FIO', 'BD 493 PE'],
            initReserve: 1687478400000,
            finishReserve: 1688165531000
        }
    }

    const infoReserve = getInfoReserve('','')

    return (
        <div className={style.reserveContainer}>
            <PeriodReserve initDateUnix={infoReserve.initReserve} finishDateUnix={infoReserve.finishReserve}></PeriodReserve>
        </div>
    );
};

export default ActualReserve;
