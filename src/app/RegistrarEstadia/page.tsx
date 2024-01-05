'use client'

import AddDatosEstadia from '@/Components/Molecules/AddDatosEstadia/AddDatosEstadia';
import MultiStepOrder from '@/Components/Molecules/MultiStepOrder/MultiStepOrder';
import AddLeaderGroup from '@/Components/Molecules/AddGroupLeader/AddGroupLeader';
import EstadiaSummary from '@/Components/Molecules/EstadiaSummary/EstadiaSummary';
import ABMTemplate from '@/Components/templates/abmTemplate/ABMTemplate';
import AddVisitors from '@/Components/Molecules/AddVisitors/AddVisitors';
import reserveServices from '@/Services/stayServices';
import Button from '@/Components/Atoms/button/button';
import priceServices from '@/Services/priceServices';
import style from './registrarEstadia.module.scss';
import AlertServices from '@/utils/AlertServices';
import ReactDOMServer from 'react-dom/server';
import GuardLogin from '@/utils/guardLogin';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface IDiscount {
    id: any,
}

interface IVisitors {
    dni: any,
    braceletNumber: any,
    price: any,
    discount: IDiscount,
}

interface ILeader {
    dniNumber: any,
    name: any,
    lastName: any,
    phone: any,
    partnerNumber: any,
    bracelet: any,
    price: any,
    location: any,
    discount: IDiscount,
}

interface IDate {
    numberOfDays: any,
    dateFromUnix: any,
    dateToUnix: any,
    checkOneDay: boolean
}

