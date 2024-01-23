'use client'

import RegistrarEstadia from "../RegistrarEstadia/page";
import { AiFillDollarCircle } from "react-icons/ai";
import OnlyOneDayStay from "../OnlyOneDayStay/page";
import { TbReportSearch } from "react-icons/tb";
import { GiCampingTent } from "react-icons/gi";
import ABMDiscount from "../ABMDiscounts/page";
import { FaListAlt, FaPercentage } from "react-icons/fa";
import ABMEmployee from "../ABMEmployee/page";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { BsSunFill } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import ABMPrice from "../ABMPrice/page";
import style from './home2.module.scss';
import Reserves from "../Reserves/page";
import GuardLogin from "@/utils/guardLogin";
import Loader from "@/Components/Organism/loaderScreen/loader";
import QueryReserve from "../queryReserve/page";
import sessionServices from "@/Services/sessionServices";
import AlertServices from "@/utils/AlertServices";
import workshiftServices from "@/Services/workshiftServices";
import Swal from "sweetalert2";


const HomePrueba = () => {
    const [selectedButton, setSelectedButton] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [roleName, setRoleName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
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

    const handleButtonClick = (button:any) => {
        setSelectedButton(button);
    };

    let componentToRender;
    switch (selectedButton) {
        case 'registrarDia':
            componentToRender = <OnlyOneDayStay />;
            break;
        case 'registrarCamping':
            componentToRender = <RegistrarEstadia />;
            break;
        case 'verReservas':
            componentToRender = <Reserves changeComponent={handleButtonClick}/>;
            break;
        case 'ABMPrecios':
            componentToRender = <ABMPrice />;
            break;
        case 'ABMDescuentos':
            componentToRender = <ABMDiscount />;
            break;
        case 'Empleados':
            if(isAdmin) {
                componentToRender = <ABMEmployee />;
                return
            }
            AlertServices.renderAlertPermission();
            break;
        case 'Reportes':
            if(isAdmin) {
                componentToRender = <ABMEmployee />;
                return
            }
            AlertServices.renderAlertPermission();
            break;
        case 'buscarReserva':
            componentToRender = <QueryReserve />;
            break;
        default:
            componentToRender = <Reserves changeComponent={handleButtonClick}/>
            break;
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
          confirmButtonColor: "#568871",
          cancelButtonColor: "#cf8700",
        })
        
        if(isConfirmed) {
          await workshiftServices.finish(observacion);
          localStorage.removeItem('userData')
          router.push('/login')
        }
      }

    useEffect(()=> {
        setIsAdmin(sessionServices.isAdmin())
        setInformationUser()
        setLoading(false)
      },[])

    return (
        <GuardLogin>
            <div className={style.homeContainer}>
                <div className={style.homeContainer__opacity}>

                    <div className={style.homeContainer__menuContainer}>

                        <div className={style.homeContainer__imgUserContainer}>
                            <div className={style.homeContainer__img}></div>
                            <span>{firstName} {lastName} </span>
                        </div>

                        <div className={style.homeContainer__menuButtons}>
                            <div className={style.homeContainer__buttons} onClick={() => handleButtonClick('registrarDia')}> 
                                <BsSunFill className={style.homeContainer__icons}/> 
                                <span>Registrar Dia</span> 
                            </div>
                            <div className={style.homeContainer__buttons} onClick={() => handleButtonClick('registrarCamping')}> 
                                <GiCampingTent className={style.homeContainer__icons}/> 
                                <span> Registrar Camping</span> 
                            </div>
                            <div className={style.homeContainer__buttons} onClick={() => handleButtonClick('verReservas')}> 
                                <FaListAlt className={style.homeContainer__icons}/> 
                                <span> Ver Reservas</span> 
                            </div>
                            <div className={style.homeContainer__buttons} onClick={() => handleButtonClick('ABMPrecios')}> 
                                <AiFillDollarCircle className={style.homeContainer__icons}/> 
                                <span>Precios</span> 
                            </div>
                            <div className={style.homeContainer__buttons} onClick={() => handleButtonClick('ABMDescuentos')}> 
                                <FaPercentage className={style.homeContainer__icons}/> 
                                <span>Descuentos</span> 
                            </div>
                            <div className={style.homeContainer__buttons} onClick={() => handleButtonClick('Empleados')}> 
                                <FaUsers className={style.homeContainer__icons}/> 
                                <span>Empleados</span> 
                            </div>
                            {/* 
                            <div className={style.homeContainer__buttons} onClick={() => handleButtonClick('Reportes')}> 
                                <TbReportSearch className={style.homeContainer__icons}/> 
                                <span>Reportes</span> 
                            </div>
                            */}
                        </div>

                        <div className={style.homeContainer__menuFooter}> 
                            <div className={style.homeContainer__buttons} onClick={()=> logout()}> <IoMdExit className={style.homeContainer__icons}/> <span>Finalizar turno</span> </div>
                        </div>
                    </div>

                    
                        <div className={style.homeContainer__componentToRenderize}>
                            {!loading && componentToRender}
                            {loading && <Loader /> }
                        </div>
                </div>
            </div>
        </GuardLogin>
        
    )

};

export default HomePrueba;


