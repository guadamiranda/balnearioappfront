'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditEmployee from "@/Components/Molecules/AddEditEmployee/AddEditEmployee";
import employeeServices from '../../Services/employeeServices';
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import rolServices from "@/Services/rolServices";
import style from './ABMEmployee.module.scss';
import { useEffect, useState } from "react";

import Swal from 'sweetalert2'

type IAllEmployeesData = {
    id: number,
    first_name: string,
    last_name: string,
    dni: string,
    email: string,
    password: string,
    rol_type_id: string
}

const ABMEmployee= () => {
    const columns = ['Nombre', 'Apellido', 'DNI', 'Rol']

    const [fullEmployeeToEdit, setFullEmployeeToEdit] = useState({ id: '', first_name: '', last_name: '', dni: '', email: '', password: '', rol_type_id: ''})
    const [employeeAllData, setEmployeesAllData] = useState<IAllEmployeesData[]>([])
    const [employeeData, setEmployeeData] = useState([{ first_name: '', last_name: '', dni: '', rol_name: ''}])
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [allRoles, setAllRoles] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    async function getEmployeeRolData() {
        const allEmployeesData = await employeeServices.getEmployee()
        const allRolesData = await rolServices.getRols()
        const tableEmployeeData = formatEmployeeToTable(allEmployeesData, allRolesData)
        setData(allEmployeesData, allRolesData, tableEmployeeData)

        console.log(allEmployeesData)
    }

    const formatEmployeeToTable = (allEmployeesData: any, allRolesData:any) => {
        const dataEmployeeInTable = allEmployeesData.map((employee:any) => ({
            first_name: employee.first_name,
            last_name: employee.last_name,
            dni: employee.dni,
            rol_name: allRolesData.find((rol:any) => rol.id === employee.rol_type_id)?.name || ''
        }))

        return dataEmployeeInTable
    }

    const setData = (allEmployeesData: any, allRolesData: any, tableEmployeeData:any) => {
        setEmployeesAllData(allEmployeesData)
        setEmployeeData(tableEmployeeData)
        setAllRoles(allRolesData)
    }

    const openModalCreateFunction = () => {
        setFullEmployeeToEdit({ id: '', first_name: '', last_name: '', dni: '', email: '', password: '', rol_type_id: '' })
        setOpenModalCreate(true)
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
            isLoading? 

            <div className={style.abmPriceContainer}>
                <div className={style.abmPriceContainer__loaderContainer}>
                    <div className={style.abmPriceContainer__loader}></div>
                </div>
            </div> :
            
            <>
            <LittleABMTemplate title="Administración de Empleados" subTitle="">
                <div className={style.abmPriceContainer}>
                    <div className={style.abmPriceContainer__tableContainer}>
                            
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
            
            </>
        }  
        </>
    );
};

export default ABMEmployee;

