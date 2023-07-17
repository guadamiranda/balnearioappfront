import Button from "@/Components/Atoms/button/button";
import priceServices from "@/Services/priceServices";
import Input from "@/Components/Atoms/Input/input";
import style from "./addEditPrice.module.scss";
import ReactDOMServer from 'react-dom/server'
import { ImPriceTag } from 'react-icons/im';
import { BiDollar } from 'react-icons/bi'
import { useState } from 'react'
import Swal from 'sweetalert2'

interface IAddEditPrice {
    valueName?: string,
    valuePrice?: string,
    updateTable: any,
    editIndexPrice?: string,
    closeFunction: any
}

const AddEditPrice: React.FC<IAddEditPrice> = ({ valueName, valuePrice, updateTable, editIndexPrice, closeFunction }) => {
    const [ newName, setNewName ] = useState(valueName)
    const [ newAmount, setNewAmount ] = useState<any>(valuePrice)

    const validateMissingData = () => {
        let allMissingData = []
        if(newName === '') allMissingData.push('Nombre del Precio')
        if(newAmount === '') allMissingData.push('Precio')
        return allMissingData
    }

    async function postPrice() {
        const missingData = validateMissingData()
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)
        const newPrice= {name: newName, amount: parseInt(newAmount)}
        if (missingData.length === 0) {
            valueName? (await priceServices.editPrice(editIndexPrice, newPrice)) : (await priceServices.postPrice(newPrice))
            updateTable()
            Swal.fire({
                title: valueName === '' ? "¡El nuevo precio fue creado!" : '¡El precio fue editado!',
                icon: 'success',
                confirmButtonText: 'Cerrar',
              }).then((result) => {
                if (result.isConfirmed) {
                    closeFunction(false)
                } 
              })
        } else {
            Swal.fire({
                title: 'Faltan rellenar datos',
                html: "Faltan los siguientes datos: " + missingDataFormatedInHTML,
                icon: 'error',
                confirmButtonText: 'Entendido'
              });
        } 
    }

    return(
        <div className={style.addEditPriceContainer}>
            <div className={style.addEditPriceContainer__inputContainer}>
                <Input icon={<ImPriceTag/>} value={newName} placeholder="Nombre del precio" title='Nombre' useStateFunction={setNewName} isFullWidth={true}></Input>
                <br/>
                <Input icon={<BiDollar/>} value={newAmount} type='number' placeholder="Precio" title='Precio' useStateFunction={setNewAmount} isFullWidth={true}></Input>
            </div>
            <div className={style.addEditPriceContainer__buttonContainer}>
                <Button text={valueName === '' ? "Crear Precio" : 'Editar Precio'} type='primary' onClickFunction={() => postPrice()} isFullWidth={true}></Button>
            </div>
        </div>
    )
}

export default AddEditPrice