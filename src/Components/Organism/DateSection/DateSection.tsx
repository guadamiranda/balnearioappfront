import { useEffect, useState } from 'react'
import style from './dateSection.module.scss'
import Checkbox from '@/Components/Atoms/Checkbox/Checkbox'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado'
import ReservationDays from '@/Components/Molecules/ReservationDays/ReservationDays'

interface IDateSection {
    cleanDataFlag: boolean,
    setDateFromUnix: (dateFrom: number) => void,
    setDateToUnix: (dateFrom: number) => void,
    setNumberOfDays: (numberOfDays: number) => void,
    setTotalPrice: (price: number) => void,
    setCheckOneDay: (check: boolean) => void
}

const DateSection: React.FC<IDateSection> = ({
    cleanDataFlag,
    setDateFromUnix,
    setDateToUnix,
    setNumberOfDays,
    setTotalPrice,
    setCheckOneDay
    }) => {

    const [isCheckedOneDay, setIsCheckedOneDay] = useState(false)
    const [dateFrom, setDateFrom] = useState<number>(0)
    const [dateTo, setDateTo] = useState<number>(0)

    const calculateUnixDate = (completeDateFrom: Date, completeDateTo: Date, isOneDay: boolean) => {
        completeDateFrom.setHours(0)
        completeDateFrom.setMinutes(0)
        completeDateFrom.setSeconds(0)

        completeDateTo.setHours(20)
        completeDateTo.setMinutes(59)
        completeDateTo.setSeconds(0)
        
        const unixTimeFrom = Math.floor(completeDateFrom.getTime() / 1000);
        const unixTimeTo = Math.floor(completeDateTo.getTime() / 1000);

        return {
            unixTimeFrom, 
            unixTimeTo}
    }

    const setPriceAndChecked = () => { 
        setTotalPrice(0)
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

    const cleanDataDateSection = () => {
        setDateFrom(0)
        setDateTo(0)
        setNumberOfDays(-1)
    }

    useEffect(() => { 
        {dateFrom != 0 && dateTo != 0 ? calculateDays() : null}       
    }, [dateFrom, dateTo]) 

    useEffect(() => {
        cleanDataDateSection()
    }, [cleanDataFlag])

    return(
        <div className={style.registrarEstadiaContainer__section}>
            <Encabezado title='Datos de la Estadía'/>
            <Checkbox cleanDataFlag={cleanDataFlag}
                      title='¿Se queda a pasar el día?' 
                      onClickFunction={setPriceAndChecked}/>
                              
            {isCheckedOneDay? <></> : 
            <div className={style.registrarEstadiaContainer__estadia}>
                <ReservationDays 
                    setFechaDesdeFunction={setDateFrom} 
                    setFechaHastaFunction={setDateTo}
                    valueDateFrom={dateFrom}
                    valueDateTo={dateTo} />
            </div>
            }
            
        </div>
    )
}

export default DateSection
