'use client'

import ButtonAction from "@/Components/Atoms/ButtonAction/ButtonAction";
import AddResident from "../AddResident/AddResident";
import React, { useState, useEffect } from 'react';
import style from './addVisitors.module.scss';
import { VscAdd } from "react-icons/vsc";

type IVisitors = {
    dni: any,
    index: any
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
        setVisitors([ ...visitors, {dni: '', index}])
        setIndexVisitor(index)
    }

    const deleteComponent = (index: any) => {
        const visitorNotDeleted = visitors.filter((visitor) => visitor.index !== index);
        setVisitors(visitorNotDeleted)
    }

    const changeVisitorData = (index: any, dniNumber: any, braceletNumber: any, discount: any) => {
        const dayPriceOrCampingPrice = checkOneDay === false ? campingPrice : dayPrice
        const amountNights = numberOfDays <= 1 ? 1 : numberOfDays

        setVisitors(
            visitors.map((visitor) => {
            if(visitor.index === index){
                return { ...visitor, 
                         dni: dniNumber,
                         braceletNumber: braceletNumber,
                    discount: discount,
                    price: amountNights * (dayPriceOrCampingPrice - (dayPriceOrCampingPrice * (Object.keys(discount).length === 0 ? 1 : (discount.percent / 100))))
                }
            }

            return visitor;
            })
        )   
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
                        handleDNI={changeVisitorData}
                        visitorIndex={visitor.index}
                        amountNights={numberOfDays} />
                )}
            </div>          
        </div>
    )
}

export default AddVisitors
