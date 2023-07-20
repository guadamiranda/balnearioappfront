import Dropdown from "@/Components/Atoms/DropDown/Dropdown";
import Button from "@/Components/Atoms/button/button";
import Input from "@/Components/Atoms/Input/input";
import style from "./addEditEmployee.module.scss";
import rolServices from "@/Services/rolServices";
import ReactDOMServer from 'react-dom/server';
import { ImPriceTag } from 'react-icons/im';
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

interface IAddEditEmployee {
    updateTable?: any,
    closeFunction: any,
    fullElementToEdit?: any,
}

type IAllRoles = {
    id: string,
    name: string
}

const AddEditRol: React.FC<IAddEditEmployee> = ({ fullElementToEdit, updateTable, closeFunction }) => {
    const [ newNameEmployee, setNewNameEmployee ] = useState(fullElementToEdit.name)
    const [ newLastNameEmployee, setNewLastNameEmployee ] = useState(fullElementToEdit.lastname)
    const [ newDocumentNumberEmployee, setNewDocumentNumberEmployee ] = useState(fullElementToEdit.documentNumber)
    const [ newRoleEmployee, setNewRoleEmployee ] = useState(fullElementToEdit.role)
    const [ newMailEmployee, setNewMailEmployee ] = useState(fullElementToEdit.mail)
    const [ newPasswordEmployee, setNewPasswordEmployee ] = useState(fullElementToEdit.password)
    const [ allRoles, setAllRoles ] = useState<IAllRoles[]>([])


    const validateMissingData = () => {
        let allMissingData = []
        if(newNameEmployee === '') allMissingData.push('Nombre del Empleado')
        if(newLastNameEmployee === '') allMissingData.push('Apellido del Empleado')
        return allMissingData
    }

    async function postEmployee() {
        const missingData = validateMissingData()
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)
        const newEmployee= {name: newNameEmployee, lastName: newLastNameEmployee, role: newRoleEmployee}

        if (missingData.length === 0) {
            fullElementToEdit.id === '' ? (await rolServices.postRol(newEmployee)) : (await rolServices.editRol(fullElementToEdit.id, newEmployee))
            updateTable()
            Swal.fire({
                title: fullElementToEdit.id === '' ? "¡El nuevo empleado fue creado!" : '¡El empleado fue editado!',
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

    async function getRoles() {
        const getAllRoles = await rolServices.getRols()
        setAllRoles(getAllRoles)
    }

    const selectedValue = (rolName:string) => {
        const newRole = allRoles.find(rol => rol.name === rolName)
        setNewRoleEmployee(newRole)
    }

    useEffect(() => {
        getRoles()
    }, [])

    return(
        <div className={style.addEditPriceContainer}>
            <div className={style.addEditPriceContainer__inputContainer}>
                <Input icon={<ImPriceTag/>} value={newNameEmployee} placeholder="Nombre" title='Nombre del Empleado' useStateFunction={setNewNameEmployee} isFullWidth={true}></Input>
                <br/>
                <Input icon={<ImPriceTag/>} value={newLastNameEmployee} placeholder="Apellido" title='Apellido del Empleado' useStateFunction={setNewLastNameEmployee} isFullWidth={true}></Input>
                <br/>
                <Input icon={<ImPriceTag/>} value={newDocumentNumberEmployee} placeholder="Documento" title='Documento de Identidad' useStateFunction={setNewDocumentNumberEmployee} isFullWidth={true}></Input>
                <br/>
                <Dropdown title='Seleccione un Rol' options={allRoles} titleDropdown="Rol que ocupa el empleado" selectedValueFunction={selectedValue}/>
                <br/>
                <Input icon={<ImPriceTag/>} value={newMailEmployee} placeholder="E-mail" title='E-mail' useStateFunction={setNewMailEmployee} isFullWidth={true}></Input>
                <br/>
                <Input icon={<ImPriceTag/>} value={newPasswordEmployee} placeholder="Contraseña" title='Contraseña' type='password' useStateFunction={setNewPasswordEmployee} isFullWidth={true}></Input>
            </div>
            <div className={style.addEditPriceContainer__buttonContainer}>
                <br/>
                <Button text={fullElementToEdit.id === '' ? "Crear Empleado" : 'Editar Empleado'} type='primary' onClickFunction={() => postEmployee()} isFullWidth={true}></Button>
            </div>
        </div>
    )
}

export default AddEditRol