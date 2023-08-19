import style from './managerSection.module.scss'
import { useState, useEffect } from 'react'
import Checkbox from '@/Components/Atoms/Checkbox/Checkbox'
import Encabezado from '@/Components/Atoms/Encabezado/Encabezado'
import Input from '@/Components/Atoms/Input/input'

import { AiOutlineCar, AiOutlineUser } from 'react-icons/ai'
import { HiOutlineIdentification } from 'react-icons/hi'
import { FaHorse } from 'react-icons/fa'

interface IManagerSection{
    cleanDataFlag: boolean,
    carPlateNumber: string,
    dniNumber: number,
    partnerNumber: string,
    managerLastName: string,
    managerName: string,
    amountPeople: number,
    amountHorses: number,
    setAmountPeople: (arg: number) => void,
    setCarPlateNumber: (value: string) => void,
    setDocumentNumber: (value: number) => void,
    setPartnerNumber: (value: string) => void,
    setManagerLastName: (value: string) => void,
    setManagerName: (value: string) => void,
    setAmountOfHorses: (value: number) => void
}

const ManagerSection: React.FC<IManagerSection> = ({
    cleanDataFlag,
    carPlateNumber,
    dniNumber, 
    partnerNumber,
    managerLastName,
    managerName,
    amountPeople,
    amountHorses,
    setCarPlateNumber, 
    setDocumentNumber,
    setManagerLastName,
    setManagerName, 
    setPartnerNumber,
    setAmountPeople,
    setAmountOfHorses  
    }) => {
    
    const [isChecked, setIsChecked] = useState(false)

    const setPriceAndChecked = () => { 
        const isCheckedPartner = isChecked
        setIsChecked(!isCheckedPartner)
        isCheckedPartner === false ? setDocumentNumber(0) : setPartnerNumber('')
        setAmountPeople(isCheckedPartner === false ? amountPeople - 1 : amountPeople + 1)
    }

    useEffect(() => {
        setIsChecked(false)
    }, [cleanDataFlag])

    return(
        <div className={style.managerSection__section}>
            <Encabezado title='Encargado del Grupo'/>
            <Checkbox cleanDataFlag={cleanDataFlag}
                      title='¿Es socio?' 
                      onClickFunction={setPriceAndChecked}/>
                                                 
            <div className={style.managerSection__inputs}>
            {isChecked? <Input useStateFunction={setPartnerNumber} icon={<AiOutlineUser/>} placeholder='123456789' title='Número de Socio' value={partnerNumber === '' ? '' : partnerNumber}/> :
                        <Input useStateFunction={setDocumentNumber} type='number' icon={<HiOutlineIdentification/>} placeholder='99999999' title='Número de Documento' value={dniNumber === 0 ? '' : dniNumber}
                        />}
                        <Input useStateFunction={setCarPlateNumber} icon={<AiOutlineCar/>} placeholder='AB 123 CD' title='Patente del Vehiculo' value={carPlateNumber}/>
                
            </div>
                    
            <div className={style.managerSection__inputs}>
                <Input useStateFunction={setManagerName} icon={<AiOutlineUser/>} placeholder='José' title='Nombre' value={managerName}/>
                <Input useStateFunction={setManagerLastName} icon={<AiOutlineUser/>} placeholder='Gonzalez' title='Apellido' value={managerLastName}/>   
            </div>   

            <Input useStateFunction={setAmountOfHorses} type='number' icon={<FaHorse/>} placeholder='5' title='Cantidad de Caballos'/>         
    
        </div>
    )
}

export default ManagerSection