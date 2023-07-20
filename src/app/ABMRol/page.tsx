'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditRol from "@/Components/Molecules/AddEditRol/AddEditRol";
import Button from "@/Components/Atoms/button/button";
import rolServices from '../../Services/rolServices';
import Table from "@/Components/Atoms/Table/Table";
import { useEffect, useState } from "react";
import style from './ABMRol.module.scss'
import Swal from 'sweetalert2'

type IAllRol = {
    id: number,
    name: string,
}

const ABMPrice = () => {
    const columns = ["Nombre"]

    const [fullRolToEdit, setFullRolToEdit] = useState({ id: '', name: ''})
    const [rolAllData, setRolAllData] = useState<IAllRol[]>([])
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [rolData, setRolData] = useState([{ name: ''}]);
    const [isLoading, setIsLoading] = useState(true)
    

    async function getRols() {
        const allRols = await rolServices.getRols()
        const dataRolInTable = formatRolToTable(allRols)

        setRolAllData(allRols)
        setRolData(dataRolInTable)
    }

    const formatRolToTable = (rols:Array<IAllRol>) => {
        const dataRolInTable = rols.map((rol) => ({
            name: rol.name,
        }))

        return dataRolInTable
    }

    const openModalEditFunction = () => {
        setOpenModalEdit(true)
    }

    const openModalCreateFunction = () => {
        setFullRolToEdit({ id: '', name: ''})
        setOpenModalCreate(true)
    }

    async function deleteElementFunction(index:number) {
        const elementToDelete = rolAllData[index]
        const newRolsAllData = rolAllData.filter((obj) => obj.id !== elementToDelete.id);
        const dataRolInTable = formatRolToTable(newRolsAllData)

        setRolAllData(newRolsAllData)
        setRolData(dataRolInTable)

        await rolServices.deleteRol(elementToDelete.id)

        Swal.fire({
            title: 'El Rol ha sido eliminado',
            icon: 'success',
            confirmButtonText: 'Cerrar',
          })
    } 
    
    useEffect(() => {
        getRols()
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
                <LittleABMTemplate title="Administración de Roles" subTitle="">
                    <div className={style.abmPriceContainer}>
                        <div className={style.abmPriceContainer__tableContainer}>
                            <Table 
                                columns={columns} 
                                tableData={rolData} 
                                completeTableData={rolAllData} 
                                openModalEditFunction={openModalEditFunction} 
                                setFullElement={setFullRolToEdit}
                                deleteElementFunction={deleteElementFunction}/>
                        </div>
                        <div className={style.abmPriceContainer__buttonContainer}>
                            <Button text="Crear nuevo Rol" type='primary'  onClickFunction={() => openModalCreateFunction()} isFullWidth={true}></Button>
                        </div>
                    </div>
                </LittleABMTemplate>
                {openModalCreate && <ModalABMTemplate title='Crear Rol' children={<AddEditRol updateTable={getRols} fullElementToEdit={fullRolToEdit} closeFunction={setOpenModalCreate}/>} closeFunction={setOpenModalCreate} ></ModalABMTemplate>}
                {openModalEdit && <ModalABMTemplate title='Editar Rol' children={<AddEditRol updateTable={getRols} fullElementToEdit={fullRolToEdit} closeFunction={setOpenModalEdit}/>} closeFunction={setOpenModalEdit} ></ModalABMTemplate>}
            </>
        }  
        </>
    );
};

export default ABMPrice;
