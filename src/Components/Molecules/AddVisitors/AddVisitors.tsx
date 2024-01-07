'use client'

import ButtonAction from "@/Components/Atoms/ButtonAction/ButtonAction";
import AddResident from "../AddResident/AddResident";
import React, { useState, useEffect } from 'react';
import style from './addVisitors.module.scss';
import { VscAdd } from "react-icons/vsc";

type IVisitors = {
    dni: any,
    braceletNumber: any,
    memberNumber: any,
    discount: any,
    price: any,
    index: any,
}

interface IAddVisitors {
    setAllVisitors: any,
    checkOneDay: boolean,
    campingPrice: number,
    dayPrice: number,
    numberOfDays: number
}

const AddVisitors: React.FC<IAddVisitors> = ({ setAllVisitors, checkOneDay, campingPrice, dayPrice, numberOfDays }) => {
    const [visitors, setVisitors] = useState<IVisitors[]>([]);
    const [indexVisitor, setIndexVisitor] = useState(0)

    const setNewVisitor = () => {
        const index = indexVisitor + 1
        setVisitors([ ...visitors, {dni: '', index, braceletNumber: '', price: 0, discount: 0, memberNumber: ''} ])
        setIndexVisitor(index)
    }

    const deleteComponent = (index: any) => {
        const visitorNotDeleted = visitors.filter((visitor) => visitor.index !== index);
        setVisitors(visitorNotDeleted)
    }

    // TODO: Mockeo de las consideraciones de la estadia por la cantidad de dias
    const calculatePrice = (isMember: boolean) => {
        const oneDay = isMember? 0 : dayPrice
        const priceZeroToTree = isMember? 4000 : campingPrice
        const priceFourDaysToTen = isMember? 3500 : 7000
        const priceTenDaysOrMore = isMember? 3000 : 6000

        if(checkOneDay) return oneDay
        if(numberOfDays >= 1 && numberOfDays < 4) return priceZeroToTree
        if(numberOfDays >= 4 && numberOfDays < 10) return priceFourDaysToTen
        if(numberOfDays >= 10) return priceTenDaysOrMore
        return 0
    }
    // --------------------------------------------------------

    const changeVisitorData = (index: any, dniNumber: any, braceletNumber: any, discount: any, memberNumber: string) => {
        //const dayPriceOrCampingPrice = checkOneDay === false ? campingPrice : dayPrice
        const isMember = memberNumber? true : false
        const dayPriceOrCampingPrice = calculatePrice(isMember)
        const amountNights = numberOfDays <= 1 ? 1 : numberOfDays

        const priceWithDiscount = amountNights * (dayPriceOrCampingPrice - (dayPriceOrCampingPrice * (discount.percent / 100)))
        const priceWithoutDiscount = amountNights * dayPriceOrCampingPrice

        const newVisitorsList = visitors.map((visitor) => {
            if(visitor.index === index) {
                visitor.dni = dniNumber
                visitor.braceletNumber = braceletNumber
                visitor.memberNumber = memberNumber
                visitor.discount = discount
                visitor.price = Object.keys(discount).length === 0 ? priceWithoutDiscount : priceWithDiscount
            }

            return visitor
        })

        setVisitors(newVisitorsList)
    }

    useEffect(() => {
        setAllVisitors(visitors)
    }, [visitors])

    return(
        <div className={style.addVisitors}>
            <div className={style.addVisitors__title}>Datos de los Visitantes</div>
            <div className={style.addVisitors__addVisitor}>
                <ButtonAction title='Visitante' icon={<VscAdd/>} onClickFunction={() => setNewVisitor()}/>
            </div>
            
            <div className={style.addVisitors__visitorList}>
                {visitors.map((visitor) => 
                    <AddResident
                        key={visitor.index}
                        deleteVisitor={deleteComponent} 
                        handleResidentData={changeVisitorData}
                        visitorIndex={visitor.index}
                        amountNights={numberOfDays}
                        checkOneDay={checkOneDay} />
                )}
            </div>          
        </div>
    )
}

export default AddVisitors
