'use client'

import style from './estadiaSummary.module.scss'
import React, { useEffect, useState } from 'react'

interface IStaySummary {
    animalAmount: number,
    leader: any,
    vehiculePlate: any,
    visitors: any,
    hasVehicule: boolean,
    amountPrice: number,
    datosFechas: any,
    animalPrice: number,
    vehiculePrice: number
}

const EstadiaSummary: React.FC<IStaySummary> = ({
    animalAmount,
    amountPrice,
    leader,
    animalPrice,
    vehiculePrice,
    datosFechas,
    vehiculePlate,
    hasVehicule,
    visitors = [] }) => {

    const [allVisitors, setAllVisitors] = useState([])
    const [leaderFull, setLeaderFull] = useState({ dniNumber: '', price: '' })

    useEffect(() => {
        setAllVisitors(visitors)
        setLeaderFull(leader)
    }, [visitors, leader]) 

    return(
        <div className={style.estadiaSummary}>
            <div className={style.estadiaSummary__title}>Detalles de Estadía</div>
            {hasVehicule &&
                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>Vehiculo</b>
                        <div className={style.estadiaSummary__descuentos}> Patente: {vehiculePlate}</div>
                    </div>
                    <div className={style.estadiaSummary__prices}>
                        {datosFechas.dateFromUnix === 0 ? null : `$ ${vehiculePrice}`}
                    </div>
                </div>
            }

                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>Animales</b>
                    <div className={style.estadiaSummary__descuentos}> Cantidad: {animalAmount}</div>
                    </div>
                    <div className={style.estadiaSummary__prices}>
                    {datosFechas.dateFromUnix === 0 ? null : `$ ${animalAmount * animalPrice}`}
                    </div>
                </div>

            <div className={style.estadiaSummary__title}>Visitantes</div>

            {leaderFull.dniNumber === '' ?
                <div> *No se agrego al responsable </div>
                :
                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>{leader.dniNumber}</b>
                        <span className={style.estadiaSummary__descuentos}>
                            Descuento: {leaderFull.discount.name} - {leaderFull.discount.percent}%
                        </span>
                    </div>
                    <div className={style.estadiaSummary__prices}>
                        {datosFechas.dateFromUnix === 0 ? null : `$ ${leaderFull.price}`}
                    </div>
                </div>
            }

            {allVisitors.length === 0 ?
                <div> *No se agrego visitantes </div>
                :
                allVisitors.map(visitor =>
                    <div className={style.estadiaSummary__visitantesContainer}>
                        <div className={style.estadiaSummary__visitantes}>
                            <b>{visitor.dni}</b>
                            <span className={style.estadiaSummary__descuentos}>
                                {visitor.discount ? `Descuento: ${visitor.discount.name} - ${visitor.discount.percent}%` : null}
                            </span>
                        </div>
                        <div className={style.estadiaSummary__prices}>
                            {datosFechas.dateFromUnix === 0 ? null : `$ ${visitor.price}`}
                        </div>
                    </div>
                )}
            <div className={style.estadiaSummary__title}>Total de la Estadía</div>
                    <div className={style.estadiaSummary__priceContainer}>
                <b className={style.estadiaSummary__price}>${amountPrice}</b>
                    </div>

        </div>
    )
}

export default EstadiaSummary
