import Dropdown from "@/Components/Atoms/DropDown/Dropdown";
import employeeServices from "@/Services/employeeServices";
import Button from "@/Components/Atoms/button/button";
import Input from "@/Components/Atoms/Input/input";
import style from "./addEditEmployee.module.scss";
import rolServices from "@/Services/rolServices";
import ReactDOMServer from 'react-dom/server';
import { ImPriceTag } from 'react-icons/im';
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

type iFullElementToEdit = {
    id: string,
    firstName: string,
    lastName: string,
    dni: string,
    email: string,
    password: string,
    roleId: any
}
interface IAddEditEmployee {
    updateTable: () => void,
    closeFunction: (isColse:boolean) => void,
    fullElementToEdit: iFullElementToEdit,
}

type IAllRoles = {
    id: string,
    name: string,
    privileges: string
}

const AddEditRol: React.FC<IAddEditEmployee> = ({ fullElementToEdit, updateTable, closeFunction }) => {
    const [ newNameEmployee, setNewNameEmployee ] = useState(fullElementToEdit.firstName)
    const [ newLastNameEmployee, setNewLastNameEmployee ] = useState(fullElementToEdit.lastName)
    const [ newDocumentNumberEmployee, setNewDocumentNumberEmployee ] = useState(fullElementToEdit.dni)
    const [ newRoleEmployee, setNewRoleEmployee ] = useState('')
    const [ newMailEmployee, setNewMailEmployee ] = useState(fullElementToEdit.email)
    const [ newPasswordEmployee, setNewPasswordEmployee ] = useState(fullElementToEdit.password)
    const [allRoles, setAllRoles] = useState<IAllRoles[]>([{ id: '', name: '', privileges: '' }])

    const validateMissingData = () => {
        let allMissingData = []
        if (newNameEmployee === '') allMissingData.push('Nombre')
        if (newLastNameEmployee === '') allMissingData.push('Apellido')
        if (newDocumentNumberEmployee === '') allMissingData.push('DNI')
        if (newRoleEmployee === '') allMissingData.push('Rol')
        if (newPasswordEmployee === '') allMissingData.push('Contraseña')
        return allMissingData
    }

    async function postEmployee() {
        const missingData = validateMissingData()
        const missingDataFormatedInHTML = ReactDOMServer.renderToString(<ul>{missingData.map((data, index) => (<li key={index}>{data}</li>))}</ul>)

        if (missingData.length === 0) {
            const newEmployee = {
                firstName: newNameEmployee, 
                lastName: newLastNameEmployee, 
                dni: newDocumentNumberEmployee, 
                email: newMailEmployee ? newMailEmployee : null,
                password: newPasswordEmployee,
                roleId: newRoleEmployee}

            fullElementToEdit.id === '' ? (await employeeServices.postEmployee(newEmployee)) : (await employeeServices.editEmployee(newEmployee))
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

    async function getAllRoles() {
        const getAllRoles = await rolServices.getRole()
        setAllRoles(getAllRoles)
    }

    const selectedValue = (rolName:string) => {
        const newRole = allRoles.find(rol => rol.name === rolName) || {id: 'a40f006f-6a8f-4808-aa80-08f9555e71cd', name: 'Empleado'}
        setNewRoleEmployee(newRole.id)
    }

    useEffect(() => {
        getAllRoles()
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
                <Dropdown title='Seleccione un Rol' options={allRoles} titleDropdown="Rol que ocupa el empleado" selectedValueFunction={selectedValue} />
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