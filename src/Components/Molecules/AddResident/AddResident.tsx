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
    const [partnerOrDniNumber, setPartnerOrDniNumber] = useState()

    const deleteComponentAndComprobateChecked = () => {
        deleteComponent(index, isCheckedPartner)
    }


    const setPriceAndChecked = () => { 
        setIsCheckedPartner(!isCheckedPartner)
        setTotalPrice(isCheckedPartner? (totalPrice + pricePerPerson) : (totalPrice === 0 ? 0 : (totalPrice - pricePerPerson)))
    }

    useEffect(() => {
        handleDNIorPartnerNumber(index, partnerOrDniNumber, isCheckedPartner)
    }, [partnerOrDniNumber, isCheckedPartner])


    return(
        <div key={index} className={style.addResidentContainer}>
            <div className={style.addResidentContainer__inputConteiner}>
                {isCheckedPartner? <Input value={partnerOrDniNumber} 
                                          icon={<AiOutlineUser/>} 
                                          placeholder='99999999' 
                                          title='Número de Socio' 
                                          type= 'number'
                                          useStateFunction={setPartnerOrDniNumber}/> : 
                                   <Input value={partnerOrDniNumber} 
                                          icon={<HiOutlineIdentification/>} 
                                          placeholder='99999999' 
                                          title='Número de Documento' 
                                          type= 'number'
                                          useStateFunction={setPartnerOrDniNumber}/>}

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

