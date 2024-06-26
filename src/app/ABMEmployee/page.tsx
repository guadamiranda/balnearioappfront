'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditEmployee from "@/Components/Molecules/AddEditEmployee/AddEditEmployee";
import employeeServices from '../../Services/employeeServices';
import Loader from "@/Components/Organism/loaderScreen/loader";
import sessionServices from "@/Services/sessionServices";
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import AlertServices from "@/utils/AlertServices";
import rolServices from "@/Services/rolServices";
import style from './ABMEmployee.module.scss';
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";


type IAllEmployeesData = {
    id: number,
    firstName: string,
    lastName: string,
    dni: string,
    email: string,
    password: string,
    roleId: string,
    isDismissal: boolean
}

const ABMEmployee= () => {
    const columns = ['Nombre', 'Apellido', 'DNI', 'Rol']

    const [fullEmployeeToEdit, setFullEmployeeToEdit] = useState({ id: '', firstName: '', lastName: '', dni: '', email: '', password: '', roleId: '', isDismissal: false })
    const [employeeData, setEmployeeData] = useState([{ firstName: '', lastName: '', dni: '', rolName: ''}])
    const [employeeAllData, setEmployeesAllData] = useState<IAllEmployeesData[]>([])
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [allRoles, setAllRoles] = useState([])
    
    async function getEmployeeRolData() {
        const allEmployeesData = await employeeServices.getEmployee()
        const allRolesData = await rolServices.getRole()
        const tableEmployeeData = formatEmployeeToTable(allEmployeesData, allRolesData)
        setData(allEmployeesData, allRolesData, tableEmployeeData)
    }

    const formatEmployeeToTable = (allEmployeesData: any, allRolesData:any) => {
        const dataEmployeeInTable = allEmployeesData.map((employee:any) => ({
            firstName: employee.firstName,
            lastName: employee.lastName,
            dni: employee.dni,
            rol_name: allRolesData.find((rol:any) => rol.id === employee.roleId)?.name || ''
        }))

        return dataEmployeeInTable
    }

    const setData = (allEmployeesData: any, allRolesData: any, tableEmployeeData:any) => {
        setEmployeesAllData(allEmployeesData)
        setEmployeeData(tableEmployeeData)
        setAllRoles(allRolesData)
    }

    const openModalEditFunction = () => {
        setOpenModalEdit(true)
        /*
        if(sessionServices.isAdmin()) {
            setOpenModalEdit(true)
            return;
        }
        AlertServices.renderAlertPermission();
        */
    }

    const openModalCreateFunction = () => {
        setFullEmployeeToEdit({ id: '', firstName: '', lastName: '', dni: '', email: '', password: '', roleId: '', isDismissal: false })
        setOpenModalCreate(true)


        /*
        if(sessionServices.isAdmin()) {
            setFullEmployeeToEdit({ id: '', firstName: '', lastName: '', dni: '', email: '', password: '', roleId: '' })
            setOpenModalCreate(true)
            return
        }
        AlertServices.renderAlertPermission();
        */
    }

    async function deleteElementFunction(index:number) {
        const elementToDelete = employeeAllData[index]

        const newEmployeeAllData = employeeAllData.filter((obj) => obj.dni !== elementToDelete.dni);
        const dataEmployeeInTable = formatEmployeeToTable(newEmployeeAllData, allRoles)

        setEmployeesAllData(newEmployeeAllData)
        setEmployeeData(dataEmployeeInTable)

        const dnis = { dnis: [elementToDelete.dni] }

        await employeeServices.deleteEmployee(dnis)
        AlertServices.renderAlert(
            'El empleado ha sido eliminado',
            '',
            'success'
        )
        return

        /*
        if(sessionServices.isAdmin()) {
            const elementToDelete = employeeAllData[index]
            const newEmployeeAllData = employeeAllData.filter((obj) => obj.id !== elementToDelete.id);
            const dataEmployeeInTable = formatEmployeeToTable(newEmployeeAllData, allRoles)
    
            setEmployeesAllData(newEmployeeAllData)
            setEmployeeData(dataEmployeeInTable)
    
            await employeeServices.deleteEmployee(elementToDelete.id)
            AlertServices.renderAlert(
                'El empleado ha sido eliminado',
                '',
                'success'
            )
            return
        }
        AlertServices.renderAlertPermission();
        */
    } 

    useEffect(() => {
        getEmployeeRolData()
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    return (
        <>
        {
            isLoading? <Loader/> :
            <>
            <LittleABMTemplate title="Administración de Empleados" subTitle="Crea y edita empleados" icon={<FaUsers />}>
                <div className={style.abmPriceContainer}>
                    <div className={style.abmPriceContainer__tableContainer}>
                        <Table 
                                columns={columns} 
                                tableData={employeeData} 
                                completeTableData={employeeAllData} 
                                openModalEditFunction={openModalEditFunction} 
                                setFullElement={setFullEmployeeToEdit}
                                deleteElementFunction={deleteElementFunction}/>
                    </div>
                    <div className={style.abmPriceContainer__buttonContainer}>
                        <Button text="Crear nuevo Empleado" type='primary'  onClickFunction={() => openModalCreateFunction()} isFullWidth={true}></Button>
                    </div>
                </div>
            </LittleABMTemplate>

            {openModalCreate && 
            <ModalABMTemplate 
            title='Crear Empleado' 
            children={
            <AddEditEmployee 
                updateTable={getEmployeeRolData} 
                fullElementToEdit={fullEmployeeToEdit} 
                closeFunction={setOpenModalCreate}/>} 
                closeFunction={setOpenModalCreate}
            ></ModalABMTemplate>}
            
            {openModalEdit && 
            <ModalABMTemplate 
            title='Editar Rol' 
            children={
            <AddEditEmployee 
                updateTable={getEmployeeRolData} 
                fullElementToEdit={fullEmployeeToEdit} 
                closeFunction={setOpenModalEdit}/>} 
                closeFunction={setOpenModalEdit} 
            ></ModalABMTemplate>}

            </>
        }  
        </>
    );
};

export default ABMEmployee;


