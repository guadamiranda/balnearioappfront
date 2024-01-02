'use client'

import AddDatosEstadia from '@/Components/Molecules/AddDatosEstadia/AddDatosEstadia';
import MultiStepOrder from '@/Components/Molecules/MultiStepOrder/MultiStepOrder';
import AddLeaderGroup from '@/Components/Molecules/AddGroupLeader/AddGroupLeader';
import EstadiaSummary from '@/Components/Molecules/EstadiaSummary/EstadiaSummary';
import ABMTemplate from '@/Components/templates/abmTemplate/ABMTemplate';
import AddVisitors from '@/Components/Molecules/AddVisitors/AddVisitors';
import Button from '@/Components/Atoms/button/button';
import style from './registrarEstadia.module.scss';
import ReactDOMServer from 'react-dom/server';
import GuardLogin from '@/utils/guardLogin';
import { useState } from 'react';


const RegistrarEstadia = () => {
    const [step, setStep] = useState(0)
    const [visitors, setVisitors] = useState([])
    const [leader, setLeader] = useState({})
    const [vehiculePlate, setVehiculePlate] = useState(0)
    const [animalAmount, setAnimalAmount] = useState(0)
    const [datosFechas, setDatosFecha] = useState()
    const buttonContainerStyle = step === 0 ? style.registrarEstadiaContainer__buttonNext : ''

    console.log(leader)
    console.log(visitors)
    console.log(vehiculePlate)
    console.log(animalAmount)
    console.log(datosFechas)

    const validateMissingData = () => {
        let allMissingData = []
        if(leader.dniNumber === '') allMissingData.push('Número de documento del Responsable')
        if(leader.bracelet === '') allMissingData.push('Número de documento del Responsable')
        if(animalAmount < 0 || animalAmount.toString() == '') allMissingData.push('Cantidad de caballos de ser un numero positivo')
        if(visitors.length != 0) {
            const missData = visitors.find((visitor) => visitor.dniNumber === '' && visitor.braceletNumber === '')
            missData === undefined ? null : allMissingData.push('Número de documento o pulsera de un visitante')
        }
        if (datosFechas.dateFromUnix === 0) allMissingData.push('Fecha desde')
        if (datosFechas.dateToUnix === 0) allMissingData.push('Fecha hasta')
        return allMissingData
    }

    const calculeTotalPrice = () => {

    }


    async function registerData() {
        const missingData = validateMissingData()
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)
        /*
        if (missingData.length === 0) {
            const newReserve = {
                initDate: (dateFrom * 1000).toString(), 
                finishDate: (dateTo * 1000).toString(), 
                amount: //COMPLETAR,
                    stayType: "a5fa073e-8fb7-47ff-95b9-9a5de0590a6a" //PREGUNTAR,
                workshiftId: userData.workshiftId, 

                managerCarPlate: carPlatesNumber.toString(),
                managerDni: dniNumber.toString(),
                managerFirstName: managerName,
                managerLastName: managerLastName, 
                managerMemberNumber: partnerNumber.toString(),
                residents: residents.map((resident) => ({dni: resident.dniNumber.toString(), memberNumber: resident.partnerNumber.toString()})),
                vehicles: vehicules.map((vehicule) => ({carPlate: vehicule.carPlate.toString(), vehicleType: '0b05ba6a-b817-4f88-825d-4e787ef82e5a'})),
                animalAmount: animalAmount
            }
        /*
        
        const response = await reserveServices.postReserve(newReserve)
        setOpenModalDiscount(false)
        setIsLoadingButton(false)
        if(response?.status == 201) {
            AlertServices.renderAlert(
                'Completado',
                'Se creo una reserva correctamente',
                'success',
            )
            return
        }

        if(response?.status == 500) {
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

        */
    }

    return(
    <GuardLogin>
        <ABMTemplate title="Registrar Estadía" subTitle="Ingresa los datos para registrar la estadía.">
            <MultiStepOrder numberStep={step}/>

            <div style={{ display: step === 0 ? 'block' : 'none' }}>
                <div className={style.registrarEstadiaContainer}>
                    <AddLeaderGroup 
                        setLeaderGroup={setLeader}
                    />
                </div>
            </div>

            <div style={{ display: step === 1 ? 'block' : 'none' }}>
                <div className={style.registrarEstadiaContainer}>
                    <AddVisitors 
                        setAllVisitors={ setVisitors }
                    />
                </div>
            </div>

            <div style={{ display: step === 2 ? 'block' : 'none' }}>
                <div className={style.registrarEstadiaContainer}>
                        <AddDatosEstadia
                            setVehiculePlateFunction={setVehiculePlate}
                            setAnimalAmountFunction={setAnimalAmount}
                            setDatosFecha={setDatosFecha}
                        />
                </div>
            </div>

            <div style={{ display: step === 3 ? 'block' : 'none' }}>
                <div className={style.registrarEstadiaContainer}>
                        <EstadiaSummary
                            animalAmount={animalAmount}
                            leader={leader}
                            vehiculePlate={vehiculePlate}
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

