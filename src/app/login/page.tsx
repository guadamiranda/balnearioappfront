'use client'
import Encabezado from '../../Components/Atoms/Encabezado/Encabezado';
import Button from "@/Components/Atoms/button/button";
import Title from "@/Components/Atoms/Titulo/Titulo";
import loginServices from "@/Services/loginServices";
import Input from "@/Components/Atoms/Input/input";
import { useRouter } from "next/navigation";
import style from "./login.module.scss"
import { useState } from "react";
import Swal from "sweetalert2";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const router = useRouter()

    const logIn = async () => {
        const {status, data: userData} = await loginServices.authUser(email,password)

        console.log(userData)
        if(status == 401) {
            Swal.fire({
                title: 'No se puede iniciar el turno',
                text: 'No se encontro ningun usuario con los datos ingresados. Verifique que el email o la contraseña sean correctas e intente de nuevo',
                icon: 'error',
                confirmButtonText: 'Entendido'
              });
            return
        }

        if(status == 500) {
            Swal.fire({
                title: 'Error',
                text: 'El servidor no respondio como debia, por favor contactese con los desarrolladores',
                icon: 'error',
                confirmButtonText: 'Entendido'
              });
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
                    <Input isFullWidth={true} title="Email" useStateFunction={setEmail} placeholder="usuario@hotmail.com" icon={undefined}></Input>
                    <Input isFullWidth={true} title="Contraseña" useStateFunction={setPassword} placeholder="Mi Contraseña" icon={undefined}></Input>
                </div>
                <div className={style['loginContainer-buttonSection']}>
                    <Button text={"Iniciar Turno"} type={"primary"} onClickFunction={() => logIn()}></Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
