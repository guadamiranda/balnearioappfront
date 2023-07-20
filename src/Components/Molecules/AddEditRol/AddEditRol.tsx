import Button from "@/Components/Atoms/button/button";
import Input from "@/Components/Atoms/Input/input";
import rolServices from "@/Services/rolServices";
import ReactDOMServer from 'react-dom/server';
import style from "./addEditRol.module.scss";
import { ImPriceTag } from 'react-icons/im';
import { useState } from 'react'
import Swal from 'sweetalert2'

interface IAddEditRol {
    updateTable: any,
    closeFunction: any,
    fullElementToEdit?: any,
}

const AddEditRol: React.FC<IAddEditRol> = ({ fullElementToEdit, updateTable, closeFunction }) => {
    const [ newNameRol, setNewNameRol ] = useState(fullElementToEdit.name)

    const validateMissingData = () => {
        let allMissingData = []
        if(newNameRol === '') allMissingData.push('Nombre del Rol')
        return allMissingData
    }

    async function postRol() {
        const missingData = validateMissingData()
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)
        const newRol= {name: newNameRol}

        if (missingData.length === 0) {
            fullElementToEdit.id === '' ? (await rolServices.postRol(newRol)) : (await rolServices.editRol(fullElementToEdit.id, newRol))
            updateTable()
            Swal.fire({
                title: fullElementToEdit.id === '' ? "¡El nuevo rol fue creado!" : '¡El rol fue editado!',
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
                <Input icon={<ImPriceTag/>} value={newNameRol} placeholder="Nombre" title='Nombre del Rol' useStateFunction={setNewNameRol} isFullWidth={true}></Input>
                <br/>
            </div>
            <div className={style.addEditPriceContainer__buttonContainer}>
                <br/>
                <Button text={fullElementToEdit.id === '' ? "Crear Rol" : 'Editar Rol'} type='primary' onClickFunction={() => postRol()} isFullWidth={true}></Button>
            </div>
        </div>
    )
}

export default AddEditRol