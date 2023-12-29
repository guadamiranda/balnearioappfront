'use client'

import HomeTemplate from '@/Components/templates/homeTemplate/homeTemplate';
import HomeProfile from '@/Components/Molecules/HomeProfile/HomeProfile';
import Loader from '@/Components/Organism/loaderScreen/loader';
import { useRouter, usePathname } from 'next/navigation';
import sessionServices from '@/Services/sessionServices';
import Button from '@/Components/Atoms/button/button';
import AlertServices from '@/utils/AlertServices';
import GuardLogin from '@/utils/guardLogin';
import { useEffect, useState } from 'react';
import { isRouteAdmin } from './routes';
import style from './home.module.scss'

const HomeComponent = () => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleClick = (route: string) => {
        setLoading(true);
        router.push('/' + route);
    }

    useEffect(() => {
        setIsAdmin(sessionServices.isAdmin())
    }, [])


    return (
    <GuardLogin>
            {!loading && (
        <HomeTemplate title="Camping Los Nogales" subTitle="Administración">
            <div className={style.homeContainer}>
                <div className={style.homeContainer__leftSide}>
                    <HomeProfile/>
                </div>
                <div className={style.homeContainer__rightSide}>
                            <Button text='Reservas' type='primary' isFullWidth={true} onClickFunction={() => handleClick('Reserves')} />
                            <Button text='Precios' type='primary' isFullWidth={true} onClickFunction={() => handleClick('ABMPrice')} />
                            <Button text='Descuentos' type='primary' isFullWidth={true} onClickFunction={() => handleClick('ABMDiscounts')} />
                            {/*<Button text='Roles' type={isAdmin? 'primary': 'disable'}  isFullWidth={true} onClickFunction={() => handleClick('ABMRol')}/>*/}
                            <Button text='Empleados' type={'primary'} isFullWidth={true} onClickFunction={() => handleClick('ABMEmployee')} />
                            <Button text='Reportes' type={'primary'} isFullWidth={true} onClickFunction={() => console.log('Soy Reportes')} />
                </div>
            </div>
        </HomeTemplate>
            )}
            {loading && <Loader />}
    </GuardLogin>
    );
};

export default HomeComponent;


/*
 const loadingButtons = isLoadingButtons
        loadingButtons[lastId] = false;
        loadingButtons[buttonId] = true;
        lastId = buttonId;
        setIsLoadingButtons([...loadingButtons])
            if(true) {
                router.push('/' + route);
                setIsLoadingButtons([false,false,false,false,false,false,false])
                return
            }
    
            if(!isRouteAdmin(route)) {
                router.push('/' + route);
                setIsLoadingButtons([false,false,false,false,false,false,false])
                return
            }
            AlertServices.renderAlertPermission();
    
            setIsLoadingButtons([false,false,false,false,false,false,false])

    }
    */