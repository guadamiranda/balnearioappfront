'use client'

import ManagerSection from '@/Components/Organism/ResponsableSection/ManagerSection'
import VehiculeSection from '@/Components/Organism/VehiculeSection/VehiculeSection'
import ResidentSection from '@/Components/Organism/GroupSection/ResidentSection'
import ABMTemplate from '@/Components/templates/abmTemplate/ABMTemplate'
import DateSection from '@/Components/Organism/DateSection/DateSection'
import reserveServices from '../../Services/reserveServices' 
import Button from '@/Components/Atoms/button/button'
import style from './registrarEstadia.module.scss'
import ReactDOMServer from 'react-dom/server'
import GuardLogin from '@/utils/guardLogin'
import { useState } from 'react'
import Swal from 'sweetalert2'

type IVehicule = {
    carPlate: string,
    index: number,
    key: number,   
}

type IResident = {
    partnerNumber: number, 
    isPartner: boolean,
    dniNumber: number, 
    index: number,
    key: number,
}

const RegistrarEstadia = () => {
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;

    const [managerLastName, setManagerLastName] = useState<string>('')
    const [carPlateNumber, setCarPlateNumber] = useState<string>('')
    const [partnerNumber, setPartnerNumber] = useState<string>('')
    const [residents, setResidents] = useState<IResident[]>([])
    const [vehicules, setVehicules] = useState<IVehicule[]>([])
    const [managerName, setManagerName] = useState<string>('')
    const [pricePerPerson, setPricePerPerson] = useState(1000)
    const [cleanDataFlag, setCleanDataFlag] = useState(false)
    const [dniNumber, setdniNumber] = useState<number>(0)
    const [priceOneDay, setPriceOneDay] = useState(2000) 
    const [dateFrom, setDateFrom] = useState(0)
    const [dateTo, setDateTo] = useState(0)

    const [totalPrice, setTotalPrice] = useState(pricePerPerson)

    const cleanData = () => {
        setCleanDataFlag(!cleanDataFlag)
        setManagerLastName('')
        setCarPlateNumber('')
        setPartnerNumber('')
        setManagerName('')
        setResidents([])
        setVehicules([])
        setdniNumber(0)
        setDateFrom(0)
        setDateTo(0)
        
        setTotalPrice(pricePerPerson)
    }

    const validateMissingData = () => {
        let allMissingData = []
        if(managerName === '') allMissingData.push('Nombre del Responsable')
        if(managerLastName === '') allMissingData.push('Apellido del Responsable')
        if(dniNumber === 0 && partnerNumber === '') allMissingData.push('Número de documento o socio del responsable')
        if(carPlateNumber === '') allMissingData.push('Número de patente')
        if(dateFrom === 0) allMissingData.push('Fecha desde')
        if(dateTo === 0) allMissingData.push('Fecha hasta')
        return allMissingData
    }

    async function registerData() {
        const missingData = validateMissingData()
        console.log(dateFrom * 1000)
        console.log(dateTo * 1000)
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)
        if (missingData.length === 0) {
            const newReserve = {
                initDate: (dateFrom * 1000).toString(), 
                finishDate: (dateTo * 1000).toString(), 
                workshiftId: userData.workshiftId, 
                price: totalPrice.toString(),
                managerCarPlate: carPlateNumber.toString(),
                managerDni: dniNumber.toString(),
                managerFirstName: managerName,
                managerLastName: managerLastName, 
                managerMemberNumber: partnerNumber.toString(),
                residents: residents.map((resident) => ({dni: resident.dniNumber.toString(), memberNumber: resident.partnerNumber.toString()})),
                vehicles: vehicules.map((vehicule) => ({carPlate: vehicule.carPlate.toString(), vehicleType: '0b05ba6a-b817-4f88-825d-4e787ef82e5a'}))}
        
        await reserveServices.postReserve(newReserve)
            
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
    <GuardLogin>
        <ABMTemplate title="Registrar Estadía" subTitle="Ingresa los datos para registrar la estadía.">
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
        </ABMTemplate>
    </GuardLogin>
    )
}

export default RegistrarEstadia

