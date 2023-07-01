'use client'
import { useEffect, useState } from 'react'
import style from './registrarEstadia.module.scss'
import AddResident from '@/Components/Molecules/AddResident/AddResident'
import AddVehicule from '@/Components/Molecules/AddVehicule/AddVehicule'
import BotonAgregar from '@/Components/Atoms/ButtonAdd/BotonAgregar'
import Button from '@/Components/Atoms/button/button'
import Checkbox from '@/Components/Atoms/Checkbox/Checkbox'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado' 
import Input from '@/Components/Atoms/Input/input'
import ReservationDays from '@/Components/Molecules/ReservationDays/ReservationDays'
import { AiOutlineCar, AiOutlineUser } from 'react-icons/ai'
import { HiOutlineIdentification } from 'react-icons/hi'
import { VscAdd } from 'react-icons/vsc'

type IResidentIndex = {
    index: number,
    key: number
}

const RegistrarEstadia = () => {
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [isCheckedOneDay, setIsCheckedOneDay] = useState(false)
    const [isCheckedPerson, setIsCheckedPerson] = useState(false)
    const [lastName, setLastName] = useState('')
    const [numeroDocumento, setNumeroDocumento] = useState('')
    const [numeroPatente, setNumeroPatente] = useState('')
    const [numeroSocio, setNumeroSocio] = useState('')
    const [name, setName] = useState('')
    const [pricePerPerson, setPricePerPerson] = useState(1000)
    const [priceOneDay, setPriceOneDay] = useState(2000)
    const [residentsIndex, setResidentsIndex] = useState<IResidentIndex[]>([])
    const [residentIndex, setResidentIndex] = useState(0)
    const [vehiculesIndex, setVehiculesIndex] = useState<IResidentIndex[]>([])
    const [vehiculeIndex, setVehiculeIndex] = useState(0)
    console.log(isCheckedOneDay)

    const [totalPrice, setTotalPrice] = useState(pricePerPerson)
    
    const addResidentComponent = () => {
        const newResidentIndex = {key:residentIndex, 
                                  index:residentIndex, 
                                  dniOrPartnerNumber: '', 
                                  isPartner: false}
        setResidentsIndex([...residentsIndex, newResidentIndex])
        setResidentIndex(residentIndex + 1)
        setTotalPrice(totalPrice + pricePerPerson)
    }

    const deleteResidentComponent = (index:number) => {
        const residentIndexWithoutDeletedComponent = residentsIndex.filter((resident) => resident.index !== index);
        setResidentsIndex(residentIndexWithoutDeletedComponent)
    }

    const addVehiculeComponent = () => {
        const newVehiculeIndex = {key:vehiculeIndex, index:vehiculeIndex, carPlate: ''}
        setVehiculesIndex([...vehiculesIndex, newVehiculeIndex])
        setVehiculeIndex(vehiculeIndex + 1)
    }

    const deleteVehiculeComponent = (index:number) => {
        const vehiculeIndexWithoutDeletedComponent = vehiculesIndex.filter((vehicule) => vehicule.index !== index);
        setVehiculesIndex(vehiculeIndexWithoutDeletedComponent)
    }

    const handleDNIorPartnerNumber = (index: number, newDNIorPartnerNumber: number, isPartner: boolean) => {
        setResidentsIndex(
            residentsIndex.map((resident) => {
            if(resident.index === index){
                return { ...resident, dni: newDNIorPartnerNumber, isPartner }
            }
            return resident;
            })
        )
    }

    const handleCarPlateNumber = (index: number, carPlateNumber: number) => {
        setVehiculesIndex(
            vehiculesIndex.map((vehicule) => {
            if(vehicule.index === index){
                return { ...vehicule, carPlate: carPlateNumber }
            }
            return vehicule;
            })
        )
    }

    const cleanData = () => {
        setDateFrom('')
        setDateTo('')
        setNumeroDocumento('')
        setNumeroPatente('')
        setNumeroSocio('')
        setName('')
        setLastName('')
        setResidentsIndex([])
        setResidentIndex(0)
        setVehiculesIndex([])
        setVehiculeIndex(0)
        setTotalPrice(isChecked? 0 : pricePerPerson)
    }

    

    useEffect(() => {
        setTotalPrice(isCheckedPerson? (totalPrice - pricePerPerson) : totalPrice )
        setIsCheckedPerson(false)
    }, [isCheckedPerson])

    return(
        <div className={style.registrarEstadiaContainer}>
            <div className={style.registrarEstadiaContainer__headerSection}>
                <div className={style.registrarEstadiaContainer__section}>
                    <Encabezado title='Encargado del Grupo'/>
                    <Checkbox title='¿Es socio?' 
                              isChecked={isChecked} 
                              setIsChecked={setIsChecked} 
                              setPrice={setTotalPrice} 
                              price={pricePerPerson} 
                              totalPrice={totalPrice}/>
                                                 
                    <div className={style.registrarEstadiaContainer__section__inputs}>
                        <Input useStateFunction={setNumeroDocumento} type='number' icon={<HiOutlineIdentification/>} placeholder='99999999' title='Número de Documento' value={numeroDocumento}/>
                        {isChecked? <Input useStateFunction={setNumeroSocio} icon={<AiOutlineUser/>} placeholder='123456789' title='Número de Socio' value={numeroSocio}/> :
                                    <Input useStateFunction={setNumeroPatente} icon={<AiOutlineCar/>} placeholder='AB 123 CD' title='Patente del Vehiculo' value={numeroPatente}/>}
                    </div>
                    {isChecked? <></> : 
                                <div className={style.registrarEstadiaContainer__section__inputs}>
                                    <Input useStateFunction={setName} icon={<AiOutlineUser/>} placeholder='José' title='Nombre' value={name}/>
                                    <Input useStateFunction={setLastName} icon={<AiOutlineUser/>} placeholder='Gonzalez' title='Apellido' value={lastName}/>
                                </div>            
                    }
                </div>

                <br/>

                <div className={style.registrarEstadiaContainer__section}>
                    <Encabezado title='Datos del Grupo'/>
                    <BotonAgregar title='Residente' icon={<VscAdd/>} onClickFunction={() => addResidentComponent()}/>
                    <div className={style.registrarEstadiaContainer__residentContainer}>
                        {residentsIndex.map((resident) => <AddResident key={resident.key} 
                                                                       index={resident.index}
                                                                       deleteComponent={() => deleteResidentComponent(resident.index)}
                                                                       setPriceChecked={setTotalPrice} 
                                                                       price={pricePerPerson}
                                                                       totalPrice={totalPrice}
                                                                       setIsCheckedPerson={setIsCheckedPerson}
                                                                       handleDNIorPartnerNumber={handleDNIorPartnerNumber}/>)}
                    </div>
                </div>

                <br/>

                <div className={style.registrarEstadiaContainer__section}>
                    <Encabezado title='Datos de los Vehiculos'/>
                    <BotonAgregar title='Vehiculo' icon={<VscAdd/>} onClickFunction={() => addVehiculeComponent()}/>
                    <div className={style.registrarEstadiaContainer__residentContainer}>
                        {vehiculesIndex.map((vehicule) => <AddVehicule key={vehicule.key} 
                                                                       index={vehicule.index}
                                                                       deleteComponent={() => deleteVehiculeComponent(vehicule.index)}
                                                                       handleCarPlateNumber={handleCarPlateNumber}/>)}
                    </div>
                </div>

                <br/>

                <div className={style.registrarEstadiaContainer__section}>
                    <Encabezado title='Datos de la Estadía'/>
                    <Checkbox title='¿Se queda menos de un día?' 
                              isChecked={isCheckedOneDay} 
                              setIsChecked={setIsCheckedOneDay}
                              setPrice={setTotalPrice} 
                              price={priceOneDay}
                              totalPrice={totalPrice}/>
                              
                    <div className={style.registrarEstadiaContainer__section__estadia}>
                        <ReservationDays setFechaDesdeFunction={setDateFrom} 
                                         setFechaHastaFunction={setDateTo} 
                                         valueDateFrom={dateFrom}
                                         valueDateTo={dateTo}/>
                    </div>
                </div>

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
                    <Button text='Registrar Reserva' type='primary' onClickFunction={() => console.log('Hi')} isFullWidth={true}></Button>
                </div>
            </div>
            
        </div>
    )
}

export default RegistrarEstadia

