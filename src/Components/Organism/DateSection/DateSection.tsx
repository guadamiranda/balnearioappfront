import { useEffect, useState } from 'react'
import style from './dateSection.module.scss'
import Checkbox from '@/Components/Atoms/Checkbox/Checkbox'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado'
import ReservationDays from '@/Components/Molecules/ReservationDays/ReservationDays'

interface IDateSection {
    cleanDataFlag: boolean,
    priceOneDay: number,
    totalPrice: number,
    setDateFromUnix: (dateFrom: number) => void,
    setDateToUnix: (dateFrom: number) => void,
    setTotalPrice: (price: number) => void
}

const DateSection: React.FC<IDateSection> = ({
    cleanDataFlag,
    priceOneDay,
    totalPrice,
    setDateFromUnix,
    setDateToUnix,
    setTotalPrice,
    }) => {

    const [isCheckedOneDay, setIsCheckedOneDay] = useState(false)
    const [dateFrom, setDateFrom] = useState<number>(0)
    const [dateTo, setDateTo] = useState<number>(0)

    const calculateUnixDate = (completeDateFrom: Date, completeDateTo: Date, isOneDay: boolean) => {
        completeDateFrom.setHours(isOneDay? 0 : completeDateFrom.getHours() + 3)
        completeDateFrom.setMinutes(0)
        completeDateFrom.setSeconds(0)

        completeDateTo.setHours(isOneDay? 23 : completeDateTo.getHours() + 26)
        completeDateTo.setMinutes(59)
        completeDateTo.setSeconds(0)
        
        const unixTimeFrom = Math.floor(completeDateFrom.getTime() / 1000);
        const unixTimeTo = Math.floor(completeDateTo.getTime() / 1000);

        return {
            unixTimeFrom, 
            unixTimeTo}
    }

    const setPriceAndChecked = () => { 
        const newChecked = !isCheckedOneDay
        const completeDateFrom = new Date()
        const completeDateTo = new Date()
        const calculatedUnixDays = calculateUnixDate(completeDateFrom, completeDateTo, true)

        setDateFromUnix(calculatedUnixDays.unixTimeFrom)
        setDateToUnix(calculatedUnixDays.unixTimeTo)
        setIsCheckedOneDay(newChecked)
        setTotalPrice(newChecked? (totalPrice + priceOneDay) : (totalPrice === 0 ? 0 : (totalPrice - priceOneDay)))
    }

    const calculateDays = () => {
        const completeDateFrom = new Date(dateFrom)
        const completeDateTo = new Date(dateTo)

        const calculatedUnixDays = calculateUnixDate(completeDateFrom, completeDateTo, false)

        const differenceInSeconds = calculatedUnixDays.unixTimeTo - calculatedUnixDays.unixTimeFrom;
        const secondsInOneDay = 24 * 60 * 60;
        const numberOfDays = Math.floor(differenceInSeconds / secondsInOneDay);

        setDateFromUnix(calculatedUnixDays.unixTimeFrom)
        setDateToUnix(calculatedUnixDays.unixTimeTo)
        setTotalPrice(totalPrice + (numberOfDays * priceOneDay))
    }

    const cleanDataDateSection = () => {
        setDateFrom(0)
        setDateTo(0)
    }

    useEffect(() => {
        {dateFrom != 0 && dateTo != 0 ? calculateDays() : null}       
    }, [dateFrom, dateTo]) 

    useEffect(() => {
        setIsCheckedOneDay(false)
        cleanDataDateSection()
    }, [cleanDataFlag])

    return(
        <div className={style.registrarEstadiaContainer__section}>
            <Encabezado title='Datos de la Estadía'/>
            <Checkbox cleanDataFlag={cleanDataFlag}
                      title='¿Se queda menos de un día?' 
                      onClickFunction={setPriceAndChecked}/>
                              
            {isCheckedOneDay? <></> : 
            <div className={style.registrarEstadiaContainer__estadia}>
                <ReservationDays 
                    setFechaDesdeFunction={setDateFrom} 
                    setFechaHastaFunction={setDateTo} 
                    valueDateFrom={dateFrom}
                    valueDateTo={dateTo}/>
            </div>
            }
            
        </div>
    )
}

export default DateSection
