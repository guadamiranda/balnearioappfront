'use client'

import { AiOutlineSchedule, AiOutlineUser  } from "react-icons/ai";
import { MdOutlineSummarize } from "react-icons/md";
import style from './multiStepOrder.module.scss';
import { RiGroupLine } from "react-icons/ri";
import React from 'react'

interface IMultiStepOrder {
    numberStep: number,
}

const MultiStepOrder : React.FC<IMultiStepOrder> = ({numberStep}) => {
    const steps = [
        {name: 'Responsable', icon: <AiOutlineUser />, number: 0 },
        {name: 'Visitantes', icon: <RiGroupLine />, number: 1},
        {name: 'Datos de Estadía', icon: <AiOutlineSchedule />, number: 2},
        {name: 'Resumen', icon: <MdOutlineSummarize />, number: 3}]
    
    const colorIcon = (step:any) => {
        let styleIcon = ''
        step <= numberStep ? styleIcon = style.multiStepOrder__color : styleIcon = style.multiStepOrder__colorWhite

        return styleIcon
    }

    return(
        <div className={style.multiStepOrder}>
            <div className={style.multiStepOrder__line}></div>
            
            <div className={style.multiStepOrder__optionsContainer}>
                {steps.map((step) => 
                    <div className={style.multiStepOrder__option}>
                        <div className={style.multiStepOrder__circules}>
                            <div className={colorIcon(step.number)}> {step.icon} </div>
                        </div>
                        <div className={style.multiStepOrder__title}>{step.number === numberStep ? <b>{step.name}</b> : step.name}</div>                
                    </div>
                )}
            </div>
        </div>
    )
}

export default MultiStepOrder
