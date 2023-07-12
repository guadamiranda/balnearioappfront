import React from 'react'
import style from './homeProfile.module.scss'
import ProfilePhoto from '@/Components/Atoms/ProfilePhoto/ProfilePhoto';

interface IHomeProfile {
}

const HomeProfile: React.FC<IHomeProfile> = () => {
  return (
    <div className={style.homeProfileContainer}>
        <div className={style.homeProfileContainer__profileInformationContainer}>
            <ProfilePhoto/>
            <span className={style.homeProfileContainer__nameUser}><b>Guadalupe</b></span>
            <span className={style.homeProfileContainer__rol}>Gerente</span>
        </div>
        <div className={style.homeProfileContainer__signOffContainer}>
            <div className={style.homeProfileContainer__signOff}>Cerrar Sesión</div>
        </div>
        
    </div>
  );
};

export default HomeProfile
