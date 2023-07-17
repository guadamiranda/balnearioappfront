import discountServices from "@/Services/discountServices";
import Button from "@/Components/Atoms/button/button";
import Input from "@/Components/Atoms/Input/input";
import style from "./addEditDiscount.module.scss";
import ReactDOMServer from 'react-dom/server'
import { ImPriceTag } from 'react-icons/im';
import { BiDollar } from 'react-icons/bi'
import { useState } from 'react'
import Swal from 'sweetalert2'

interface IAddEditDiscount {
    updateTable: any,
    closeFunction: any,
    fullElementToEdit?: any,
}

const AddEditDiscount: React.FC<IAddEditDiscount> = ({ fullElementToEdit, updateTable, closeFunction }) => {
    const [ newName, setNewName ] = useState(fullElementToEdit.name)
    const [ newPercentaje, setNewPercentaje ] = useState(fullElementToEdit.percentage)

    const validateMissingData = () => {
        let allMissingData = []
        if(newName === '') allMissingData.push('Nombre del Descuento')
        if(newPercentaje === '') allMissingData.push('Porcentaje')
        return allMissingData
    }

    async function postDiscount() {
        const missingData = validateMissingData()
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)
        const newDiscount= {name: newName, percentage: parseInt(newPercentaje)}

        if (missingData.length === 0) {
            fullElementToEdit.id === '' ? (await discountServices.postDiscount(newDiscount)) : (await discountServices.editDiscount(fullElementToEdit.id, newDiscount))
            updateTable()
            Swal.fire({
                title: fullElementToEdit.id === '' ? "¡El nuevo descuento fue creado!" : '¡El descuento fue editado!',
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
                <Input icon={<ImPriceTag/>} value={newName} placeholder="Nombre" title='Nombre del Descuento' useStateFunction={setNewName} isFullWidth={true}></Input>
                <br/>
                <Input icon={<BiDollar/>} value={newPercentaje} type='number' placeholder="Porcentaje" title='Porcentaje de Descuento' useStateFunction={setNewPercentaje} isFullWidth={true}></Input>
            </div>
            <div className={style.addEditPriceContainer__buttonContainer}>
                <Button text={fullElementToEdit.id === '' ? "Crear Descuento" : 'Editar Descuento'} type='primary' onClickFunction={() => postDiscount()} isFullWidth={true}></Button>
            </div>
        </div>
    )
}

export default AddEditDiscount