'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditEmployee from "@/Components/Molecules/AddEditEmployee/AddEditEmployee";
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import style from './ABMEmployee.module.scss'
import { useEffect, useState } from "react";
import employeeServices from '../../Services/employeeServices'
import Swal from 'sweetalert2'

type IRol = {
    id: number, 
    name: string
}

type IAllEmployeesData = {
    id: number,
    name: string,
    lastName: string,
    documentNumber: string,
    email: string,
    password: string,
    rol: IRol
}

const ABMEmployee= () => {
    const columns = ['Nombre', 'Apellido', 'Documento', 'Rol']

    const [fullEmployeeToEdit, setFullEmployeeToEdit] = useState({ id: 0, name: '', lastName: '', documentNumber: '', email: '', password: '', rol: { id: 0, name: '' } })
    const [employeeAllData, setEmployeesAllData] = useState<IAllEmployeesData[]>([])
    const [employeeData, setEmployeeData] = useState([{ name: '', lastName: '', documentNumber: '', rol: {name: '' } }])
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    async function getEmployees() {
        const allEmployees = await employeeServices.getEmployee()
        console.log(allEmployees)
        const dataEmployeeInTable = formatEmployeeToTable(allEmployees)

        setEmployeesAllData(allEmployees)
        setEmployeeData(dataEmployeeInTable)
    }

    const formatEmployeeToTable = (employees:Array<IAllEmployeesData>) => {
        const dataEmployeeInTable = employees.map((employee) => ({
            name: employee.name,
            lastName: employee.lastName,
            documentNumber: employee.documentNumber,
            rol:{name: employee.rol.name} 
        }))
        return dataEmployeeInTable
    }

    async function deleteElementFunction(index:number) {
        const elementToDelete = employeeAllData[index]
        const newEmployeesAllData = employeeAllData.filter((obj) => obj.id !== elementToDelete.id);
        const dataEmployeeInTable = formatEmployeeToTable(newEmployeesAllData)

        setEmployeesAllData(newEmployeesAllData)
        setEmployeeData(dataEmployeeInTable)

        await employeeServices.deleteEmployee(elementToDelete.id)
        Swal.fire({
            title: 'El Empleado ha sido eliminado',
            icon: 'success',
            confirmButtonText: 'Cerrar',
          })
    } 

    const openModalEditFunction = () => {
        setOpenModalEdit(true)
    }

    const openModalCreateFunction = () => {
        //setFullEmployeeToEdit({ name: '', lastName: '', documentNumber: '', email: '', password: '' })
        setOpenModalCreate(true)
    }

    useEffect(() => {
        getEmployees()
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
                {openModalCreate && <ModalABMTemplate title='Crear Empleado' children={<AddEditEmployee updateTable={getEmployees} fullElementToEdit={fullEmployeeToEdit} closeFunction={setOpenModalCreate}/>} closeFunction={setOpenModalCreate} ></ModalABMTemplate>}
                {openModalEdit && <ModalABMTemplate title='Editar Empleado' children={<AddEditEmployee updateTable={getEmployees} fullElementToEdit={fullEmployeeToEdit} closeFunction={setOpenModalEdit}/>} closeFunction={setOpenModalEdit} ></ModalABMTemplate>}
            </>
        }  
        </>
    );
};

export default ABMEmployee;

/*
<Table 
                                columns={columns} 
                                tableData={employeeData} 
                                completeTableData={employeeAllData} 
                                openModalEditFunction={openModalEditFunction} 
                                setFullElement={setFullEmployeeToEdit}
                                deleteElementFunction={deleteElementFunction}
                            />
                            */