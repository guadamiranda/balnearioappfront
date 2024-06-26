'use client'

import { HiOutlineIdentification } from "react-icons/hi2";
import Input from '@/Components/Atoms/Input/input';
import style from './addGroupLeader.module.scss';
import { AiOutlineUser } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import React, { useState, useEffect } from 'react'
import Dropdown from "@/Components/Atoms/DropDown/Dropdown";
import discountServices from "@/Services/discountServices";
import { FaCity } from "react-icons/fa";
import { TbNumbers } from "react-icons/tb";


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
    const [city, setCity] = useState('')

    //TODO: MOVER A BASE DE DATOS
    const calculatePrice = (isMember: boolean) => {
        const oneDay = isMember? 0 : dayPrice
        const priceZeroToTree = isMember? 4000 : campingPrice
        const priceFourDaysToTen = isMember? 3500 : 7000
        const priceTenDaysOrMore = isMember? 3000 : 6000

        if(checkOneDay) return oneDay
        if(numberOfDays >= 1 && numberOfDays < 4) return priceZeroToTree
        if(numberOfDays >= 4 && numberOfDays < 10) return priceFourDaysToTen
        if(numberOfDays >= 10) return priceTenDaysOrMore
        return 0
    }

    const handleLeader = () => {
        //const dayPriceOrCampingPrice = checkOneDay === false ? campingPrice : dayPrice
        const isMember = partnerNumber? true : false
        const dayPriceOrCampingPrice = calculatePrice(isMember)
        const amountNights = numberOfDays <= 1 ? 1 : numberOfDays
        const priceWithDiscount = amountNights * (dayPriceOrCampingPrice - (dayPriceOrCampingPrice * (discount.percent / 100)))
        const priceWithoutDiscount = amountNights * dayPriceOrCampingPrice

        const leader = {
            name: name,
            lastName: lastName,
            dniNumber: dniNumber,
            phone: phone,
            bracelet: bracelet,
            partnerNumber: partnerNumber,
            discount: discount,
            location: city,
            price: Object.keys(discount).length === 0 ? priceWithoutDiscount : priceWithDiscount

        }

        setLeaderGroup(leader)   
    }

    const getDiscountsFromEndPoint = async () => {
        const allDiscounts = await discountServices.getDiscounts()
        setAllDiscounts(allDiscounts.filter(discount => !discount.isDeleted))
    }

    useEffect(() => {
        handleLeader()
    }, [name, lastName, dniNumber, phone, bracelet, partnerNumber, discount, numberOfDays, city])

    useEffect(() => {
        getDiscountsFromEndPoint()
    }, [])

    return(
        <div className={style.addGroupLeader}>
            <div className={style.addGroupLeader__title}>Datos del Responsable del Grupo (* Obligatorio)</div>

            <div className={style.addGroupLeader__firstGroupInput}> 
                <Input 
                   icon={<AiOutlineUser/>} 
                   placeholder='Juan' 
                   title='Nombre (*)' 
                   value={name}
                   useStateFunction={setName}/>
                
                <Input 
                   icon={<AiOutlineUser/>} 
                   placeholder='Caballo' 
                   title='Apellido (*)' 
                   value={lastName}
                   useStateFunction={setLastName}/>
            </div>

            <div className={style.addGroupLeader__firstGroupInput}> 
                <Input 
                   icon={<HiOutlineIdentification/>} 
                   placeholder='23567998' 
                   title='Número de DNI (*)' 
                   value={dniNumber}
                   useStateFunction={setDniNumber}/>
                
                <Input
                   icon={<FiPhone/>} 
                   placeholder='2975233478' 
                   title='Teléfono de Contacto (*)' 
                   value={phone}
                   useStateFunction={setPhone}/>
            </div>

            <div className={style.addGroupLeader__firstGroupInput}> 
                <Input 
                    icon={<TbNumbers />} 
                   placeholder='3456' 
                   title='Número de Pulsera (*)' 
                   value={bracelet}
                   useStateFunction={setBracelet}/>
                
                <Input
                    icon={<TbNumbers />} 
                   placeholder='2313' 
                   title='Número de Socio' 
                   value={partnerNumber}
                   useStateFunction={setPartnerNumber}/>
            </div>

            <div className={style.addGroupLeader__LocationGroupInput}>
                <Input
                    icon={<FaCity />}
                    placeholder='Córdoba Jesus Maria'
                    title='Localidad (*)'
                    value={city}
                    isFullWidth={true}
                    useStateFunction={setCity} />
            </div>

            <div className={style.addGroupLeader__LocationGroupInput}>
                <Dropdown 
                    title='Ninguno' 
                    options={allDiscounts}
                    titleDropdown="Seleccione un Descuento" 
                    selectedValueFunction={setDiscount}
                />
            </div>
        </div>
    )
}

export default AddLeaderGroup
