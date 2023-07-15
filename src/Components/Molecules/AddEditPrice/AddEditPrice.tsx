import Button from "@/Components/Atoms/button/button";
import priceServices from "@/Services/priceServices";
import Input from "@/Components/Atoms/Input/input";
import style from "./addEditPrice.module.scss";
import { ImPriceTag } from 'react-icons/im';
import { BiDollar } from 'react-icons/bi'
import { useState } from 'react'

interface IAddEditPrice {
    valueName?: string,
    valuePrice?: number,
    updateTable: any

}

const AddEditPrice: React.FC<IAddEditPrice> = ({ valueName, valuePrice, updateTable }) => {
    const [ newName, setNewName ] = useState('')
    const [ newAmount, setNewAmount ] = useState('')

    async function postPrice() {
        const newPrice= {name: newName, amount: parseInt(newAmount)}
        await priceServices.postPrice(newPrice)
        updateTable()
    }

    return(
        <div className={style.addEditPriceContainer}>
            <div className={style.addEditPriceContainer__inputContainer}>
                <Input icon={<ImPriceTag/>} placeholder="Nombre del precio" title='Nombre' useStateFunction={setNewName} isFullWidth={true}></Input>
                <br/>
                <Input icon={<BiDollar/>} type='number' placeholder="Precio" title='Precio' useStateFunction={setNewAmount} isFullWidth={true}></Input>
            </div>
            <div className={style.addEditPriceContainer__buttonContainer}>
                <Button text="Crear Precio" type='primary' onClickFunction={() => postPrice()} isFullWidth={true}></Button>
            </div>
        </div>
    )
}

export default AddEditPrice