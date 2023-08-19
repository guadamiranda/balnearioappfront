import { useEffect, useState } from 'react'
import style from './residentSection.module.scss'
import AddResident from '@/Components/Molecules/AddResident/AddResident'
import ButtonAction from '@/Components/Atoms/ButtonAction/ButtonAction'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado'

import { VscAdd } from 'react-icons/vsc'

interface IResidentSection {
    amountPeople: number,
    residents: Array<IResident>
    setResidents: (resident: any) => void,
    setAmountPeople: (price: number) => void
}

type IResident = {
    index: number,
    key: number,
    dniNumber: number,
    partnerNumber: number,
    isPartner: boolean
}

const ResidentSection: React.FC<IResidentSection> = ({
    amountPeople,
    residents,
    setResidents,
    setAmountPeople}) => {

    const [residentIndex, setResidentIndex] = useState(0)

    const addResidentComponent = () => {
        const newResident = {key: residentIndex, 
                            index: residentIndex, 
                            dniNumber: 0, 
                            partnerNumber: 0,
                            isPartner: false}
        setResidents([...residents, newResident])
        setResidentIndex(residentIndex + 1)
        setAmountPeople(amountPeople + 1)
    }

    const deleteResidentComponent = (index:number, isCheckedResident:boolean, isCheckedYounger:boolean) => {
        const residentIndexWithoutDeletedComponent = residents.filter((resident) => resident.index !== index);
        
        setResidents(residentIndexWithoutDeletedComponent)
        setAmountPeople(isCheckedResident || isCheckedYounger ? amountPeople : amountPeople - 1)
    }

    const handleDNIorPartnerNumber = (index: number, dniNumber: number, partnerNumber: number, isPartner: boolean) => {
        setResidents(
            residents.map((resident) => {
            if(resident.index === index){
                return { ...resident, 
                            dniNumber: dniNumber , 
                            partnerNumber: partnerNumber,
                            isPartner: isPartner}
            }
            return resident;
            })
        )
    }

    return(
        <div className={style.residentSection__section}>
            <Encabezado title='Datos del Grupo'/>
            <ButtonAction title='Residente' icon={<VscAdd/>} onClickFunction={() => addResidentComponent()}/>
            <div className={style.residentSection__residentContainer}>
                {residents.map((resident) => <AddResident index={resident.index}
                                                          handleDNIorPartnerNumber={handleDNIorPartnerNumber}
                                                          key={resident.key} 
                                                          amountPeople={amountPeople}
                                                          deleteComponent={deleteResidentComponent}
                                                          setAmountPeople={setAmountPeople}
                                                          />)}
            </div>
        </div>
    )
}

export default ResidentSection