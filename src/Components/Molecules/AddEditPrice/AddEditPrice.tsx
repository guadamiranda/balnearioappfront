import Button from "@/Components/Atoms/button/button";
import priceServices from "@/Services/priceServices";
import Input from "@/Components/Atoms/Input/input";
import style from "./addEditPrice.module.scss";
import { ImPriceTag } from 'react-icons/im';
import { BiDollar } from 'react-icons/bi'
import { useEffect, useState } from 'react'

interface IAddEditPrice {
    valueName?: string,
    valuePrice?: string,
    updateTable: any,
    editIndexPrice?: string
}

const AddEditPrice: React.FC<IAddEditPrice> = ({ valueName, valuePrice, updateTable, editIndexPrice }) => {
    const [ newName, setNewName ] = useState(valueName)
    const [ newAmount, setNewAmount ] = useState<any>(valuePrice)
    console.log(valuePrice)

    async function postPrice() {
        const newPrice= {name: newName, amount: parseInt(newAmount)}
        valueName? (await priceServices.editPrice(editIndexPrice, newPrice)) : (await priceServices.postPrice(newPrice))
        updateTable()
    }

    return(
        <div className={style.addEditPriceContainer}>
            <div className={style.addEditPriceContainer__inputContainer}>
                <Input icon={<ImPriceTag/>} value={newName} placeholder="Nombre del precio" title='Nombre' useStateFunction={setNewName} isFullWidth={true}></Input>
                <br/>
                <Input icon={<BiDollar/>} value={valuePrice} type='number' placeholder="Precio" title='Precio' useStateFunction={setNewAmount} isFullWidth={true}></Input>
            </div>
            <div className={style.addEditPriceContainer__buttonContainer}>
                <Button text={valueName === '' ? "Crear Precio" : 'Editar Precio'} type='primary' onClickFunction={() => postPrice()} isFullWidth={true}></Button>
            </div>
        </div>
    )
}

export default AddEditPrice