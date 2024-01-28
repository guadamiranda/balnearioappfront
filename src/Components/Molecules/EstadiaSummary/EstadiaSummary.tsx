'use client'

import React, { useEffect, useState } from 'react'
import style from './estadiaSummary.module.scss'
import Input from '@/Components/Atoms/Input/input'
import Dropdown from '@/Components/Atoms/DropDown/Dropdown'

interface IDiscount {
    name: string,
    percent: number
}

interface ILeader {
    dniNumber: any,
    name: string,
    lastName: string,
    phone: number,
    partnerNumber: number,
    bracelet: string,
    price: number,
    discount: IDiscount,
}
interface IStaySummary {
    animalAmount: any,
    leader: any,
    vehiculePlate: any,
    visitors: any[],
    hasVehicule: boolean,
    setAmountStayState: (value:any) => void,
    datosFechas: any,
    animalPrice: number,
    vehiculePrice: number,
    setPayType: any
}

const EstadiaSummary: React.FC<IStaySummary> = ({
    animalAmount,
    setAmountStayState,
    setPayType,
    leader,
    animalPrice,
    vehiculePrice,
    datosFechas,
    vehiculePlate,
    hasVehicule,
    visitors = [] }) => {

    const [amountStay, setAmountStay] = useState(0)
    const [leaderAmount, setLeaderAmount] = useState(0)
    const [vehiculeAmount, setVehiculeAmount] = useState(0)
    const [animalValue, setAnimalValue] = useState<any>(0)
    const [visitorPrices, setVisitorPrices] = useState([0]); 
    const [leaderFull, setLeaderFull] = useState<ILeader>({ discount: {} } as ILeader)

    const paidType= [{name: 'Transferencia' , code: 'TRANS'}, {name: 'Efectivo', code: 'EFECT'}]

    useEffect(() => {
        setLeaderFull(leader)
    }, [leader]) 

    const handlerChangePriceVisitor =(index: number, value: number) => {
        visitorPrices[index] = value
        setVisitorPrices([...visitorPrices])
    }

    const handlerChangeLeaderAmount = (value: number) => {
        setLeaderAmount(value)
    }

    const handlerChangeVehiculePrice = (value: number) => {
        setVehiculeAmount(value)
    }

    const handlerChangeAnimalPrice = (value: number) => {
        setAnimalValue(value)
    }

    useEffect(() => {
        const totalStayAmount = parseInt(animalValue) + vehiculeAmount + visitorPrices.reduce((a, b) => a + b, 0) + leaderAmount
        setAmountStayState(totalStayAmount)
        setAmountStay(totalStayAmount)
    },[animalValue, vehiculeAmount,visitorPrices, leaderAmount])

    useEffect(() => {
        const animalSum = animalPrice * parseInt(animalAmount);

        setAnimalValue(animalSum? animalSum: 0);
    }, [animalAmount]);
      
    useEffect(() => {
        setVehiculeAmount(vehiculePrice);
    }, [vehiculePrice]);
    
    useEffect(() => {
        setVisitorPrices(visitors.map(visitor => visitor.price));
    }, [visitors]);

    useEffect(() => {
        setLeaderAmount(leader.price)
    },[leader.price])

    return(
        <div className={style.estadiaSummary}>
            <div className={style.estadiaSummary__title}>
                <span>Detalles de Estadía</span> 
                <span>Precios Sugeridos</span>
            </div>
            {hasVehicule &&
                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>Vehiculo</b>
                        <div className={style.estadiaSummary__descuentos}> Patente: {vehiculePlate}</div>
                    </div>
                    <div className={style.estadiaSummary__price}>
                        {datosFechas.dateFromUnix === 0 ? null : 
                            <Input
                            title={''}
                            placeholder={''}
                            type='number'
                            isFullWidth={true}
                            useStateFunction={(value) => handlerChangeVehiculePrice(value)}
                            value={vehiculeAmount}
                            />
                        }
                    </div>
                </div>
            }

                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>Animales</b>
                    <div className={style.estadiaSummary__descuentos}> Cantidad: {animalAmount}</div>
                    </div>
                    <div className={style.estadiaSummary__price}>
                    {datosFechas.dateFromUnix === 0 ? null :
                        <Input
                        title={''}
                        placeholder={''}
                        isFullWidth={true}
                        type='number'
                        useStateFunction={(value) => handlerChangeAnimalPrice( value)}
                        value={animalValue}
                        />
                    }
                    </div>
                </div>

            <br></br>
                    
            <div className={style.estadiaSummary__title2}>Visitantes</div>

            {leaderFull.dniNumber === '' ?
                <div className={style.estadiaSummary__advertise}> *No se agrego al responsable </div>
                :
                <div className={style.estadiaSummary__visitantesContainer}>
                    <div className={style.estadiaSummary__visitantes}>
                        <b>{leader.dniNumber}</b>
                        <span className={style.estadiaSummary__descuentos}>
                            Descuento: {leaderFull.discount === undefined ? '-' : leaderFull.discount.name} -
                            {leaderFull.discount === undefined ? '-' : leaderFull.discount.percent}
                        </span>
                    </div>
                    <div className={style.estadiaSummary__price}>
                        {datosFechas.dateFromUnix === 0 ? null : 
                            <Input
                            title={''}
                            placeholder={''}
                            type='number'
                            isFullWidth={true}
                            useStateFunction={(value) => handlerChangeLeaderAmount( value)}
                            value={leaderAmount}
                            />
                        }
                    </div>
                </div>
            }

            {visitors.length === 0 ?
                <div className={style.estadiaSummary__advertise}> *No se agrego visitantes </div>
                :
                visitors.map((visitor,index) =>
                    <div className={style.estadiaSummary__visitantesContainer}>
                        <div className={style.estadiaSummary__visitantes}>
                            <b>{visitor.dni}</b>
                            <span className={style.estadiaSummary__descuentos}>
                                Descuento: {visitor.discount === undefined ? '-' : visitor.discount.name} -
                                {visitor.discount === undefined ? '-' : visitor.discount.percent}
                            </span>
                        </div>
                       
                        <div className={style.estadiaSummary__price}>
                            {datosFechas.dateFromUnix === 0 ? null : 
                                <Input
                                title={''}
                                placeholder={''}
                                isFullWidth={true}
                                type='number'
                                useStateFunction={(value) => handlerChangePriceVisitor(index, value)}
                                value={visitorPrices[index]}
                                />
                            }
                        </div>
                    </div>
                )}

            <br></br>
            
            <div className={style.estadiaSummary__title2}>
                Total de la Estadía
                <b className={style.estadiaSummary__price}>
                    {datosFechas.dateFromUnix === 0 ? '$' : `$ ${amountStay}`}
                </b>
                </div>
            <div className={style.estadiaSummary__priceContainer}>
                <div className={style.estadiaSummary__payTypeContainer}>
                    <Dropdown
                        title='Seleccione uno'
                        options={paidType}
                        titleDropdown="Método de pago (*)"
                        selectedValueFunction={setPayType}
                        obligatory={true}
                    />
                </div>
            </div>

        </div>
    )
}

export default EstadiaSummary
