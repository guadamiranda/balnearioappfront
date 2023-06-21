'use client'
import { useState } from 'react'
import style from './registrarEstadia.module.scss'
import AgregarVehiculo from '@/Components/Molecules/AgregarVehiculo/AgregarVehiculo'
import BotonAgregar from '@/Components/Atoms/BotonAgregar/BotonAgregar'
import CantidadPersonas from '@/Components/Molecules/CantidadPersonas/CantidadPersonas'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado' 
import Input from '@/Components/Atoms/Input/input'
import ReservationDays from '@/Components/Molecules/ReservationDays/ReservationDays'
import Title from '@/Components/Atoms/Titulo/Titulo'
import { BiLeaf } from 'react-icons/bi'
import { AiOutlineCar } from 'react-icons/ai'
import { HiOutlineIdentification } from 'react-icons/hi'
import { VscAdd } from 'react-icons/vsc'

const RegistrarEstadia = () => {
    const [fechaDesde, setFechaDesde] = useState()
    const [fechaHasta, setFechaHasta] = useState()
    const [finalPriceAllPeople, setFinalPriceAllPeople] = useState(0)
    const [numeroDocumento, setNumeroDocumento] = useState()
    const [numeroPatente, setNumeroPatente] = useState()
    const [vehiculeComponentIndex, setVehiculeComponentIndex] = useState(0)
    const [vehiculesComponent, setVehiculesComponent] = useState<React.ReactNode[]>([])
    console.log(vehiculesComponent)

    const deleteVehiculeComponent = (index:number) => {
        console.log(index)
        console.log(vehiculesComponent)
        //const newAddVehiculeComponent = [...vehiculesComponent]
        //newAddVehiculeComponent.splice(index, 1)
        //setVehiculesComponent(newAddVehiculeComponent)
    }
    
    const addVehiculeComponent = () => {
        const newAddVehiculeComponent = [...vehiculesComponent]
        newAddVehiculeComponent.push(<AgregarVehiculo index={vehiculeComponentIndex} onClickDelete={() => deleteVehiculeComponent(vehiculeComponentIndex)}/>)       
        setVehiculesComponent(newAddVehiculeComponent)
        setVehiculeComponentIndex(vehiculeComponentIndex + 1)
    }

    return(
        <div className={style.registrarEstadiaContainer}>
            <Title icon={<BiLeaf/>} subTitle='Ingresa los datos para registrar la estadía.' title='Registrar Estadía'/>
            <div className={style.registrarEstadiaContainer__formContainer}>
                <div className={style.registrarEstadiaContainer__formContainer__section}>
                    <Encabezado title='Encargado del Grupo'/>
                    <div className={style.registrarEstadiaContainer__formContainer__section__inputs}>
                        <Input useStateFunction={setNumeroDocumento} type='number' icon={<HiOutlineIdentification/>} placeholder='99999999' title='Número de Documento'/>
                        <Input useStateFunction={setNumeroPatente} type='text' icon={<AiOutlineCar/>} placeholder='AB 123 CD' title='Patente del Vehiculo'/>
                    </div>
                </div>
                <div className={style.registrarEstadiaContainer__formContainer__section}>
                    <Encabezado title='Datos del Vehiculo'/>
                    <BotonAgregar title='Vehiculo' icon={<VscAdd/>} onClickFunction={() => addVehiculeComponent()}/>
                    <div className={style.registrarEstadiaContainer__formContainer__section__vehiculos}>
                        {vehiculesComponent.map((vehiculeComponent, index) => <div key={index} >{vehiculeComponent}</div>)}
                    </div>
                </div>
                <div className={style.registrarEstadiaContainer__formContainer__section}>
                    <Encabezado title='Datos de la Estadía'/>
                    <div className={style.registrarEstadiaContainer__formContainer__section__estadia}>
                        <CantidadPersonas useStateFunction={setFinalPriceAllPeople} finalPriceAllPeople={finalPriceAllPeople}/>
                        <ReservationDays setFechaDesdeFunction={setFechaDesde} setFechaHastaFunction={setFechaHasta}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrarEstadia