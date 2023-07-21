'use client'

import { useRouter } from 'next/navigation';
import style from './home.module.scss'
import HomeTemplate from '@/Components/templates/homeTemplate/homeTemplate';
import Button from '@/Components/Atoms/button/button';
import HomeProfile from '@/Components/Molecules/HomeProfile/HomeProfile';

const HomeComponent = () => {
    const router = useRouter();

    const handleClick = (route:string) => {
        router.push(route);
    }

    return (
        <HomeTemplate title="BalnearioApp" subTitle="Administración">
            <div className={style.homeContainer}>
                <div className={style.homeContainer__leftSide}>
                    <HomeProfile/>
                </div>
                <div className={style.homeContainer__rightSide}>
                    <Button text='Estadías' type='primary' isFullWidth={true} onClickFunction={() => handleClick('/Reserves') }/>
                    <Button text='Buscar Estadía' type='primary' isFullWidth={true} onClickFunction={() => handleClick('/queryReserve')}/>
                    <Button text='Precios' type='primary' isFullWidth={true} onClickFunction={() => handleClick('/ABMPrice')}/>
                    <Button text='Descuentos' type='primary' isFullWidth={true} onClickFunction={() => handleClick('/ABMDiscounts')}/>
                    <Button text='Roles' type='primary' isFullWidth={true} onClickFunction={() => handleClick('/ABMRol')}/>
                    <Button text='Empelados' type='primary' isFullWidth={true} onClickFunction={() => console.log('Soy Empleados')}/>
                    <Button text='Reportes' type='primary' isFullWidth={true} onClickFunction={() => console.log('Soy Reportes')}/>
                </div>
            </div>
        </HomeTemplate>
    );
};

export default HomeComponent;
