import ProfilePhoto from '@/Components/Atoms/ProfilePhoto/ProfilePhoto';
import loginServices from '@/Services/loginServices';
import style from './homeProfile.module.scss';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import React from 'react'

interface IHomeProfile {
}

const HomeProfile: React.FC<IHomeProfile> = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [roleName, setRoleName] = useState('')
  const router = useRouter()

  const setInformationUser = () => {
    let userData = localStorage.getItem('userData')
    if(userData) {
      const jsonUserData = JSON.parse(userData)
      setFirstName(jsonUserData.firstName)
      setLastName(jsonUserData.lastName)
      setRoleName(jsonUserData.roleName)
    }
  }


  const logout = async() => {
    const {value: observacion, isConfirmed} = await Swal.fire({
      title: "Cierre de turno",
      text: "¿Está seguro de que desea finalizar su turno laboral?",
      input: 'textarea',
      inputLabel: 'Observación:',
      inputPlaceholder: 'Alguna observación que considere',
      confirmButtonText: 'Finalizar',
      showCancelButton: true,
      denyButtonText: `Cancelar`,
    })
    
    if(isConfirmed) {
      await loginServices.logOutUser(observacion);
      localStorage.removeItem('userData')
      router.push('/login')
    }
  }
  
  useEffect(()=> {
    setInformationUser()
  },[])
  
  return (
    <div className={style.homeProfileContainer}>
        <div className={style.homeProfileContainer__profileInformationContainer}>
            <ProfilePhoto/>
            <span className={style.homeProfileContainer__nameUser}><b>{`${firstName} ${lastName}`}</b></span>
            <span className={style.homeProfileContainer__rol}>{roleName}</span>
        </div>
        <div className={style.homeProfileContainer__signOffContainer}>
            <div className={style.homeProfileContainer__signOff} onClick={()=> logout()}>Finalizar Turno</div>
        </div>
        
    </div>
  );
};

export default HomeProfile
