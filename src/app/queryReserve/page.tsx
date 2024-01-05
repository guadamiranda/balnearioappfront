'use client'

import stayServices from '../../Services/stayServices';
import ABMTemplate from "@/Components/templates/abmTemplate/ABMTemplate";
import Encabezado from "@/Components/Atoms/Encabezado/Encabezado";
import Separator from "@/Components/Atoms/Separator/separator";
import InfoReserve from "@/Components/Organism/infoReserve/infoReserve";
import { HiOutlineIdentification } from "react-icons/hi";
import Input from "@/Components/Atoms/Input/input";
import style from "./queryReserve.module.scss";
import Button from "@/Components/Atoms/button/button";
import { useState } from "react";
import GuardLogin from "@/utils/guardLogin";
import AlertServices from '@/utils/AlertServices';

const QueryReserve = () => {
    const [dni, setDni] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [stayData, setStayData] = useState<ISpecificStay | null>(null)

    const saveDni = (valueInput: string) => {
        const value = parseInt(valueInput)
        setDni(value)
    }

    const searchReserve = async () => {
        if(!dni) {
            AlertServices.renderAlert(
                'Error',
                'Debe ingresar un numero de documento',
                'error'
            )
            return
        }

        if(dni < 0) {
            AlertServices.renderAlert(
                'Error',
                'Los números ingresados deben ser positivos',
                'error'
            )
            return
        }

        setIsLoading(true);
        const reserveQuery = await stayServices.getSpecificStayByDni(dni.toString())
        setIsLoading(false)

        if(reserveQuery.status == 500) {

            if(reserveQuery.data.message.includes( "No se pudo encontrar el visitante con dni:")){
                AlertServices.renderAlert(
                    'Usuario no encontrado',
                    'Los datos ingresados no corresponden con ninguna estadia',
                    'info'
                )
                return
            }

            AlertServices.renderAlert(
                'Error en el sistema',
                'Algo salio mal en el sistema, porfavor contactese con administracion',
                'error'
            )
            return
        }
        setStayData(reserveQuery.data as ISpecificStay)
    }

    return (
    <GuardLogin>
        <ABMTemplate title="Consultar Estadia" subTitle="Ingrese el dni del Vistitante para consultar la estadia">
            <div className={style.formContainer}>
                <div className={style.formContainer__options}>
                    <Input title='DNI' placeholder='DNI' type='number' icon={<HiOutlineIdentification/>} useStateFunction={saveDni} value={dni} isFullWidth={true}/>
                </div>
            </div>
            <Button text="Buscar" type={'primary'} isFullWidth={true} isLoading={isLoading} onClickFunction={()=>searchReserve()} />
            <Separator/>
            <div className={style.formContainer__reserveZone}>
                <Encabezado title='Datos de la estadia' alignment="center"/>
                {stayData && <InfoReserve infoReserve={stayData}/>}
            </div>
        </ABMTemplate>
    </GuardLogin>
    );
};

export default QueryReserve;
