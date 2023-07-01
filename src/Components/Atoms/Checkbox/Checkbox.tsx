import React from 'react'
import style from './checkbox.module.scss'
import { BsCheck } from 'react-icons/bs'

interface ICheckbox{
    title: string,
    isChecked: boolean,
    setIsChecked: any,
    setPrice?: any,
    price: number,
    totalPrice: number,
    setDNIorPartnerNumberDefault?: any
}

const Checkbox: React.FC<ICheckbox> = ({title, isChecked, setIsChecked, setPrice, price, totalPrice, setDNIorPartnerNumberDefault}) => {
    const classNameNormal = `${style.containerCheckbox__designCheckbox}`
    const classNameChecked = `${style.containerCheckbox__designCheckboxChecked}`

    const setPriceAndChecked = () => { 
        const newIsChecked = !isChecked
        
        console.log(totalPrice)
        console.log(price)
        console.log(newIsChecked)
        setPrice(newIsChecked? (totalPrice === 0 ? 0 : (totalPrice - price)) : (totalPrice + price))
        setIsChecked(newIsChecked)
        setDNIorPartnerNumberDefault? setDNIorPartnerNumberDefault('') : null
    }

    return(
        <div className={style.containerCheckbox}>
            <div onClick={() => setPriceAndChecked()} className={isChecked? classNameChecked : classNameNormal}>{isChecked? <BsCheck/> : ""}</div>
            <span className={style.containerCheckbox__titleCheckbox}>{title}</span>
        </div>
    )
}

export default Checkbox