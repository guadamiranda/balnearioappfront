'use client'

import { GiCampingTent } from "react-icons/gi";
import style from './home2.module.scss'

const HomePrueba = () => {

    return (
        <div className={style.homeContainer}>
            <div className={style.homeContainer__menuContainer}>
                <div className={style.homeContainer__menuButtons}>
                    <span><GiCampingTent /> Registrar Dia</span>
                    <span>Registrar Camping</span>
                    <span>Ver Reservas</span>
                    <span>Precio</span>
                    <span>Descuentos</span>
                    <span>Empleados</span>
                    <span>Reportes</span>
                </div>
            </div>
        </div>
    )


};

export default HomePrueba;


