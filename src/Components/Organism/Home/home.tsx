'use client'

import style from './home.module.scss'
import HomeTemplate from '@/Components/templates/homeTemplate/homeTemplate';
import Button from '@/Components/Atoms/button/button';

const QueryReserve = () => {
    return (
        <HomeTemplate title="BalnearioApp" subTitle="Administración">
            <div className={style.homeContainer}>
                <div className={style.homeContainer__leftSide}></div>
                <div className={style.homeContainer__rightSide}>
                    <Button text='Estadías' type='primary' onClickFunction={() => console.log('Soy Estadía')}/>
                    <Button text='Reportes' type='primary' onClickFunction={() => console.log('Soy Reportes')}/>
                </div>
            </div>
        </HomeTemplate>
    );
};

export default QueryReserve;
