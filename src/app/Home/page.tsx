'use client'

import { useRouter } from 'next/navigation';
import style from './home.module.scss'
import HomeTemplate from '@/Components/templates/homeTemplate/homeTemplate';
import Button from '@/Components/Atoms/button/button';
import HomeProfile from '@/Components/Molecules/HomeProfile/HomeProfile';
import GuardLogin from '@/utils/guardLogin';
import { useEffect, useState } from 'react';
import AlertServices from '@/utils/AlertServices';
import { isRouteAdmin } from './routes';
import sessionServices from '@/Services/sessionServices';

const HomeComponent = () => {
    const router = useRouter();
    const [isLoadingButtons, setIsLoadingButtons] = useState([false,false,false,false,false,false,false])
    const [isAdmin, setIsAdmin] = useState(false)
    let lastId = 0;

    const handleClick = async (route:string, buttonId:number) => {
        const loadingButtons = isLoadingButtons
        loadingButtons[lastId] = false;
        loadingButtons[buttonId] = true;
        lastId = buttonId;
        setIsLoadingButtons([...loadingButtons])

        if(isAdmin) {
            router.push('/' + route);
            return
        }

        if(!isRouteAdmin(route)) {
            router.push('/' + route);
            return
        }
        AlertServices.renderAlertPermission();

        loadingButtons[buttonId] = false;
        setIsLoadingButtons([...loadingButtons])
    }

    useEffect(() => {setIsAdmin(sessionServices.isAdmin())}, [])

    return (
    <GuardLogin>
        <HomeTemplate title="BalnearioApp" subTitle="Administración">
            <div className={style.homeContainer}>
                <div className={style.homeContainer__leftSide}>
                    <HomeProfile/>
                </div>
                <div className={style.homeContainer__rightSide}>
                    <Button text='Reservas' type='primary' isLoading={isLoadingButtons[0]} isFullWidth={true} onClickFunction={() => handleClick('Reserves',0) }/>
                    <Button text='Precios' type='primary' isLoading={isLoadingButtons[1]} isFullWidth={true} onClickFunction={() => handleClick('ABMPrice',1)}/>
                    <Button text='Descuentos' type='primary' isLoading={isLoadingButtons[2]} isFullWidth={true} onClickFunction={() => handleClick('ABMDiscounts',2)}/>
                    <Button text='Roles' type={isAdmin? 'primary': 'disable'} isLoading={isLoadingButtons[3]} isFullWidth={true} onClickFunction={() => handleClick('ABMRol',3)}/>
                    <Button text='Empleados' type={isAdmin? 'primary': 'disable'} isLoading={isLoadingButtons[4]} isFullWidth={true} onClickFunction={() => console.log('Soy Empleados',4)}/>
                    <Button text='Reportes' type={isAdmin? 'primary': 'disable'} isLoading={isLoadingButtons[5]} isFullWidth={true} onClickFunction={() => console.log('Soy Reportes',5)}/>
                </div>
            </div>
        </HomeTemplate>
    </GuardLogin>
    );
};

export default HomeComponent;
