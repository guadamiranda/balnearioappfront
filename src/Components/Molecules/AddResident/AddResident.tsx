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
    pricePerPerson: number,
    totalPrice: number,
    deleteComponent: (index: number, isCheckedResident:boolean) => void,
    setResidentsDni?: () => void,
    setTotalPrice: (price: number) => void
}

const AddResident: React.FC<IAddResident> = ({
    index, 
    handleDNIorPartnerNumber, 
    pricePerPerson,
    totalPrice,
    deleteComponent,
    setTotalPrice}) => {

    const [isCheckedPartner, setIsCheckedPartner] = useState(false)
    const [dniNumber, setDniNumber] = useState<number>(0)
    const [partnerNumber, setPartnerNumber] = useState<number>(0)

    const deleteComponentAndComprobateChecked = () => {
        deleteComponent(index, isCheckedPartner)
    }

    const setPriceAndChecked = () => { 
        setIsCheckedPartner(!isCheckedPartner)
        setTotalPrice(isCheckedPartner? (totalPrice + pricePerPerson) : (totalPrice === 0 ? 0 : (totalPrice - pricePerPerson)))
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

