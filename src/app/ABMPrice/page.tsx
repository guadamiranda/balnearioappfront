'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditPrice from "@/Components/Molecules/AddEditPrice/AddEditPrice";
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import style from './ABMPrice.module.scss'
import { useEffect, useState } from "react";
import priceServices from '../../Services/priceServices'

const ABMPrice = () => {
    const columns = ["Nombre", "Precio"]
    const [fullPriceToEdit, setFullPriceToEdit] = useState({ id: '', name: '', amount: ''})
    const [isLoading, setIsLoading] = useState(true)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [pricesData, setPricesData] = useState([{ name: '', amount: 0 }]);
    const [pricesAllData, setPricesAllData] = useState()
    const [render, setRender] = useState(false)
    
    async function getPrices() {
        const allPrices = await priceServices.getPrices()
        const dataPricesInTable = allPrices.map((price:any) => ({
            name: price.name,
            amount: price.amount
        }))

        setPricesAllData(allPrices)
        setPricesData(dataPricesInTable)
    }

    const openModalEditFunction = () => {
        setOpenModalEdit(true)
    }

    const openModalCreateFunction = () => {
        setFullPriceToEdit({ id: '', name: '', amount: ''})
        setOpenModalCreate(true)
    }

    useEffect(() => {
        getPrices()
    }, [render])
    
    useEffect(() => {
        getPrices()
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
                <LittleABMTemplate title="Administración de Precios" subTitle="">
                    <div className={style.abmPriceContainer}>
                        <div className={style.abmPriceContainer__tableContainer}>
                            <Table 
                                columns={columns} 
                                tableData={pricesData} 
                                completeTableData={pricesAllData} 
                                openModalEditFunction={openModalEditFunction} 
                                setRender={setRender} 
                                render={render}
                                setFullElementToEdit={setFullPriceToEdit}/>
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

        </>
    );
};

export default ABMPrice;
