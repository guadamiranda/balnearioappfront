'use client'

import { useRouter } from 'next/navigation';
import style from './home.module.scss'
import HomeTemplate from '@/Components/templates/homeTemplate/homeTemplate';
import Button from '@/Components/Atoms/button/button';
import HomeProfile from '@/Components/Molecules/HomeProfile/HomeProfile';
import GuardLogin from '@/utils/guardLogin';
import { useState, useEffect } from 'react';
import AlertServices from '@/utils/AlertServices';

const HomeComponent = () => {
    const router = useRouter();
    const [isLoadingButtons, setIsLoadingButtons] = useState([false,false,false,false,false,false,false])
    const [isAdmin, setIsAdmin] = useState(true)
    let lastId = 0;

    const handleClick = (route:string, buttonId:number) => {
        if(!isAdmin) {
            AlertServices.renderAlert(
                'Faltan Permisos',
                'Para acceder a esta opción es necesario tener permisos',
                'info'
            )
            return
        }
        const loadingButtons = isLoadingButtons
        loadingButtons[lastId] = false;
        loadingButtons[buttonId] = true;
        lastId = buttonId;
        setIsLoadingButtons([...loadingButtons])
        router.push(route);
    }

    const getRole = () => {
        const userDataString = localStorage.getItem('userData')
        if(userDataString) { 
            const userData = JSON.parse(userDataString)
            setIsAdmin(userData.roleName == 'Administrador'? true: false)
        }
    }

    useEffect(() => {
        getRole()
    },[])

    return (
    <GuardLogin>
        <HomeTemplate title="BalnearioApp" subTitle="Administración">
            <div className={style.homeContainer}>
                <div className={style.homeContainer__leftSide}>
                    <HomeProfile/>
                </div>
                <div className={style.homeContainer__rightSide}>
                    <Button text='Estadías' type='primary' isLoading={isLoadingButtons[0]} isFullWidth={true} onClickFunction={() => handleClick('/Reserves',0) }/>
                    <Button text='Precios' type='primary' isLoading={isLoadingButtons[1]} isFullWidth={true} onClickFunction={() => handleClick('/ABMPrice',1)}/>
                    <Button text='Descuentos' type='primary' isLoading={isLoadingButtons[2]} isFullWidth={true} onClickFunction={() => handleClick('/ABMDiscounts',2)}/>
                    <Button text='Roles' type={isAdmin? 'primary': 'disable'} isLoading={isLoadingButtons[3]} isFullWidth={true} onClickFunction={() => handleClick('/ABMRol',3)}/>
                    <Button text='Empleados' type={isAdmin? 'primary': 'disable'} isLoading={isLoadingButtons[4]} isFullWidth={true} onClickFunction={() => console.log('Soy Empleados',4)}/>
                    <Button text='Reportes' type={isAdmin? 'primary': 'disable'} isLoading={isLoadingButtons[5]} isFullWidth={true} onClickFunction={() => console.log('Soy Reportes',5)}/>
                </div>
            </div>
        </HomeTemplate>
    </GuardLogin>
    );
};

export default HomeComponent;
