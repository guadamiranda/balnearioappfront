import { useEffect, useState } from 'react'
import style from './residentSection.module.scss'
import AddResident from '@/Components/Molecules/AddResident/AddResident'
import ButtonAction from '@/Components/Atoms/ButtonAction/ButtonAction'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado'

import { VscAdd } from 'react-icons/vsc'

interface IResidentSection {
    pricePerPerson: number,
    totalPrice: number,
    residents: Array<IResident>
    setResidents: (resident: any) => void,
    setTotalPrice: (price: number) => void
}

type IResident = {
    index: number,
    key: number,
    dniNumber: number,
    partnerNumber: number,
    isPartner: boolean
}

const ResidentSection: React.FC<IResidentSection> = ({
    pricePerPerson, 
    totalPrice,
    residents,
    setResidents,
    setTotalPrice}) => {

    const [residentIndex, setResidentIndex] = useState(0)
    console.log(residents)

    const addResidentComponent = () => {
        const newResident = {key: residentIndex, 
                            index: residentIndex, 
                            dniNumber: 0, 
                            partnerNumber: 0,
                            isPartner: false}
        setResidents([...residents, newResident])
        setResidentIndex(residentIndex + 1)
        setTotalPrice(totalPrice + pricePerPerson)
    }

    const deleteResidentComponent = (index:number, isCheckedResident:boolean) => {
        const residentIndexWithoutDeletedComponent = residents.filter((resident) => resident.index !== index);
        
        setResidents(residentIndexWithoutDeletedComponent)
        setTotalPrice(isCheckedResident? totalPrice : (totalPrice === 0 ? 0 : (totalPrice - pricePerPerson)))
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