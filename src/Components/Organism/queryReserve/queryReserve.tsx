'use client'


import ABMTemplate from "@/Components/templates/abmTemplate/ABMTemplate";
import Encabezado from "@/Components/Atoms/Encabezado/Encabezado";
import Separator from "@/Components/Atoms/Separator/separator";
import { HiOutlineIdentification } from "react-icons/hi";
import Input from "@/Components/Atoms/Input/input";
import style from "./queryReserve.module.scss";
import Button from '../../Atoms/button/button';
import { AiOutlineCar } from "react-icons/ai";
import { useState } from "react";

const QueryReserve = () => {
    const [dni, setDni] = useState(0);
    const [cardPlate, setCardPlate] = useState('')

    const saveDni = (valueInput: string) => {
       const value = parseInt(valueInput)
       if(value < 1 || !value) {
        setDni(0)
        alert('no se permiten valores menores a 0')
        return
       }
       if(value > 0){
        setDni(value)
       }
    }

    const searchReserve = () => {
        if(!dni && !cardPlate){
            alert('Debe ingresar al menos un valor')
        }

        console.log(dni)
        console.log(cardPlate)

    }

    return (
        <ABMTemplate title="Consultar Estadia" subTitle="Ingresa los datos para consultar la estadia">
            <div className={style.formContainer}>
                <Encabezado title='Encargado del Grupo'/>
                <div className={style.formContainer__searchZone}>
                    <div className={style.formContainer__input}>
                        <Input type="number" useStateFunction={saveDni} icon={<HiOutlineIdentification/>} isFullWidth={true} placeholder='23555698' title='Numero de documento'/>
                    </div>
                    <div className={style.formContainer__input}>
                        <Input useStateFunction={setCardPlate} icon={<AiOutlineCar/>} isFullWidth={true} placeholder='AB 123 CD' title='Patente del Vehiculo'/>
                    </div>
                </div>
            </div>
            <Button text="Buscar" type="primary" isFullWidth={true} onClickFunction={searchReserve} />
            <Separator/>
            <div className={style.formContainer__reserveZone}>
                <Encabezado title='Datos de la estadia' alignment="center"/>
            </div>
        </ABMTemplate>
    );
};

export default QueryReserve;