const RegistrarEstadia = () => {
    const [step, setStep] = useState(0)
    const [visitors, setVisitors] = useState<IVisitors[]>([])
    const [leader, setLeader] = useState<ILeader>({} as ILeader)
    const [vehiculePlate, setVehiculePlate] = useState('')
    const [hasVehicule, setHasVehicule] = useState(false)
    const [animalAmount, setAnimalAmount] = useState(0)
    const [datosFechas, setDatosFecha] = useState<IDate>({} as IDate) 
    const buttonContainerStyle = step === 0 ? style.registrarEstadiaContainer__buttonNext : ''
    const [amountPrice, setAmountPrice] = useState(0)
    const [prices, setPrices] = useState({})

    const [dayPrice, setDayPrice] = useState(0)
    const [campingPrice, setCampingPrice] = useState(0)
    const [animalPrice, setAnimalPrice] = useState(0)
    const [vehiculePrice, setVehiculePrice] = useState(0)

    console.log(leader)
    const validateMissingData = () => {
        let allMissingData = []
        if(leader.dniNumber === '') allMissingData.push('Número de documento del Responsable')
        if (leader.name === '' || leader.lastName === '') allMissingData.push('Nombre completo del Responsable')
        if (leader.phone === '') allMissingData.push('Telefono del responsable')
        if (leader.location === '') allMissingData.push('Ciudad del responsable')
        if (leader.bracelet === '') allMissingData.push('Número de pulsera del Responsable')
        if(animalAmount < 0 || animalAmount.toString() == '') allMissingData.push('Cantidad de caballos de ser un numero positivo')
        if(visitors.length != 0) {
            const missData = visitors.find((visitor) => visitor.dni === '' || visitor.braceletNumber === '')
            missData === undefined ? null : allMissingData.push('Número de documento o pulsera de un visitante')
        }
        if (hasVehicule === true && vehiculePlate === '') allMissingData.push('Número de patente')
        if (datosFechas.dateFromUnix === 0) allMissingData.push('Fecha desde')
        if (datosFechas.dateToUnix === 0) allMissingData.push('Fecha hasta')
        return allMissingData
    }

    const allPricesFromEndpoint = async () => {
        const allPrices = await priceServices.getPrices()
        setPrices(allPrices)

        for (var i = 0; i < allPrices.length; i++) {
            if (allPrices[i].name === 'Dia') setDayPrice(allPrices[i].amount)
            if (allPrices[i].name === 'Noche') setCampingPrice(allPrices[i].amount)
            if (allPrices[i].name === 'Caballo') setAnimalPrice(allPrices[i].amount)
            if (allPrices[i].name === 'Vehiculo') setVehiculePrice(allPrices[i].amount)
        }
    }

    const calculeTotalPrice = () => {
        let visitorPrice = 0
        const leaderPrice = leader.price
        const animalFinalPrice = animalAmount * animalPrice
        const vehiculeFinalPrice = hasVehicule ? vehiculePrice : 0

        visitors.map(visitor => visitorPrice += visitor.price)

        setAmountPrice(leaderPrice + visitorPrice + animalFinalPrice + vehiculeFinalPrice)
    }

    async function registerData() {
        const missingData = validateMissingData()
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)

        if (missingData.length === 0) {
            const newReserve = {
                initDate: (datosFechas.dateFromUnix * 1000).toString(),
                finishDate: (datosFechas.dateToUnix * 1000).toString(),
                amount: amountPrice,
                stayType: 'a5fa073e-8fb7-47ff-95b9-9a5de0590a6a',
                group: {
                    idCampsite: '86abe192-f273-45ea-b2ac-103312791439',
                    carPlate: vehiculePlate,
                    quantityAnimals: animalAmount
                },
                visitors: [
                    {
                        dni: leader.dniNumber.toString(),
                        firstName: leader.name.toString(),
                        lastName: leader.lastName.toString(),
                        phone: leader.phone.toString(),
                        location: leader.location.toString(),
                        memberNumber: leader.partnerNumber.toString(),
                        wristbandNumber: leader.bracelet.toString(),
                        idDiscount: Object.keys(leader.discount).length === 0 ? '' : leader.discount.id.toString(),
                        isManager: true
                    },

                    ...visitors.map((visitor) => ({
                        dni: visitor.dni.toString(),
                        firstName: '',
                        lastName: '',
                        phone: '',
                        location: '',
                        memberNumber: '',
                        wristbandNumber: visitor.braceletNumber.toString(),
                        idDiscount: Object.keys(visitor.discount).length === 0 ? '' : visitor.discount.id.toString(),
                        isManager: false
                    })),
                ]
            }

            const response = await reserveServices.postReserve(newReserve)
            if (response?.status == 201) {
                AlertServices.renderAlert(
                    'Completado',
                    'Se creo una reserva correctamente',
                    'success',
                )
                return
            }

            if (response?.status == 500) {
                AlertServices.renderAlert(
                    'Error',
                    'Algo salio mal, contactese con el administrador',
                    'error',
                )
                return
            }
            
        } else {
            Swal.fire({
                title: 'Faltan rellenar datos',
                html: "Faltan los siguientes datos: " + missingDataFormatedInHTML,
                icon: 'error',
                confirmButtonText: 'Entendido'
              });
        }

    }

    useEffect(() => {
        calculeTotalPrice()
    }, [leader.discount, visitors, hasVehicule, animalAmount, datosFechas, leader])

    useEffect(() => {
        allPricesFromEndpoint()
    }, [])

    return(
    <GuardLogin>
        <ABMTemplate title="Registrar Estadía" subTitle="Ingresa los datos para registrar la estadía.">
            <MultiStepOrder numberStep={step}/>

            <div style={{ display: step === 0 ? 'block' : 'none' }}>
                <div className={style.registrarEstadiaContainer}>
                    <AddLeaderGroup 
                        setLeaderGroup={setLeader}
                            checkOneDay={datosFechas.checkOneDay}
                            campingPrice={campingPrice}
                            dayPrice={dayPrice}
                            numberOfDays={datosFechas.numberOfDays}
                    />
                </div>
            </div>

            <div style={{ display: step === 1 ? 'block' : 'none' }}>
                <div className={style.registrarEstadiaContainer}>
                    <AddVisitors 
                        setAllVisitors={ setVisitors }
                            checkOneDay={datosFechas.checkOneDay}
                            campingPrice={campingPrice}
                            dayPrice={dayPrice}
                            numberOfDays={datosFechas.numberOfDays}

                    />
                </div>
            </div>

            <div style={{ display: step === 2 ? 'block' : 'none' }}>
                <div className={style.registrarEstadiaContainer}>
                        <AddDatosEstadia
                            setVehiculePlateFunction={setVehiculePlate}
                            setAnimalAmountFunction={setAnimalAmount}
                            setDatosFecha={setDatosFecha}
                            setHasVehiculeFinal={setHasVehicule}
                        />
                </div>
            </div>

            <div style={{ display: step === 3 ? 'block' : 'none' }}>
                <div className={style.registrarEstadiaContainer}>
                        <EstadiaSummary
                            animalAmount={animalAmount}
                            amountPrice={amountPrice}
                            leader={leader}
                            animalPrice={animalPrice}
                            vehiculePrice={vehiculePrice}
                            datosFechas={datosFechas}
                            vehiculePlate={vehiculePlate}
                            hasVehicule={hasVehicule}
                            visitors={visitors} />
                </div>
            </div>

            <div className={style.registrarEstadiaContainer__buttonContainer}>
                {step != 0 && <Button text='Atras' onClickFunction={() => setStep(step - 1)} type='primary'></Button >}
                {step < 3 && <div className={buttonContainerStyle}>
                    <Button text='Siguiente' onClickFunction={() => setStep(step + 1)} type='primary'></Button >
                </div>}
                {step === 3 && <div className={buttonContainerStyle}>
                        <Button text='Realizar Reserva' onClickFunction={() => registerData()} type='primary'></Button >
                </div>}
            </div>
            
        </ABMTemplate>
    </GuardLogin>
    )
}

export default RegistrarEstadia

