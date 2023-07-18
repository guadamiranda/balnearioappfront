'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditDiscount from "@/Components/Molecules/AddEditDiscount/AddEditDiscount";
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import style from './ABMDiscounts.module.scss'
import { useEffect, useState } from "react";
import discountServices from '../../Services/discountServices'
import Swal from 'sweetalert2'


type IAllDiscounts = {
    id: number,
    name: string,
    amount: number
}

const ABMDiscount = () => {
    const columns = ["Nombre", "Descuento"]
    const [fullDiscountToEdit, setFullDiscountToEdit] = useState({ id: '', name: '', percentage: ''})
    const [isLoading, setIsLoading] = useState(true)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [discountsData, setDiscountsData] = useState([{ name: '', percentage: 0 }]);
    const [discountsAllData, setDiscountsAllData] = useState<IAllDiscounts[]>([])
    
    async function getDiscounts() {
        const allDiscounts = await discountServices.getDiscounts()
        const dataDiscountInTable = formatDiscountToTable(allDiscounts)

        setDiscountsAllData(allDiscounts)
        setDiscountsData(dataDiscountInTable)
    }

    const formatDiscountToTable = (discount:any) => {
        const dataDiscountInTable = discount.map((discount:any) => ({
            name: discount.name,
            percentage: discount.percentage

        }))
        return dataDiscountInTable
    }

    async function deleteElementFunction(index:number) {
        const elementToDelete = discountsAllData[index]
        const newDiscountsAllData = discountsAllData.filter((obj) => obj.id !== elementToDelete.id);
        const dataPricesInTable = formatDiscountToTable(newDiscountsAllData)
        setDiscountsAllData(newDiscountsAllData)
        setDiscountsData(dataPricesInTable)

        await discountServices.deleteDiscount(elementToDelete.id)
        Swal.fire({
            title: 'El Descuento ha sido eliminado',
            icon: 'success',
            confirmButtonText: 'Cerrar',
          })
    } 

    const openModalEditFunction = () => {
        setOpenModalEdit(true)
    }

    const openModalCreateFunction = () => {
        setFullDiscountToEdit({ id: '', name: '', percentage: ''})
        setOpenModalCreate(true)
    }

    
    useEffect(() => {
        getDiscounts()
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
                <LittleABMTemplate title="Administración de Descuentos" subTitle="">
                    <div className={style.abmPriceContainer}>
                        <div className={style.abmPriceContainer__tableContainer}>
                            <Table 
                                columns={columns} 
                                tableData={discountsData} 
                                completeTableData={discountsAllData} 
                                openModalEditFunction={openModalEditFunction} 
                                setFullElement={setFullDiscountToEdit}
                                deleteElementFunction={deleteElementFunction}/>
                        </div>
                        <div className={style.abmPriceContainer__buttonContainer}>
                            <Button text="Crear nuevo Descuento" type='primary'  onClickFunction={() => openModalCreateFunction()} isFullWidth={true}></Button>
                        </div>
                    </div>
                </LittleABMTemplate>
                {openModalCreate && <ModalABMTemplate title='Crear Descuento' children={<AddEditDiscount updateTable={getDiscounts} fullElementToEdit={fullDiscountToEdit} closeFunction={setOpenModalCreate}/>} closeFunction={setOpenModalCreate} ></ModalABMTemplate>}
                {openModalEdit && <ModalABMTemplate title='Editar Descuento' children={<AddEditDiscount updateTable={getDiscounts} fullElementToEdit={fullDiscountToEdit} closeFunction={setOpenModalEdit}/>} closeFunction={setOpenModalEdit} ></ModalABMTemplate>}
            </>
        }  

        </>
    );
};

export default ABMDiscount;
