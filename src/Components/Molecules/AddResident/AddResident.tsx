'use client'
import React, {useEffect, useState} from 'react'
import style from './addResident.module.scss'
import ButtonAction from '@/Components/Atoms/ButtonAction/ButtonAction'
import Input from '@/Components/Atoms/Input/input'
import { AiOutlineUser } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import Dropdown from '@/Components/Atoms/DropDown/Dropdown'
import discountServices from '@/Services/discountServices'

type IAddResident = {
    visitorIndex: number,
    deleteVisitor: any,
    handleResidentData: any,
    amountNights: number
}

const AddResident: React.FC<IAddResident> = ({ visitorIndex, deleteVisitor, handleResidentData, amountNights }) => {
    const [dni, setDni] = useState('')
    const [braceletNumber, setBraceletNumber] = useState('')
    const [memberNumber, setMemberNumber] = useState(0)
    const [discount, setDiscount] = useState({})
    const [allDiscounts, setAllDiscounts] = useState<IDiscount[]>([])

    const getDiscountsFromEndPoint = async () => {
        const allDiscount = await discountServices.getDiscounts()
        setAllDiscounts(allDiscount.filter(discount => !discount.isDeleted))
    }

    useEffect(() => {
        handleResidentData(visitorIndex, dni, braceletNumber, discount, memberNumber)
    }, [dni, braceletNumber, discount, amountNights])

    useEffect(() => {
        getDiscountsFromEndPoint()
    }, [])

    return(
        <div className={style.addResidentContainer}>
            <div className={style.addResidentContainer__inputs}>
                <div className={style.addResidentContainer__inputConteiner}>
                    <Input  value={dni}
                            icon={<AiOutlineUser/>} 
                            placeholder='23008123' 
                            title='DNI (*)' 
                            type='number'
                            useStateFunction={setDni}
                    /> 
                    
                    <Input  value={braceletNumber}
                            icon={<AiOutlineUser/>} 
                            placeholder='23008123' 
                            title='Pulsera (*)'
                            useStateFunction={setBraceletNumber}
                    />

                    <Input  value={memberNumber}
                            icon={<AiOutlineUser/>} 
                            placeholder='48613589' 
                            title='Numero de socio'
                            useStateFunction={setMemberNumber}
                    /> 
                </div>

                <Dropdown
                    title='Ninguno' 
                    options={allDiscounts} 
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

