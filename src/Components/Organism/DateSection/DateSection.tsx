import { useEffect, useState } from 'react'
import style from './dateSection.module.scss'
import Checkbox from '@/Components/Atoms/Checkbox/Checkbox'
import ReservationDays from '@/Components/Molecules/ReservationDays/ReservationDays'

interface IDateSection {
    setDateFromUnix: any,
    setDateToUnix: any,
    setNumberOfDays: any,
    setCheckOneDay: any,
}

const DateSection: React.FC<IDateSection> = ({
    setDateFromUnix,
    setDateToUnix,
    setNumberOfDays,
    setCheckOneDay
    }) => {

    const [isCheckedOneDay, setIsCheckedOneDay] = useState(false)
    const [dateFrom, setDateFrom] = useState<number>(0)
    const [dateTo, setDateTo] = useState<number>(0)

    const calculateUnixDate = (completeDateFrom: Date, completeDateTo: Date, isOneDay: boolean) => {
        completeDateFrom.setHours(9)
        completeDateFrom.setMinutes(0)
        completeDateFrom.setSeconds(0)

        completeDateTo.setHours(!isOneDay ? 12 : 21)
        completeDateTo.setMinutes(0)
        completeDateTo.setSeconds(0)
        
        const unixTimeFrom = Math.floor(completeDateFrom.getTime() / 1000);
        const unixTimeTo = Math.floor(completeDateTo.getTime() / 1000);

        return {
            unixTimeFrom, 
            unixTimeTo}
    }

    const setPriceAndChecked = () => { 
        const newChecked = !isCheckedOneDay
        setCheckOneDay(newChecked)
        const completeDateFrom = new Date()
        const completeDateTo = new Date()
        const calculatedUnixDays = calculateUnixDate(completeDateFrom, completeDateTo, true)

        setDateFromUnix(calculatedUnixDays.unixTimeFrom)
        setDateToUnix(calculatedUnixDays.unixTimeTo)
        setIsCheckedOneDay(newChecked)
        setNumberOfDays(newChecked? 0 : -1)

        if (newChecked === false) {
            setDateFrom(0)
            setDateTo(0)
            setDateFromUnix(0)
            setDateToUnix(0)
        }
    }

    const calculateDays = () => {
        const completeDateFrom = new Date(dateFrom + 'T00:00:00')
        const completeDateTo = new Date(dateTo + 'T23:59:00')

        const calculatedUnixDays = calculateUnixDate(completeDateFrom, completeDateTo, false)

        const differenceInSeconds = calculatedUnixDays.unixTimeTo - calculatedUnixDays.unixTimeFrom;
        const secondsInOneDay = 24 * 60 * 60;
        const calculatedNumberOfDays = Math.floor(differenceInSeconds / secondsInOneDay)
        setNumberOfDays(calculatedNumberOfDays === 0 ? 0 : calculatedNumberOfDays);

        setDateFromUnix(calculatedUnixDays.unixTimeFrom)
        setDateToUnix(calculatedUnixDays.unixTimeTo)    
    }

    useEffect(() => { 
        {dateFrom != 0 && dateTo != 0 ? calculateDays() : null}       
    }, [dateFrom, dateTo]) 

    return(
        <div className={style.registrarEstadiaContainer__section}>
            <div className={style.registrarEstadiaContainer__estadia}>
                <ReservationDays 
                    setFechaDesdeFunction={setDateFrom} 
                    setFechaHastaFunction={setDateTo}
                    valueDateFrom={dateFrom}
                    valueDateTo={dateTo} />
            </div> 
        </div>
    )
}

export default DateSection
