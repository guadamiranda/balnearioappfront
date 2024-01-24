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
import { GiCampingTent } from 'react-icons/gi';
import ReactDOMServer from 'react-dom/server';
import GuardLogin from '@/utils/guardLogin';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


interface IDiscount {
    id: any,
}

interface IVisitors {
    dni: any,
    braceletNumber: any,
    price: any,
    discount: IDiscount,
    memberNumber: any
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

interface IRegistrarEstadia {
    changeComponent: any
}

const RegistrarEstadia: React.FC<IRegistrarEstadia> = ({ changeComponent }) => {
    const router = useRouter();
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
    const [isLoadingButtons, setIsLoadingButton] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    const [dayPrice, setDayPrice] = useState(0)
    const [campingPrice, setCampingPrice] = useState(0)
    const [animalPrice, setAnimalPrice] = useState(0)
    const [vehiculePrice, setVehiculePrice] = useState(0)
    const [vehicleTotalPrice, setVehicleTotalPrice] = useState(0)

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

    const calculateVehiclePrice = (isMember: boolean) => {
        const numberOfDays = datosFechas.numberOfDays
        const dateFrom = new Date(datosFechas.dateFromUnix)
        const dateTo = new Date(datosFechas.dateToUnix)
        const oneDay = isMember? 0 : dayPrice
        const priceZeroToTree = isMember? 4000 : campingPrice
        const priceFourDaysToTen = isMember? 3500 : 7000
        const priceTenDaysOrMore = isMember? 3000 : 6000
        
        if(numberOfDays === 1 && isCamping(dateTo,dateFrom)) return oneDay
        if(numberOfDays >= 1 && numberOfDays < 4) return priceZeroToTree
        if(numberOfDays >= 4 && numberOfDays < 10) return priceFourDaysToTen
        if(numberOfDays >= 10) return priceTenDaysOrMore
        return 0
    }

    const isCamping = (dateFrom: Date, dateTo: Date): boolean => {
        if(dateFrom.getMonth() != dateTo.getMonth()) return true
        if(dateFrom.getDate() != dateTo.getDate()) return true
        return false
    }

    const calculeTotalPrice = () => {
        const isMember = leader.partnerNumber ? true : false
        let visitorPrice = 0
        const leaderPrice = leader.price
        const animalFinalPrice = animalAmount * animalPrice
        const vehiculeFinalPrice = hasVehicule ? calculateVehiclePrice(isMember) : 0
        setVehicleTotalPrice(vehiculeFinalPrice)

        visitors.map(visitor => visitorPrice += visitor.price)

        setAmountPrice(leaderPrice + visitorPrice + animalFinalPrice + vehiculeFinalPrice)
    }

    async function registerData() {
        const missingData = validateMissingData()
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)

        if (missingData.length === 0) {
            setDisableButton(true)
            setIsLoadingButton(true)
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
                        memberNumber: visitor.memberNumber,
                        wristbandNumber: visitor.braceletNumber.toString(),
                        idDiscount: Object.keys(visitor.discount).length === 0 ? '' : visitor.discount.id.toString(),
                        isManager: false
                    })),
                ]
            }
            
            const response = await reserveServices.postReserve(newReserve)
            setIsLoadingButton(false)
            if (response?.status == 201) {
                AlertServices.renderAlertWithOnlyButtonConfirmAndFunction(
                    'Completado',
                    'Se creo una reserva correctamente',
                    'success',
                    () => changeComponent('verReservas')
                )
                return
            }

            if (response?.status == 500) {
                setDisableButton(false)
                AlertServices.renderAlert(
                    'Error',
                    'Algo salio mal, contactese con el administrador',
                    'error',
                )
                return
            }
            
        } else {
            setDisableButton(false)
            Swal.fire({
                title: 'Faltan rellenar datos',
                html: "Faltan los siguientes datos: " + missingDataFormatedInHTML,
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#568871'
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
        <ABMTemplate title="Registrar Camping" subTitle="Ingresa los datos para registrar la estadía." icon={<GiCampingTent />}>
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
                            setAmountStayState={(value) =>setAmountPrice(value)}
                            leader={leader}
                            animalPrice={animalPrice}
                            vehiculePrice={vehicleTotalPrice}
                            datosFechas={datosFechas}
                            vehiculePlate={vehiculePlate}
                            hasVehicule={hasVehicule}
                            visitors={visitors as IVisitors[]} />
                </div>
            </div>

            <div className={style.registrarEstadiaContainer__buttonContainer}>
                {step != 0 && <Button text='Atras' onClickFunction={() => setStep(step - 1)} type='primary'></Button >}
                {step < 3 && <Button text='Siguiente' onClickFunction={() => setStep(step + 1)} type='primary'></Button >}
                {step === 3 && <Button isLoading={isLoadingButtons} text='Realizar Reserva' onClickFunction={() => disableButton === false ? registerData() : console.log('hi')} type='primary'></Button >}
            </div>
            
        </ABMTemplate>
    </GuardLogin>
    )
}

export default RegistrarEstadia

