'use client'

import { HiOutlineIdentification } from "react-icons/hi2";
import Input from '@/Components/Atoms/Input/input';
import style from './addGroupLeader.module.scss';
import { AiOutlineUser } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import React, { useState, useEffect } from 'react'
import Dropdown from "@/Components/Atoms/DropDown/Dropdown";
import discountServices from "@/Services/discountServices";

interface IAddLeaderGroup {
    setLeaderGroup: any,
    checkOneDay: boolean,
    campingPrice: number,
    dayPrice: number,
    numberOfDays: number

}

const AddLeaderGroup: React.FC<IAddLeaderGroup> = ({ setLeaderGroup, checkOneDay, campingPrice, dayPrice, numberOfDays }) => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dniNumber, setDniNumber] = useState('')
    const [phone, setPhone] = useState('')
    const [bracelet, setBracelet] = useState('')
    const [partnerNumber, setPartnerNumber] = useState('')
    const [discount, setDiscount] = useState<IDiscount>({} as IDiscount)
    const [allDiscounts, setAllDiscounts] = useState<IDiscount[]>([])

    const handleLeader = () => {
        const dayPriceOrCampingPrice = checkOneDay === false ? campingPrice : dayPrice
        const amountNights = numberOfDays <= 1 ? 1 : numberOfDays

        const leader = {
            name: name,
            lastName: lastName,
            dniNumber: dniNumber,
            phone: phone,
            bracelet: bracelet,
            partnerNumber: partnerNumber,
            discount: discount,
            price: amountNights * (dayPriceOrCampingPrice - (dayPriceOrCampingPrice * (Object.keys(discount).length === 0 ? 1 : (discount.percent / 100))))

        }
        setLeaderGroup(leader)   
    }

    const getDiscountsFromEndPoint = async () => {
        const allDiscounts = await discountServices.getDiscounts()
        setAllDiscounts(allDiscounts)
    }

    useEffect(() => {
        handleLeader()
    }, [name, lastName, dniNumber, phone, bracelet, partnerNumber, discount])

    useEffect(() => {
        getDiscountsFromEndPoint()
    }, [])

    return(
        <div className={style.addGroupLeader}>
            <div className={style.addGroupLeader__title}>Datos del Responsable del Grupo</div>

            <div className={style.addGroupLeader__firstGroupInput}> 
                <Input 
                   icon={<AiOutlineUser/>} 
                   placeholder='Juan' 
                   title='Nombre' 
                   value={name}
                   useStateFunction={setName}/>
                
                <Input 
                   icon={<AiOutlineUser/>} 
                   placeholder='Caballo' 
                   title='Apellido' 
                   value={lastName}
                   useStateFunction={setLastName}/>
            </div>

            <div className={style.addGroupLeader__firstGroupInput}> 
                <Input 
                   icon={<HiOutlineIdentification/>} 
                   placeholder='23567998' 
                   title='Número de DNI' 
                   value={dniNumber}
                   useStateFunction={setDniNumber}/>
                
                <Input
                   icon={<FiPhone/>} 
                   placeholder='2975233478' 
                   title='Teléfono de Contacto' 
                   value={phone}
                   useStateFunction={setPhone}/>
            </div>

            <div className={style.addGroupLeader__firstGroupInput}> 
                <Input 
                   icon={<HiOutlineIdentification/>} 
                   placeholder='3456' 
                   title='Número de Pulsera' 
                   value={bracelet}
                   useStateFunction={setBracelet}/>
                
                <Input
                   icon={<FiPhone/>} 
                   placeholder='2313' 
                   title='Número de Socio' 
                   value={partnerNumber}
                   useStateFunction={setPartnerNumber}/>
            </div>

            <Dropdown 
                title='Ninguno' 
                options={allDiscounts}
                titleDropdown="Seleccione un Descuento" 
                selectedValueFunction={setDiscount}
            />
        </div>
    )
}

export default AddLeaderGroup