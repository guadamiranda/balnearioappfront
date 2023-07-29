import style from "./periodReserve.module.scss";

interface IPeriodReserve {
    initDateUnix: string,
    finishDateUnix: string
}

const PeriodReserve: React.FC<IPeriodReserve> = ({initDateUnix, finishDateUnix}) => {
    const todayDate = new Date()
    const initDate = new Date(initDateUnix)
    const finishDate = new Date(finishDateUnix)

    const getStateNamePeriodByDates = (todayUnix: number, initDateUnix: number, finishDateUnix: number): String => {
        
        return (
            initDateUnix < todayUnix && 
            todayUnix < finishDateUnix ? 
            'inRange' : 'outRange'
        )
    }

    const getDayMonthFormatByDate = (date: Date): string => {
        console.log()
        return `${date.getDate()}/${date.getMonth() + 1}`
    }

    const statePeriodName = getStateNamePeriodByDates(todayDate.getTime(), initDate.getTime(), finishDate.getTime()) 

    const styleContainer = `${style.periodReserve} ${style[`periodReserve-${statePeriodName}`]}`
    const styleDotDate = `${style.periodReserve__dotToday} ${style[`periodReserve__dotToday-${statePeriodName}`]}`
    return (
        <div className={styleContainer}>
            <div className={style.periodReserve__dateInfo}>
                <p>Entrada</p>
                <p>{getDayMonthFormatByDate(initDate)}</p>
            </div>
            <div className={style.periodReserve__todayDate}>
                <div className={style.periodReserve__lineToday}></div>
                <div className={styleDotDate}></div>
                <div className={style.periodReserve__today}>{getDayMonthFormatByDate(todayDate)}</div>
            </div>
            <div className={style.periodReserve__dateInfo}>
                <p>Salida</p>
                <p>{getDayMonthFormatByDate(finishDate)}</p>
            </div>
        </div>
    );
};

export default PeriodReserve;
