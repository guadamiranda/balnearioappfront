'use client'

import HomeTemplate from '@/Components/templates/homeTemplate/homeTemplate';
import HomeProfile from '@/Components/Molecules/HomeProfile/HomeProfile';
import Button from '@/Components/Atoms/button/button';
import { useRouter } from 'next/navigation';
import GuardLogin from '@/utils/guardLogin';
import style from './home.module.scss'

const HomeComponent = () => {
    const router = useRouter();

    const handleClick = (route:string) => {
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
                    <Button text='Estadías' type='primary' isFullWidth={true} onClickFunction={() => handleClick('/Reserves') }/>
                    <Button text='Buscar Estadía' type='primary' isFullWidth={true} onClickFunction={() => handleClick('/queryReserve')}/>
                    <Button text='Precios' type='primary' isFullWidth={true} onClickFunction={() => handleClick('/ABMPrice')}/>
                    <Button text='Descuentos' type='primary' isFullWidth={true} onClickFunction={() => handleClick('/ABMDiscounts')}/>
                    <Button text='Empleados' type='primary' isFullWidth={true} onClickFunction={() => handleClick('/ABMEmployee')}/>
                    <Button text='Reportes' type='primary' isFullWidth={true} onClickFunction={() => console.log('Soy Reportes')}/>
                </div>
            </div>
        </HomeTemplate>
    </GuardLogin>
    );
};

export default HomeComponent;
