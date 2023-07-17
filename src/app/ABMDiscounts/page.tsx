'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditDiscount from "@/Components/Molecules/AddEditDiscount/AddEditDiscount";
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import style from './ABMDiscounts.module.scss'
import { useEffect, useState } from "react";
import discountServices from '../../Services/discountServices'

const ABMDiscount = () => {
    const columns = ["Nombre", "Descuento"]
    const [fullDiscountToEdit, setFullDiscountToEdit] = useState({ id: '', name: '', percentage: ''})
    const [isLoading, setIsLoading] = useState(true)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [discountsData, setDiscountsData] = useState([{ name: '', percentage: 0 }]);
    const [discountsAllData, setDiscountsAllData] = useState()
    const [render, setRender] = useState(false)
    
    async function getDiscounts() {
        const allDiscounts = await discountServices.getDiscounts()
        const dataDiscountInTable = allDiscounts.map((discount:any) => ({
            name: discount.name,
            percentage: discount.percentage

        }))

        setDiscountsAllData(allDiscounts)
        setDiscountsData(dataDiscountInTable)
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
    }, [render])
    
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
                                setRender={setRender} 
                                render={render}
                                setFullElementToEdit={setFullDiscountToEdit}/>
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
