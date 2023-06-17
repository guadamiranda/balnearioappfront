'use client'

import style from "./queryReserve.module.scss";
import Encabezado from "@/Components/Atoms/Encabezado/Encabezado";
import Input from "@/Components/Atoms/Input/input";
import { AiOutlineCar } from "react-icons/ai";
import { HiOutlineIdentification } from "react-icons/hi";
import ABMTemplate from "@/Components/templates/abmTemplate/ABMTemplate";
import Button from '../../Atoms/button/button';
import Separator from "@/Components/Atoms/Separator/separator";

const QueryReserve = () => {
    return (
        <ABMTemplate title="Consultar Estadia" subTitle="Ingresa los datos para consultar la estadia">
            <div className={style.formContainer}>
                <Encabezado title='Encargado del Grupo'/>
                <div className={style.formContainer__searchZone}>
                    <div className={style.formContainer__input}>
                        <Input icon={<HiOutlineIdentification/>} isFullWidth={true} placeholder='99999999' title='Numero de documento'/>
                    </div>
                    <div className={style.formContainer__input}>
                        <Input icon={<AiOutlineCar/>} isFullWidth={true} placeholder='AB 123 CD' title='Patente del Vehiculo'/>
                    </div>
                </div>
            </div>
            <Button text="Buscar" type="primary" isFullWidth={true} onClickFunction={()=> console.log('hola')} />
            <Separator/>
            <div className={style.formContainer__reserveZone}>
                <Encabezado title='Datos de la estadia' alignment="center"/>
            </div>
        </ABMTemplate>
    );
};

export default QueryReserve;
