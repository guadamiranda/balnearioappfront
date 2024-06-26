'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditDiscount from "@/Components/Molecules/AddEditDiscount/AddEditDiscount";
import Loader from "@/Components/Organism/loaderScreen/loader";
import discountServices from '../../Services/discountServices';
import sessionServices from "@/Services/sessionServices";
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import AlertServices from "@/utils/AlertServices";
import style from './ABMDiscounts.module.scss';
import { FaPercentage } from "react-icons/fa";
import { useEffect, useState } from "react";
import GuardLogin from "@/utils/guardLogin";

const ABMDiscount = () => {
    const columns = ["Nombre", "Descuento %"]

    const [fullDiscountToEdit, setFullDiscountToEdit] = useState({ id: '', name: '', percentage: ''});
    const [discountsData, setDiscountsData] = useState([{ name: '', percentage: 0 }]);
    const [discountsAllData, setDiscountsAllData] = useState<IDiscount[]>([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    
    async function getDiscounts() {
        const allDiscounts = await discountServices.getDiscounts()
        if(!allDiscounts) return
        
        const dataDiscountInTable = formatDiscountToTable(allDiscounts.filter(discount => !discount.isDeleted))


        setDiscountsAllData(allDiscounts.filter(discount => !discount.isDeleted))
        setIsLoading(false)
        setDiscountsData(dataDiscountInTable)
    }

    const formatDiscountToTable = (discount:Array<IDiscount>) => {
        const dataDiscountInTable = discount.map((discount) => ({
            name: discount.name,
            percentage: discount.percent
        }))

        return dataDiscountInTable
    }

    async function deleteElementFunction(index:number) {
        if(sessionServices.isAdmin()) {
            const elementToDelete = discountsAllData[index]
            const newDiscountsAllData = discountsAllData.filter((obj) => obj.id !== elementToDelete.id);
            const dataPricesInTable = formatDiscountToTable(newDiscountsAllData)
            setDiscountsAllData(newDiscountsAllData)
            setDiscountsData(dataPricesInTable)
    
            await discountServices.deleteDiscount(elementToDelete.id)
            AlertServices.renderAlert(
                'El Descuento ha sido eliminado',
                '',
                'success'
            )
            return
        }
        AlertServices.renderAlertPermission()
    } 

    const openModalEditFunction = () => {
        if(sessionServices.isAdmin()) {
            setOpenModalEdit(true)
            return
        }
        AlertServices.renderAlertPermission();
    }

    const openModalCreateFunction = () => {
        if(sessionServices.isAdmin()) {
            setFullDiscountToEdit({ id: '', name: '', percentage: ''})
            setOpenModalCreate(true)
            return
        }
        AlertServices.renderAlertPermission();
    }
   
    useEffect(() => {
        getDiscounts()
    }, [])

    return (
        <GuardLogin>
        {
            isLoading? <Loader/> :
            <>
                <LittleABMTemplate title="Administración de Descuentos" subTitle="Crea y edita los descuentos" icon={<FaPercentage />}>
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
        </GuardLogin>
    );
};

export default ABMDiscount;
