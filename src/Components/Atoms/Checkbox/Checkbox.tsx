import React, { useEffect, useState } from 'react'
import style from './checkbox.module.scss'
import { BsCheck } from 'react-icons/bs'

interface ICheckbox{
    cleanDataFlag: boolean,
    title: string,
    onClickFunction: () => void
}

const Checkbox: React.FC<ICheckbox> = ({cleanDataFlag, title, onClickFunction}) => {
    const [isChecked, setIsChecked] = useState<Boolean>(false)
    const classNameNormal = `${style.containerCheckbox__designCheckbox}`
    const classNameChecked = `${style.containerCheckbox__designCheckboxChecked}`

    const checkedAction = () => {
        setIsChecked(!isChecked)
        onClickFunction()
    }

    useEffect(() => {
        setIsChecked(false)
    }, [cleanDataFlag])

    return(
        <div className={style.containerCheckbox}>
            <div onClick={() => checkedAction()} className={isChecked? classNameChecked : classNameNormal}>{isChecked? <BsCheck/> : ""}</div>
            <span className={style.containerCheckbox__titleCheckbox}>{title}</span>
        </div>
    )
}

export default Checkbox