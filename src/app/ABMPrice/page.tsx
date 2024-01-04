'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditPrice from "@/Components/Molecules/AddEditPrice/AddEditPrice";
import priceServices from '../../Services/priceServices'
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import { useEffect, useState } from "react";
import style from './ABMPrice.module.scss'
import GuardLogin from "@/utils/guardLogin";
import Loader from "@/Components/Organism/loaderScreen/loader";
import sessionServices from "@/Services/sessionServices";
import AlertServices from "@/utils/AlertServices";

type IAllPrices = {
    id: number,
    name: string,
    amount: number
}

const ABMPrice = () => {
    const columns = ["Nombre", "Precio $"]
    const [fullPriceToEdit, setFullPriceToEdit] = useState({ id: '', name: '', amount: ''})
    const [pricesData, setPricesData] = useState([{ name: '', amount: 0 }]);
    const [pricesAllData, setPricesAllData] = useState<IAllPrices[]>([])
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    async function getPrices() {
        const allPrices = await priceServices.getPrices()
        const dataPricesInTable = formatPricesToTable(allPrices)

        setPricesAllData(allPrices)
        setPricesData(dataPricesInTable)
        setIsLoading(false)
    }

    const formatPricesToTable = (prices:Array<IAllPrices>) => {
        const dataPricesInTable = prices.map((price:any) => ({
            name: price.name,
            amount: price.amount
        }))
        return dataPricesInTable;
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
            setFullPriceToEdit({ id: '', name: '', amount: ''})
            setOpenModalCreate(true)
            return
        }
        AlertServices.renderAlertPermission();
    }

    useEffect(() => {
        getPrices()
    }, [])

    return (
        <GuardLogin>
            {
                isLoading? <Loader/>:
                <>
                    <LittleABMTemplate title="Administración de Precios" subTitle="">
                <div className={style.abmPriceContainer}>
                    <div className={style.abmPriceContainer__tableContainer}>
                        <Table 
                            columns={columns} 
                            tableData={pricesData} 
                            completeTableData={pricesAllData} 
                            openModalEditFunction={openModalEditFunction} 
                            setFullElement={setFullPriceToEdit}/>
                    </div>
                    <div className={style.abmPriceContainer__buttonContainer}>
                        { /*<Button text="Crear nuevo Precio" type='primary' onClickFunction={() => openModalCreateFunction()} isFullWidth={true}></Button> */}
                    </div>
                </div>
            </LittleABMTemplate>
            {openModalCreate && <ModalABMTemplate title='Crear Precio' children={<AddEditPrice updateTable={getPrices} fullElementToEdit={fullPriceToEdit} closeFunction={setOpenModalCreate}/>} closeFunction={setOpenModalCreate} ></ModalABMTemplate>}
            {openModalEdit && <ModalABMTemplate title='Editar Precio' children={<AddEditPrice updateTable={getPrices} fullElementToEdit={fullPriceToEdit} closeFunction={setOpenModalEdit}/>} closeFunction={setOpenModalEdit} ></ModalABMTemplate>}
                </>
            }
        </GuardLogin>
    );
};

export default ABMPrice;
