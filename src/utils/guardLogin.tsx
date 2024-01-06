'use client'

import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import loginServices from '../Services/loginServices';

interface Props {
  children: ReactNode;
}

interface ILoginData {
  access_token: string;
  firstName: string;
  lastName: string;
  email: string | null;
  isAdmin: boolean;
}

const GuardLogin: React.FC<Props> = ({ children }) => {

  const [isLoged ,setIsLoged] = useState(false)
  const router = useRouter()
  

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');

    if(userDataString) {
      const userData: ILoginData | null = JSON.parse(userDataString || '');
      if(userData?.access_token) {
        loginServices.validateToken().then((response) => {
          setIsLoged(response)
          if(!response) router.push('/login')
        })
      }
    } 
    if(!userDataString){
      router.push('/login')
    }
  },[])

  return (
    <>
      { isLoged && children }
    </>
  );
};

export default GuardLogin;