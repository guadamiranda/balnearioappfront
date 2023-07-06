import { useEffect, useState } from 'react'
import style from './residentSection.module.scss'
import AddResident from '@/Components/Molecules/AddResident/AddResident'
import ButtonAction from '@/Components/Atoms/ButtonAction/ButtonAction'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado'

import { VscAdd } from 'react-icons/vsc'

interface IResidentSection {
    cleanDataFlag: boolean,
    pricePerPerson: number,
    totalPrice: number,
    setResidentsInRegister: (resident: any) => void,
    setTotalPrice: (price: number) => void
}

type IResident = {
    index: number,
    key: number,
    dniOrPartnerNumber: number,
    isPartner: boolean
}

const ResidentSection: React.FC<IResidentSection> = ({
    cleanDataFlag,
    pricePerPerson, 
    totalPrice,
    setResidentsInRegister,
    setTotalPrice}) => {

    const [residents, setResidents] = useState<IResident[]>([])
    const [residentIndex, setResidentIndex] = useState(0)

    const addResidentComponent = () => {
        const newResident = {key: residentIndex, 
                            index: residentIndex, 
                            dniOrPartnerNumber: 0, 
                            isPartner: false}
        setResidents([...residents, newResident])
        setResidentsInRegister([...residents, newResident])
        setResidentIndex(residentIndex + 1)
        setTotalPrice(totalPrice + pricePerPerson)
    }

    const deleteResidentComponent = (index:number, isCheckedResident:boolean) => {
        const residentIndexWithoutDeletedComponent = residents.filter((resident) => resident.index !== index);
        
        setResidents(residentIndexWithoutDeletedComponent)
        setTotalPrice(isCheckedResident? totalPrice : (totalPrice === 0 ? 0 : (totalPrice - pricePerPerson)))
    }

    const handleDNIorPartnerNumber = (index: number, newDNIorPartnerNumber: number, isPartner: boolean) => {
        setResidents(
            residents.map((resident) => {
            if(resident.index === index){
                return { ...resident, dniOrPartnerNumber: newDNIorPartnerNumber, isPartner }
            }
            return resident;
            })
        )
        setResidentsInRegister({...residents})
    }

    const cleanDataResidentSection = () => {
        setResidents([])
        setResidentIndex(0)
        setResidentsInRegister([])
    } 

    useEffect(() => {
        cleanDataResidentSection()
    }, [cleanDataFlag])

    return(
        <div className={style.residentSection__section}>
            <Encabezado title='Datos del Grupo'/>
            <ButtonAction title='Residente' icon={<VscAdd/>} onClickFunction={() => addResidentComponent()}/>
            <div className={style.residentSection__residentContainer}>
                {residents.map((resident) => <AddResident index={resident.index}
                                                          handleDNIorPartnerNumber={handleDNIorPartnerNumber}
                                                          key={resident.key} 
                                                          pricePerPerson={pricePerPerson}
                                                          totalPrice={totalPrice}
                                                          deleteComponent={deleteResidentComponent}
                                                          setTotalPrice={setTotalPrice}
                                                          />)}
            </div>
        </div>
    )
}

export default ResidentSection