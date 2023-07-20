'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditEmployee from "@/Components/Molecules/AddEditEmployee/AddEditEmployee";
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import style from './ABMEmployee.module.scss'
import { useEffect, useState } from "react";
//import employeeServices from '../../Services/employeeServices'
import Swal from 'sweetalert2'

type IRol = {
    id: number, 
    name: string
}

type IAllEmployeesData = {
    id: number,
    name: string,
    lastName: string,
    rol: IRol
}

const ABMDiscount = () => {
    const columns = ["Nombre", "Apellido", 'Rol']
    const [fullEmployeeToEdit, setFullEmployeeToEdit] = useState({ id: '', name: '', lastName: '', rol: {}})
    const [isLoading, setIsLoading] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [employeeData, setEmployeeData] = useState([{ name: '', lastName: '', rol: {} }]);
    const [employeeAllData, setEmployeesAllData] = useState<IAllEmployeesData[]>([])
    
    /*
    async function getEmployee() {
        //const allDiscounts = await discountServices.getDiscounts()
        const dataDiscountInTable = formatDiscountToTable(allDiscounts)

        setDiscountsAllData(allDiscounts)
        setEmployeeData(dataDiscountInTable)
    }
    */

    /*
    const formatDiscountToTable = (discount:any) => {
        const dataDiscountInTable = discount.map((discount:any) => ({
            name: discount.name,
            percentage: discount.percentage

        }))
        return dataDiscountInTable
    }
    */

    async function deleteElementFunction(index:number) {
        const elementToDelete = employeeAllData[index]
        const newEmployeesAllData = employeeAllData.filter((obj) => obj.id !== elementToDelete.id);
        //const dataEmployeeInTable = formatDiscountToTable(newEmployeesAllData)
        setEmployeesAllData(newEmployeesAllData)
        //setEmployeeData(dataEmployeeInTable)

        //await discountServices.deleteDiscount(elementToDelete.id)
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
        //setFullEmployeeToEdit({ id: '', name: '', lastName: '', rol: {}})
        setOpenModalCreate(true)
    }

    /*
    useEffect(() => {
        getDiscounts()
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])
    */

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
                <LittleABMTemplate title="Administración de Descuentos" subTitle="">
                    <div className={style.abmPriceContainer}>
                        <div className={style.abmPriceContainer__tableContainer}>
                            
                        </div>
                        <div className={style.abmPriceContainer__buttonContainer}>
                            <Button text="Crear nuevo Descuento" type='primary'  onClickFunction={() => openModalCreateFunction()} isFullWidth={true}></Button>
                        </div>
                    </div>
                </LittleABMTemplate>
                {openModalCreate && <ModalABMTemplate title='Crear Empleado' children={<AddEditEmployee fullElementToEdit={fullEmployeeToEdit} closeFunction={setOpenModalCreate}/>} closeFunction={setOpenModalCreate} ></ModalABMTemplate>}
                {openModalEdit && <ModalABMTemplate title='Editar Empleado' children={<AddEditEmployee fullElementToEdit={fullEmployeeToEdit} closeFunction={setOpenModalEdit}/>} closeFunction={setOpenModalEdit} ></ModalABMTemplate>}
            </>
        }  

        </>
    );
};

export default ABMDiscount;

/*
<Table 
                                columns={columns} 
                                tableData={discountsData} 
                                completeTableData={discountsAllData} 
                                openModalEditFunction={openModalEditFunction} 
                                setFullElement={setFullEmployeeToEdit}
                                deleteElementFunction={deleteElementFunction}/>
                                */

/*
{openModalCreate && <ModalABMTemplate title='Crear Empleado' children={<AddEditEmployee updateTable={getEmployee} fullElementToEdit={fullEmployeeToEdit} closeFunction={setOpenModalCreate}/>} closeFunction={setOpenModalCreate} ></ModalABMTemplate>}
                {openModalEdit && <ModalABMTemplate title='Editar Empleado' children={<AddEditEmployee updateTable={getEmployee} fullElementToEdit={fullEmployeeToEdit} closeFunction={setOpenModalEdit}/>} closeFunction={setOpenModalEdit} ></ModalABMTemplate>}
            </>
            */