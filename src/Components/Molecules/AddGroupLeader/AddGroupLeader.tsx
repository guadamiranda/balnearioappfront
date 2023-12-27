'use client'

import ButtonAction from "@/Components/Atoms/ButtonAction/ButtonAction";
import { HiOutlineIdentification } from "react-icons/hi2";
import AddResident from "../AddResident/AddResident";
import Input from '@/Components/Atoms/Input/input';
import style from './addGroupLeader.module.scss';
import { AiOutlineUser } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";
import React, { useState, useEffect } from 'react'
import Dropdown from "@/Components/Atoms/DropDown/Dropdown";

interface IAddLeaderGroup {
    setLeaderGroup: any
}

const AddLeaderGroup : React.FC<IAddLeaderGroup> = ({setLeaderGroup}) => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dniNumber, setDniNumber] = useState('')
    const [phone, setPhone] = useState('')
    const [bracelet, setBracelet] = useState('')
    const [partnerNumber, setPartnerNumber] = useState('')
    const [discount, setDiscount] = useState('')

    const handleLeader = () => {
        const leader = {
            name: name,
            lastName: lastName,
            dniNumber: dniNumber,
            phone: phone,
            bracelet: bracelet,
            partnerNumber: partnerNumber,
            discount: discount
        }
        setLeaderGroup(leader)   
    }

    useEffect(() => {
        handleLeader()
    }, [name, lastName, dniNumber, phone, bracelet, partnerNumber, discount])

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
                options={[{name: 'Desc 1'}, {name: 'Desc 2'}]} 
                titleDropdown="Seleccione un Descuento" 
                selectedValueFunction={setDiscount}
            />        
        </div>
    )
}

export default AddLeaderGroup
