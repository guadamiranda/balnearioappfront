'use client'
import React, {useEffect, useState} from 'react'
import style from './addResident.module.scss'
import ButtonAction from '@/Components/Atoms/ButtonAction/ButtonAction'
import Input from '@/Components/Atoms/Input/input'
import { AiOutlineUser } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import Dropdown from '@/Components/Atoms/DropDown/Dropdown'

type IAddResident = {
    visitorIndex: number,
    deleteVisitor: any,
    handleDNI: any
}

const AddResident: React.FC<IAddResident> = ({visitorIndex, deleteVisitor, handleDNI}) => {
    const [dni, setDni] = useState('')
    const [braceletNumber, setBraceletNumber] = useState('')
    const [discount, setDiscount] = useState('')

    useEffect(() => {
        handleDNI(visitorIndex, dni, braceletNumber, discount)
    }, [dni, braceletNumber, discount])
    
    return(
        <div className={style.addResidentContainer}>
            <div className={style.addResidentContainer__inputs}>
                <div className={style.addResidentContainer__inputConteiner}>
                    <Input  value={dni}
                            icon={<AiOutlineUser/>} 
                            placeholder='23008123' 
                            title='DNI' 
                            type='number'
                            useStateFunction={setDni}/> 
                    
                    <Input  value={braceletNumber}
                            icon={<AiOutlineUser/>} 
                            placeholder='23008123' 
                            title='Pulsera' 
                            type='number'
                            useStateFunction={setBraceletNumber}/> 
                </div>

                <Dropdown
                    title='Ninguno' 
                    options={[{name: 'Desc 1'}, {name: 'Desc 2'}]} 
                    titleDropdown="Seleccione un Descuento" 
                    selectedValueFunction={setDiscount}
                />  
            </div>
            

            <div className={style.addResidentContainer__eliminarContainer}>
                <div className={style.addResidentContainer__eliminarContainer}>
                    <ButtonAction onClickFunction={() => deleteVisitor(visitorIndex)}
                                  icon={<IoMdClose/>}/>
                </div>
            </div>
        </div>
    )
}

export default AddResident

