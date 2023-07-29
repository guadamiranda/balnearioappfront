'use client'

import reserveServices from '../../Services/reserveServices';
import ABMTemplate from "@/Components/templates/abmTemplate/ABMTemplate";
import Encabezado from "@/Components/Atoms/Encabezado/Encabezado";
import Separator from "@/Components/Atoms/Separator/separator";
import InfoReserve from "@/Components/Organism/infoReserve/infoReserve";
import { HiOutlineIdentification } from "react-icons/hi";
import Input from "@/Components/Atoms/Input/input";
import style from "./queryReserve.module.scss";
import Button from "@/Components/Atoms/button/button";
import { AiOutlineCar } from "react-icons/ai";
import { useState } from "react";
import GuardLogin from "@/utils/guardLogin";


const QueryReserve = () => {
    const [dni, setDni] = useState(0);
    const [cardPlate, setCardPlate] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [reserveData, setReserveData] = useState<ReserveDto | null>(null)

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

    const searchReserve = async () => {
        if(!dni && !cardPlate) {
            alert('Debe ingresar al menos un valor') 
            return
        }

        setIsLoading(true);
        const reserveQuery = await reserveServices.getSpecificReserve(dni.toString(), cardPlate)
        setIsLoading(false)

        if(reserveQuery.status == 404) {
            alert('No hay datos')
        }

        setReserveData(reserveQuery.data as ReserveDto)
        console.log(reserveQuery)
    }

    return (
    <GuardLogin>
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
            <Button text="Buscar" type="primary" isFullWidth={true} isLoading={isLoading} onClickFunction={()=>searchReserve()} />
            <Separator/>
            <div className={style.formContainer__reserveZone}>
                <Encabezado title='Datos de la estadia' alignment="center"/>
                {reserveData && <InfoReserve infoReserve={reserveData}/>}
            </div>
        </ABMTemplate>
    </GuardLogin>
    );
};

export default QueryReserve;
