'use client'
import React, { useState, useEffect } from 'react'
import style from './addResident.module.scss'
import ButtonAction from '@/Components/Atoms/ButtonAction/ButtonAction'
import Checkbox from '@/Components/Atoms/Checkbox/Checkbox'
import Input from '@/Components/Atoms/Input/input'
import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlineIdentification } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'

interface IAddResident{
    index: number,
    handleDNIorPartnerNumber?: any ,
    amountPeople: number,
    deleteComponent: (index: number, isCheckedResident:boolean, isCheckedYounger:boolean) => void,
    setResidentsDni?: () => void,
    setAmountPeople: (price: number) => void
}

const AddResident: React.FC<IAddResident> = ({
    index, 
    handleDNIorPartnerNumber, 
    amountPeople,
    deleteComponent,
    setAmountPeople}) => {

    const [isCheckedPartner, setIsCheckedPartner] = useState(false)
    const [isCheckedYounger, setIsCheckedYounger] = useState(false)
    const [dniNumber, setDniNumber] = useState<number>(0)
    const [partnerNumber, setPartnerNumber] = useState<number>(0)

    const deleteComponentAndComprobateChecked = () => {
        deleteComponent(index, isCheckedPartner, isCheckedYounger)
    }

    const setPriceAndChecked = () => { 
        setIsCheckedPartner(!isCheckedPartner)
        isCheckedYounger? null : setAmountPeople(isCheckedPartner? amountPeople + 1 : amountPeople - 1)  
    }

    const setYoungerAndCheck = () => {
        setIsCheckedYounger(!isCheckedYounger)
        isCheckedPartner? null : setAmountPeople(isCheckedYounger? amountPeople + 1 : amountPeople - 1)
    }

    useEffect(() => {
        handleDNIorPartnerNumber(index, dniNumber, partnerNumber, isCheckedPartner)
    }, [partnerNumber, dniNumber, isCheckedPartner])

    useEffect(() => {
        isCheckedPartner? setDniNumber(0) : setPartnerNumber(0)
    }, [isCheckedPartner])


    return(
        <div key={index} className={style.addResidentContainer}>
            <div className={style.addResidentContainer__inputConteiner}>
                {isCheckedPartner? <Input value={partnerNumber === 0 ? '' : partnerNumber} 
                                          icon={<AiOutlineUser/>} 
                                          placeholder='99999999' 
                                          title='Número de Socio' 
                                          type= 'number'
                                          useStateFunction={setPartnerNumber}/> : 

                                   <Input value={dniNumber === 0 ? '' : dniNumber} 
                                          icon={<HiOutlineIdentification/>} 
                                          placeholder='99999999' 
                                          title='Número de Documento' 
                                          type= 'number'
                                          useStateFunction={setDniNumber}/>}

                <Checkbox title='¿Es socio?' 
                          onClickFunction={setPriceAndChecked}/>

                <div className={style.addResidentContainer__space} />

                <Checkbox title='¿Es menor de 6 años?' 
                          onClickFunction={setYoungerAndCheck}/>
            </div>

            <div className={style.addResidentContainer__eliminarContainer}>
                <div className={style.addResidentContainer__eliminarContainer}>
                    <ButtonAction onClickFunction={() => deleteComponentAndComprobateChecked()}
                                  icon={<IoMdClose/>}/>
                </div>
            </div>
        </div>
    )
}

export default AddResident

