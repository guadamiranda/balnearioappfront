'use client'
import React, { useState, useEffect } from 'react'
import style from './addResident.module.scss'
import BotonAgregar from '@/Components/Atoms/ButtonAdd/BotonAgregar'
import Checkbox from '@/Components/Atoms/Checkbox/Checkbox'
import Input from '@/Components/Atoms/Input/input'
import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlineIdentification } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'

interface IAddResident{
    index: number,
    deleteComponent: () => void,
    setResidentsDni?: () => void,
    setPriceChecked: any,
    price: number,
    totalPrice: number,
    setIsCheckedPerson: any,
    handleDNIorPartnerNumber?: any 
}

const AddResident: React.FC<IAddResident> = ({index, deleteComponent, setPriceChecked, price, totalPrice, setIsCheckedPerson, handleDNIorPartnerNumber}) => {
    const [isCheckedPartner, setIsCheckedPartner] = useState(false)
    const [partnerOrDniNumber, setPartnerOrDniNumber] = useState()

    const deleteComponentAndComprobateChecked = () => {
        setIsCheckedPerson(isCheckedPartner? false : true)
        deleteComponent()
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
                                          useStateFunction={setPartnerOrDniNumber}/> : 
                                   <Input value={partnerOrDniNumber} 
                                          icon={<HiOutlineIdentification/>} 
                                          placeholder='99999999' 
                                          title='Número de Documento' 
                                          useStateFunction={setPartnerOrDniNumber}/>}

                <Checkbox title='¿Es socio?' 
                          isChecked={isCheckedPartner} 
                          setIsChecked={setIsCheckedPartner} 
                          setPrice={setPriceChecked} 
                          price={price} 
                          totalPrice={totalPrice}
                          setDNIorPartnerNumberDefault={setPartnerOrDniNumber}/>
            </div>

            <div className={style.addResidentContainer__eliminarContainer}>
                <div className={style.addResidentContainer__eliminarContainer}>
                    <BotonAgregar onClickFunction={() => deleteComponentAndComprobateChecked()}
                                  icon={<IoMdClose/>}/>
                </div>
            </div>
        </div>
    )
}

export default AddResident

