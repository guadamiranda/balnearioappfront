'use client'
import { useState } from 'react'
import style from './registrarEstadia.module.scss'
import ManagerSection from '../ResponsableSection/ManagerSection'
import Button from '@/Components/Atoms/button/button'
import DateSection from '../DateSection/DateSection'
import ResidentSection from '../GroupSection/ResidentSection'
import VehiculeSection from '../VehiculeSection/VehiculeSection'

type IResidentVehicule = {
    index: number,
    key: number
}

const RegistrarEstadia = () => {
    const [cleanDataFlag, setCleanDataFlag] = useState(false)
    const [dateFrom, setDateFrom] = useState(0)
    const [dateTo, setDateTo] = useState(0)
    const [managerLastName, setManagerLastName] = useState<string>('')
    const [dniNumber, setdniNumber] = useState<number>(0)
    const [carPlateNumber, setCarPlateNumber] = useState<string>('')
    const [partnerNumber, setPartnerNumber] = useState<number>(0)
    const [managerName, setManagerName] = useState<string>('')
    const [pricePerPerson, setPricePerPerson] = useState(1000)
    const [priceOneDay, setPriceOneDay] = useState(2000)
    const [residentsInRegister, setResidentsInRegister] = useState<IResidentVehicule[]>([])
    const [vehiculesInRegister, setVehiculesInRegister] = useState<IResidentVehicule[]>([])
    const [totalPrice, setTotalPrice] = useState(pricePerPerson)

    const cleanData = () => {
        setCleanDataFlag(!cleanDataFlag)
        setCarPlateNumber('')
        setDateFrom(0)
        setDateTo(0)
        setdniNumber(0)
        setManagerLastName('')
        setManagerName('')
        setPartnerNumber(0)
        setResidentsInRegister([])
        setVehiculesInRegister([])
    }

    const registerData = () => {
        console.log("Nombre del Encargado: ", managerName)
        console.log("Apellido del Encargado: ", managerLastName)
        console.log("Numero de DNI: ", dniNumber)
        console.log("Numero de Socio: ", partnerNumber)
        console.log("Patente del vehiculo: ", carPlateNumber)
        console.log("-----------------------------------------")
        console.log("Datos del grupo: ", residentsInRegister)
        console.log("-----------------------------------------")
        console.log("Datos de los vehiculos: ", vehiculesInRegister)
        console.log("-----------------------------------------")
        console.log("Fecha desde en UNIX: ", dateFrom)
        console.log("Fecha hasta en UNIX: ", dateTo)
        console.log("-----------------------------------------")
        console.log("Precio Total: ", totalPrice)
    }

    return(
        <div className={style.registrarEstadiaContainer}>
            <div className={style.registrarEstadiaContainer__headerSection}>
                <ManagerSection carPlateNumber={carPlateNumber}
                                dniNumber={dniNumber}
                                partnerNumber={partnerNumber}
                                managerLastName={managerLastName}
                                managerName={managerName}
                                pricePerPerson={pricePerPerson}
                                totalPrice={totalPrice}
                                setTotalPrice={setTotalPrice}
                                setCarPlateNumber={setCarPlateNumber}
                                setDocumentNumber={setdniNumber}
                                setPartnerNumber={setPartnerNumber}
                                setManagerLastName={setManagerLastName}
                                setManagerName={setManagerName}
                ></ManagerSection>

                <br/>

                <ResidentSection 
                    cleanDataFlag={cleanDataFlag}
                    pricePerPerson={pricePerPerson}
                    totalPrice={totalPrice}
                    setResidentsInRegister={setResidentsInRegister}
                    setTotalPrice={setTotalPrice}
                ></ResidentSection>

                <br/>

                <VehiculeSection 
                    cleanDataFlag={cleanDataFlag}
                    setVehiculesInRegister={setVehiculesInRegister}
                ></VehiculeSection>

                <br/>

                <DateSection 
                    cleanDataFlag={cleanDataFlag}
                    priceOneDay={priceOneDay}
                    totalPrice={totalPrice}
                    setDateFromUnix={setDateFrom}
                    setDateToUnix={setDateTo}
                    setTotalPrice={setTotalPrice}
                ></DateSection>

            </div>

            <br/>
            
            <div className={style.registrarEstadiaContainer__footer}>
                <div className={style.registrarEstadiaContainer__sectionTotal}>
                    <span>Total de Estadía</span>
                    <span><b>$ {totalPrice}</b></span>
                </div>
                <div className={style.registrarEstadiaContainer__buttonsContainer}>
                    <Button text='Limpiar datos' type='secondary' onClickFunction={() => cleanData()} isFullWidth={true}></Button>
                    <div className={style.registrarEstadiaContainer__spaceButton}></div>
                    <Button text='Registrar Reserva' type='primary' onClickFunction={() => registerData()} isFullWidth={true}></Button>
                </div>
            </div>
            
        </div>
    )
}

export default RegistrarEstadia

