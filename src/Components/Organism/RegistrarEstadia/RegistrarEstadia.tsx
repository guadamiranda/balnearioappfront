'use client'
import ReactDOMServer from 'react-dom/server'
import Swal from 'sweetalert2'
import { useState } from 'react'
import style from './registrarEstadia.module.scss'
import ManagerSection from '../ResponsableSection/ManagerSection'
import Button from '@/Components/Atoms/button/button'
import DateSection from '../DateSection/DateSection'
import ResidentSection from '../GroupSection/ResidentSection'
import VehiculeSection from '../VehiculeSection/VehiculeSection'

type IVehicule = {
    index: number,
    key: number,
    carPlate: string
}

type IResident = {
    index: number,
    key: number,
    dniNumber: number, 
    partnerNumber: number, 
    isPartner: boolean
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
    const [residents, setResidents] = useState<IResident[]>([])
    const [vehicules, setVehicules] = useState<IVehicule[]>([])
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
        setResidents([])
        setVehicules([])
        setTotalPrice(pricePerPerson)
    }

    const validateMissingData = () => {
        let allMissingData = []
        if(managerName === '') allMissingData.push('Nombre del Responsable')
        if(managerLastName === '') allMissingData.push('Apellido del Responsable')
        if(dniNumber === 0 && partnerNumber === 0) allMissingData.push('Número de documento o socio del responsable')
        if(carPlateNumber === '') allMissingData.push('Número de patente')
        if(residents.some(resident => resident.dniNumber === 0 && resident.partnerNumber === 0)) allMissingData.push('Número de documento o socio de una persona del grupo')
        if(vehicules.some(vehicule => vehicule.carPlate === '')) allMissingData.push('Número de patente de un vehiculo')
        if(dateFrom === 0) allMissingData.push('Fecha desde')
        if(dateTo === 0) allMissingData.push('Fecha hasta')
        return allMissingData
    }

    const registerData = () => {
        const missingData = validateMissingData()
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)
        console.log(missingDataFormatedInHTML)
        if (missingData.length === 0) {
            console.log("Nombre del Encargado: ", managerName);
            console.log("Apellido del Encargado: ", managerLastName);
            console.log("Numero de DNI: ", dniNumber);
            console.log("Numero de Socio: ", partnerNumber);
            console.log("Patente del vehiculo: ", carPlateNumber);
            console.log("-----------------------------------------");
            console.log("Datos del grupo: ", residents);
            console.log("-----------------------------------------");
            console.log("Datos de los vehiculos: ", vehicules);
            console.log("-----------------------------------------");
            console.log("Fecha desde en UNIX: ", dateFrom);
            console.log("Fecha hasta en UNIX: ", dateTo);
            console.log("-----------------------------------------");
            console.log("Precio Total: ", totalPrice);
        } else {
            Swal.fire({
                title: 'Faltan rellenar datos',
                html: "Faltan los siguientes datos: " + missingDataFormatedInHTML,
                icon: 'error',
                confirmButtonText: 'Entendido'
              });
        }
    }

    return(
        <div className={style.registrarEstadiaContainer}>
            <div className={style.registrarEstadiaContainer__headerSection}>
                <ManagerSection cleanDataFlag={cleanDataFlag}
                                carPlateNumber={carPlateNumber}
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
                    pricePerPerson={pricePerPerson}
                    totalPrice={totalPrice}
                    residents={residents}
                    setResidents={setResidents}
                    setTotalPrice={setTotalPrice}
                ></ResidentSection>

                <br/>

                <VehiculeSection 
                    vehicules={vehicules}
                    setVehicules={setVehicules}
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

