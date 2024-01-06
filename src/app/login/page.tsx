'use client'

import Encabezado from '../../Components/Atoms/Encabezado/Encabezado';
import Button from "@/Components/Atoms/button/button";
import Title from "@/Components/Atoms/Titulo/Titulo";
import loginServices from "@/Services/loginServices";
import Input from "@/Components/Atoms/Input/input";
import AlertServices from '@/utils/AlertServices';
import { useRouter } from "next/navigation";
import style from "./login.module.scss"
import { useState } from "react";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const logIn = async () => {
        setIsLoading(true)
        const {status, data: userData} = await loginServices.authUser(dni,password)
        setIsLoading(false)

        if(userData.status == 401) {
            AlertServices.renderAlert(
                'No se puede iniciar el turno',
                'No se encontro ningun usuario con los datos ingresados. Verifique que el email o la contraseña sean correctas e intente de nuevo',
                'info'
            )
            return
        }

        if(status == 500) {
            AlertServices.renderAlert(
                'Error',
                'El servidor no respondio como debia, por favor contactese con el administrador',
                'error'
            )
            return
        }
        
        localStorage.setItem('userData', JSON.stringify(userData));
        router.push('/')
    }

    return (
        <div className={style.loginContainer}>
            <div className={style['loginContainer-login']}>
                <div className={style['loginContainer-headerSection']}>
                    <Title title="Bienvenido"></Title>
                    <Encabezado title="Ingrese sus datos para comenzar su turno"></Encabezado>
                </div>
                <div className={style['loginContainer-inputSection']}>
                    <Input isFullWidth={true} title="Dni" useStateFunction={setDni} placeholder="32856123" icon={undefined}></Input>
                    <Input isFullWidth={true} title="Contraseña" useStateFunction={setPassword} placeholder="Mi Contraseña" icon={undefined}></Input>
                </div>
                <div className={style['loginContainer-buttonSection']}>
                    <Button text={"Iniciar Turno"} type={"primary"} isLoading={isLoading} onClickFunction={() => logIn()}></Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
