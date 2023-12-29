'use client'

import style from './estadiaSummary.module.scss'
import React, { useEffect, useState } from 'react'

interface IStaySummary {
    animalAmount: number,
    leader: any,
    vehiculePlate: number,
    visitors: any
}

const EstadiaSummary: React.FC<IStaySummary> = ({
    animalAmount,
    leader,
    vehiculePlate,
    visitors = [] }) => {

    const [allVisitors, setAllVisitors] = useState([])
    const [leaderFull, setLeaderFull] = useState({})

    useEffect(() => {
        setAllVisitors(visitors)
        setLeaderFull(leader)
    }, [visitors, leader]) 

    return(
        <div className={style.estadiaSummary}>
            <div className={style.estadiaSummary__title}>Detalles de Estadía</div>
                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>Vehiculo</b>
                    <div className={style.estadiaSummary__descuentos}>{vehiculePlate}</div>
                    </div>
                    <div className={style.estadiaSummary__prices}>
                        $ 560
                    </div>
                </div>

                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>Animales</b>
                    <div className={style.estadiaSummary__descuentos}> {animalAmount}</div>
                    </div>
                    <div className={style.estadiaSummary__prices}>
                        $ 560
                    </div>
                </div>

            <div className={style.estadiaSummary__title}>Visitantes</div>

            {leaderFull.dniNumber === '' ?
                <div> No se agrego al responsable </div>
                :
                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>{leader.dniNumber}</b>
                        <span className={style.estadiaSummary__descuentos}>{leader.descuento} - 20%</span>
                    </div>
                    <div className={style.estadiaSummary__prices}>
                        $ 560
                    </div>
                </div>
            }

            {allVisitors.length === 0 ?
                <div> No se agrego visitantes </div>
                :
                allVisitors.map(visitor =>
                    <div className={style.estadiaSummary__visitantesContainer}>
                        <div className={style.estadiaSummary__visitantes}>
                            <b>{visitor.dni}</b>
                            <span className={style.estadiaSummary__descuentos}>{visitor.descuento} - 20%</span>
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
