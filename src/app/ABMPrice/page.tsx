'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditPrice from "@/Components/Molecules/AddEditPrice/AddEditPrice";
import priceServices from '../../Services/priceServices'
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import { useEffect, useState } from "react";
import style from './ABMPrice.module.scss'
import Swal from 'sweetalert2'
import GuardLogin from "@/utils/guardLogin";

type IAllPrices = {
    id: number,
    name: string,
    amount: number
}

const ABMPrice = () => {
    const columns = ["Nombre", "Precio"]
    const [fullPriceToEdit, setFullPriceToEdit] = useState({ id: '', name: '', amount: ''})
    const [isLoading, setIsLoading] = useState(true)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [pricesData, setPricesData] = useState([{ name: '', amount: 0 }]);
    const [pricesAllData, setPricesAllData] = useState<IAllPrices[]>([])
    
    async function getPrices() {
        const allPrices = await priceServices.getPrices()

        const dataPricesInTable = formatPricesToTable(allPrices)
        setPricesAllData(allPrices)
        setPricesData(dataPricesInTable)
    }

    const formatPricesToTable = (prices:any) => {
        const dataPricesInTable = prices.map((price:any) => ({
            name: price.name,
            amount: price.amount
        }))
        return dataPricesInTable
    }

    const openModalEditFunction = () => {
        setOpenModalEdit(true)
    }

    const openModalCreateFunction = () => {
        setFullPriceToEdit({ id: '', name: '', amount: ''})
        setOpenModalCreate(true)
    }

    async function deleteElementFunction(index:number) {
        const elementToDelete = pricesAllData[index]
        const newPricesAllData = pricesAllData.filter((obj) => obj.id !== elementToDelete.id);
        const dataPricesInTable = formatPricesToTable(newPricesAllData)
        setPricesAllData(newPricesAllData)
        setPricesData(dataPricesInTable)

        await priceServices.deletePrice(elementToDelete.id)
        Swal.fire({
            title: 'El Precio ha sido eliminado',
            icon: 'success',
            confirmButtonText: 'Cerrar',
          })
    } 
    
    useEffect(() => {
        getPrices()
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    return (
        <GuardLogin>
        {
            isLoading? 
            <div className={style.abmPriceContainer}>
                <div className={style.abmPriceContainer__loaderContainer}>
                    <div className={style.abmPriceContainer__loader}></div>
                </div>
            </div> :
            
            <>
                <LittleABMTemplate title="Administración de Precios" subTitle="">
                    <div className={style.abmPriceContainer}>
                        <div className={style.abmPriceContainer__tableContainer}>
                            <Table 
                                columns={columns} 
                                tableData={pricesData} 
                                completeTableData={pricesAllData} 
                                openModalEditFunction={openModalEditFunction} 
                                setFullElement={setFullPriceToEdit}
                                deleteElementFunction={deleteElementFunction}/>
                        </div>
                        <div className={style.abmPriceContainer__buttonContainer}>
                            <Button text="Crear nuevo Precio" type='primary'  onClickFunction={() => openModalCreateFunction()} isFullWidth={true}></Button>
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
