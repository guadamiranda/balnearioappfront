'use client'

import style from './estadiaSummary.module.scss'
import React, { useState } from 'react'

const EstadiaSummary = () => {
    const mockVisitantes = [
        {dni: '34556778', descuento: 'Jubilado'},
        {dni: '23445778', descuento: ''},
        {dni: '12334779', descuento: 'Le falta una pata'},
        {dni: '78223595', descuento: 'Chueco'}]

    return(
        <div className={style.estadiaSummary}>
            <div className={style.estadiaSummary__title}>Detalles de Estadía</div>
                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>Vehiculo</b>
                        <div className={style.estadiaSummary__descuentos}> - 20%</div>
                    </div>
                    <div className={style.estadiaSummary__prices}>
                        $ 560
                    </div>
                </div>

                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>Animales</b>
                        <div className={style.estadiaSummary__descuentos}> 3</div>
                    </div>
                    <div className={style.estadiaSummary__prices}>
                        $ 560
                    </div>
                </div>

            <div className={style.estadiaSummary__title}>Visitantes</div>
                
                {mockVisitantes.map(visitante =>
                    <div className={style.estadiaSummary__visitantesContainer}>
                        <div className={style.estadiaSummary__visitantes}>
                            <b>{visitante.dni}</b>
                            <span className={style.estadiaSummary__descuentos}>{visitante.descuento} - 20%</span>
                        </div>
                        <div className={style.estadiaSummary__prices}>
                            $ 560
                        </div>
                    </div>
                    )}
            <div className={style.estadiaSummary__title}>Total de la Estadía</div>
                    <div className={style.estadiaSummary__priceContainer}>
                        <b className={style.estadiaSummary__price}>$2345</b>
                    </div>

        </div>
    )
}

export default EstadiaSummary
