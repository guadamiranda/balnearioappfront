'use client'
import React, { useEffect, useState } from 'react'
import style from './addVehicule.module.scss'
import BotonAgregar from '@/Components/Atoms/ButtonAdd/BotonAgregar'
import Input from '@/Components/Atoms/Input/input'
import { AiOutlineCar, AiOutlineUser } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'

interface IAddVehicule{
    index: number,
    deleteComponent: () => void,
    handleCarPlateNumber: any
}

const AddVehicule: React.FC<IAddVehicule> = ({index, deleteComponent, handleCarPlateNumber}) => {
    const [ carPlate, setCarPlate ] = useState('')

    useEffect(() => {
        handleCarPlateNumber(index, carPlate)
    }, [carPlate])

    return(
        <div key={index} className={style.addVehiculeContainer}>
            <div className={style.addVehiculeContainer__inputConteiner}>
                <Input icon={<AiOutlineCar/>} placeholder='12ABC34' title='Número de Patente' useStateFunction={setCarPlate}/>
            </div>

            <div className={style.addVehiculeContainer__eliminarContainer}>
                    <BotonAgregar onClickFunction={() => deleteComponent()}icon={<IoMdClose/>}/>
            </div>
        </div>
    )
}

export default AddVehicule

