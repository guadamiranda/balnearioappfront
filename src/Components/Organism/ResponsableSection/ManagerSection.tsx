import style from './managerSection.module.scss'
import { useState } from 'react'
import Checkbox from '@/Components/Atoms/Checkbox/Checkbox'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado'
import Input from '@/Components/Atoms/Input/input'

import { AiOutlineCar, AiOutlineUser } from 'react-icons/ai'
import { HiOutlineIdentification } from 'react-icons/hi'

interface IManagerSection{
    carPlateNumber: string,
    dniNumber: number,
    partnerNumber: number,
    managerLastName: string,
    managerName: string,
    pricePerPerson: number
    totalPrice: number,
    setTotalPrice: (arg: number) => void,
    setCarPlateNumber: (value: string) => void,
    setDocumentNumber: (value: number) => void,
    setPartnerNumber: (value: number) => void,
    setManagerLastName: (value: string) => void,
    setManagerName: (value: string) => void,
}

const ManagerSection: React.FC<IManagerSection> = ({
    carPlateNumber,
    dniNumber, 
    partnerNumber,
    managerLastName,
    managerName,
    pricePerPerson,
    totalPrice,
    setCarPlateNumber, 
    setDocumentNumber,
    setManagerLastName,
    setManagerName, 
    setPartnerNumber,
    setTotalPrice,  
    }) => {
    
    const [isChecked, setIsChecked] = useState(false)

    const setPriceAndChecked = () => { 
        const isCheckedPartner = !isChecked
        setIsChecked(isCheckedPartner)
        isCheckedPartner === true ? setDocumentNumber(0) : setPartnerNumber(0)
        setTotalPrice(isCheckedPartner? (totalPrice + pricePerPerson) : totalPrice === 0 ? 0 : (totalPrice - pricePerPerson))
    }

    return(
        <div className={style.managerSection__section}>
            <Encabezado title='Encargado del Grupo'/>
            <Checkbox title='¿Es socio?' 
                      onClickFunction={setPriceAndChecked}/>
                                                 
            <div className={style.managerSection__inputs}>
            {isChecked? <Input useStateFunction={setPartnerNumber} icon={<AiOutlineUser/>} placeholder='123456789' title='Número de Socio' value={partnerNumber === 0 ? '' : partnerNumber}/> :
                        <Input useStateFunction={setDocumentNumber} type='number' icon={<HiOutlineIdentification/>} placeholder='99999999' title='Número de Documento' value={dniNumber === 0 ? '' : dniNumber}
                        />}
                <Input useStateFunction={setCarPlateNumber} icon={<AiOutlineCar/>} placeholder='AB 123 CD' title='Patente del Vehiculo' value={carPlateNumber}/>
                
            </div>
                    
            <div className={style.managerSection__inputs}>
                <Input useStateFunction={setManagerName} icon={<AiOutlineUser/>} placeholder='José' title='Nombre' value={managerName}/>
                <Input useStateFunction={setManagerLastName} icon={<AiOutlineUser/>} placeholder='Gonzalez' title='Apellido' value={managerLastName}/>
            </div>            
    
        </div>
    )
}

export default ManagerSection