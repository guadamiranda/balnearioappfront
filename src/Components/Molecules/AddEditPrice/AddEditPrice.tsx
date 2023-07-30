import Button from "@/Components/Atoms/button/button";
import priceServices from "@/Services/priceServices";
import Input from "@/Components/Atoms/Input/input";
import style from "./addEditPrice.module.scss";
import ReactDOMServer from 'react-dom/server'
import { ImPriceTag } from 'react-icons/im';
import { BiDollar } from 'react-icons/bi'
import { useState } from 'react'
import Swal from 'sweetalert2'

type iFullElementToEdit = {
    id: string,
    name: string,
    amount: any
}

interface IAddEditPrice {
    updateTable: () => void,
    closeFunction: (isColse:boolean) => void,
    fullElementToEdit: iFullElementToEdit,
}

const AddEditPrice: React.FC<IAddEditPrice> = ({ fullElementToEdit, updateTable, closeFunction }) => {
    const [ newName, setNewName ] = useState(fullElementToEdit.name)
    const [ newAmount, setNewAmount ] = useState(fullElementToEdit.amount)

    const validateMissingData = () => {
        let allMissingData = []
        if(newAmount === '') allMissingData.push('Precio')
        return allMissingData
    }

    async function postPrice() {
        const missingData = validateMissingData()
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)
        const newPrice= {name: newName, amount: parseInt(newAmount)}

        if (missingData.length === 0) {
            fullElementToEdit.id === '' ? (await priceServices.postPrice(newPrice)) : (await priceServices.editPrice(fullElementToEdit.id, newPrice)) 
            updateTable()
            Swal.fire({
                title: fullElementToEdit.id === '' ? "¡El nuevo precio fue creado!" : '¡El precio fue editado!',
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
                <Input icon={<BiDollar/>} value={newAmount} type='number' placeholder="Precio" title='Precio' useStateFunction={setNewAmount} isFullWidth={true}></Input>
            </div>
            <div className={style.addEditPriceContainer__buttonContainer}>
                <br/>
                <Button text={fullElementToEdit.id === '' ? "Crear Precio" : 'Editar Precio'} type='primary' onClickFunction={() => postPrice()} isFullWidth={true}></Button>
            </div>
        </div>
    )
}

export default AddEditPrice

/*
<Input icon={<ImPriceTag/>} value={newName} placeholder="Nombre del precio" title='Nombre' useStateFunction={setNewName} isFullWidth={true}></Input>
*/