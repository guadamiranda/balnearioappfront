'use client'

import { useRouter } from 'next/navigation';
import style from './home.module.scss'
import HomeTemplate from '@/Components/templates/homeTemplate/homeTemplate';
import Button from '@/Components/Atoms/button/button';
import HomeProfile from '@/Components/Molecules/HomeProfile/HomeProfile';
import GuardLogin from '@/utils/guardLogin';
import { useState } from 'react';

const HomeComponent = () => {
    const router = useRouter();
    const [isLoadingButtons, setIsLoadingButtons] = useState([false,false,false,false,false,false,false])
    let lastId = 0;

    const handleClick = (route:string, buttonId:number) => {
        const loadingButtons = isLoadingButtons
        loadingButtons[lastId] = false;
        loadingButtons[buttonId] = true;
        lastId = buttonId;
        setIsLoadingButtons([...loadingButtons])
        router.push(route);
    }

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
                    <Button text='Roles' type='primary' isLoading={isLoadingButtons[3]} isFullWidth={true} onClickFunction={() => handleClick('/ABMRol',3)}/>
                    <Button text='Empleados' type='primary' isLoading={isLoadingButtons[4]} isFullWidth={true} onClickFunction={() => console.log('Soy Empleados',4)}/>
                    <Button text='Reportes' type='primary' isLoading={isLoadingButtons[5]} isFullWidth={true} onClickFunction={() => console.log('Soy Reportes',5)}/>
                </div>
            </div>
        </HomeTemplate>
    </GuardLogin>
    );
};

export default HomeComponent;
