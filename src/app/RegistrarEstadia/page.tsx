'use client'

import AddDatosEstadia from '@/Components/Molecules/AddDatosEstadia/AddDatosEstadia';
import MultiStepOrder from '@/Components/Molecules/MultiStepOrder/MultiStepOrder';
import AddLeaderGroup from '@/Components/Molecules/AddGroupLeader/AddGroupLeader';
import EstadiaSummary from '@/Components/Molecules/EstadiaSummary/EstadiaSummary';
import ABMTemplate from '@/Components/templates/abmTemplate/ABMTemplate';
import AddVisitors from '@/Components/Molecules/AddVisitors/AddVisitors';
import Button from '@/Components/Atoms/button/button';
import style from './registrarEstadia.module.scss';
import GuardLogin from '@/utils/guardLogin';
import { useState } from 'react';


const RegistrarEstadia = () => {
    const [step, setStep] = useState(0)
    const [visitors, setVisitors] = useState([])
    const [leader, setLeader] = useState({})
    const [vehiculePlate, setVehiculePlate] = useState(0)
    const [animalAmount, setAnimalAmount] = useState(0)
    const buttonContainerStyle = step === 0 ? style.registrarEstadiaContainer__buttonNext : ''

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
                    <Button text='Realizar Reserva' onClickFunction={() => console.log('hi')} type='primary'></Button >
                </div>}
            </div>
            
        </ABMTemplate>
    </GuardLogin>
    )
}

export default RegistrarEstadia

