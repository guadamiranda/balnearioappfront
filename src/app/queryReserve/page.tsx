'use client'

import reserveServices from '../../Services/stayServices';
import ABMTemplate from "@/Components/templates/abmTemplate/ABMTemplate";
import Encabezado from "@/Components/Atoms/Encabezado/Encabezado";
import Separator from "@/Components/Atoms/Separator/separator";
import InfoReserve from "@/Components/Organism/infoReserve/infoReserve";
import { HiOutlineIdentification } from "react-icons/hi";
import Input from "@/Components/Atoms/Input/input";
import style from "./queryReserve.module.scss";
import Button from "@/Components/Atoms/button/button";
import { AiOutlineCar } from "react-icons/ai";
import { ReactNode, useState } from "react";
import GuardLogin from "@/utils/guardLogin";
import AlertServices from '@/utils/AlertServices';

interface Option {
    stateFunction: any;
    state: any;
    icon: ReactNode;
    name: string;
    placeHolder: string;
}

interface OptionsToSearch {
    [key: string]: Option;
    carplate: Option;
    dni: Option;
    member: Option;
}

const QueryReserve = () => {
    const [dni, setDni] = useState(0);
    const [memberNumber, setMemberNumber] = useState(0)
    const [cardPlate, setCardPlate] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [opToFind, setOpToFind] = useState('')
    const [reserveData, setReserveData] = useState<ReserveDto | null>(null)

    const saveDni = (valueInput: string) => {
        const value = parseInt(valueInput)
        setDni(value)
    }

    const optionsToSearch: OptionsToSearch = {
        "carplate": { 
            name: 'Patente',
            placeHolder: 'AB 123 XC',
            stateFunction: setCardPlate,
            state: cardPlate,
            icon: <AiOutlineCar/>,
        },
        "dni": { 
            name: 'Numero de documento',
            placeHolder: '11222333',
            stateFunction: saveDni, 
            state: dni,
            icon: <HiOutlineIdentification/>
        },
        "member": { 
            name: 'Numero de Socio',
            placeHolder: '77222333',
            stateFunction: setMemberNumber, 
            state: memberNumber,
            icon: <HiOutlineIdentification/>
        }
    }

    const renderButtonsOptionSearch = () => {
        return(
            <>
                <Encabezado title='Buscar por:'/>
                <div className={style.formContainer__options}>
                    <Button isFullWidth={true} text='DNI' type='primary' onClickFunction={()=>setOpToFind('dni')}></Button>
                    <Button isFullWidth={true} text='N Socio' type='primary' onClickFunction={()=>setOpToFind('member')}></Button>
                    <Button isFullWidth={true} text='Patente' type='primary' onClickFunction={()=>setOpToFind('carplate')}></Button>
                </div>
            </>
        )
    }

    const goToFindOptions = () => {
        setDni(0)
        setMemberNumber(0)
        setCardPlate('')
        setOpToFind('')
    }

    const renderOptionSearch = () => {


        const option: Option = optionsToSearch[opToFind]

        return (
            <>
                <Encabezado title='Buscar por:'/>
                <div className={style.formContainer__input}>
                    <Input type={opToFind == 'carplate'? undefined : 'number'} useStateFunction={option.stateFunction} icon={option.icon} isFullWidth={true} placeholder={option.placeHolder} title={option.name}/>
                    <Button isFullWidth={true} text='Volver' type='secondary' onClickFunction={()=> goToFindOptions()}></Button>
                </div>
            </>
        )
    }

    const searchReserve = async () => {
        const optionSelected = optionsToSearch[opToFind]

        if(!optionSelected.state) {
            AlertServices.renderAlert(
                'Error',
                `Debe ingresar algun ${optionSelected.name}`,
                'error'
            )
            return
        }

        if(optionSelected.name.includes('Numero') && optionSelected.state < 0) {
            AlertServices.renderAlert(
                'Error',
                'Los números ingresados deben ser positivos',
                'error'
            )
            return
        }


        setIsLoading(true);
        const reserveQuery = await reserveServices.getSpecificReserve(dni.toString(), cardPlate, memberNumber.toString())
        setIsLoading(false)

        if(reserveQuery.status == 404) {
            AlertServices.renderAlert(
                'Usuario no encontrado',
                'Los datos ingresados no corresponden con ninguna estadia',
                'info'
            )
            return
        }

        if(reserveQuery.status == 500) {
            AlertServices.renderAlert(
                'Error en el sistema',
                'Algo salio mal en el sistema, porfavor contactese con administracion',
                'error'
            )
            return
        }

        setReserveData(reserveQuery.data as ReserveDto)
    }

    return (
    <GuardLogin>
        <ABMTemplate title="Consultar Estadia" subTitle="Seleccione y ingrese el dato del encargado de grupo para consultar la estadia">
            <div className={style.formContainer}>
                {opToFind? renderOptionSearch() : renderButtonsOptionSearch() }
            </div>
            <Button text="Buscar" type={opToFind? 'primary' : 'disable'} isFullWidth={true} isLoading={isLoading} onClickFunction={()=>searchReserve()} />
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
