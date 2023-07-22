'use client'

import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const GuardLogin: React.FC<Props> = ({ children }) => {

  const [isLoged ,setIsLoged] = useState(false)
  const router = useRouter()
  

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if(userData) setIsLoged(true) 
    if(!userData) router.push('/login')
  },[])

  return (
    <>
      { isLoged && children }
    </>
  );
};

export default GuardLogin;