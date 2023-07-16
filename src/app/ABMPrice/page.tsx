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
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [pricesData, setPricesData] = useState([{ name: '', amount: 0 }]);
    const [pricesAllData, setPricesAllData] = useState()
    const [render, setRender] = useState(false)
    const [editName, setEditName] = useState('')
    const [editPrice, setEditPrice] = useState('')
    const [editIdPrice, setEditIdPrice] = useState('')
    

    async function getPrices() {
        const allPrices = await priceServices.getPrices()
        const dataPricesInTable = allPrices.map((price:any) => ({
            name: price.name,
            amount: price.amount
        }))

        setPricesAllData(allPrices)
        setPricesData(dataPricesInTable)
    }

    useEffect(() => {
        getPrices()
    }, [render])

    return (
        <>
            <LittleABMTemplate title="Administración de Precios" subTitle="">
                <div className={style.abmPriceContainer}>
                    <div className={style.abmPriceContainer__tableContainer}>
                        <Table 
                            columns={columns} 
                            tableData={pricesData} 
                            completeTableData={pricesAllData} 
                            openModalFunction={setOpenModalEdit} 
                            setRender={setRender} 
                            render={render}
                            setEditName={setEditName}
                            setEditPrice={setEditPrice}
                            setEditId={setEditIdPrice}/>
                    </div>
                    <div className={style.abmPriceContainer__buttonContainer}>
                        <Button text="Crear nuevo Precio" type='primary'  onClickFunction={() => setOpenModalCreate(true)} isFullWidth={true}></Button>
                    </div>
                </div>
            </LittleABMTemplate>
            {openModalCreate && <ModalABMTemplate title='Crear Precio' children={<AddEditPrice updateTable={getPrices} valueName={''} valuePrice={''}/>} closeFunction={setOpenModalCreate} ></ModalABMTemplate>}
            {openModalEdit && <ModalABMTemplate title='Editar Precio' children={<AddEditPrice updateTable={getPrices} valueName={editName} valuePrice={editPrice} editIndexPrice={editIdPrice}/>} closeFunction={setOpenModalEdit} ></ModalABMTemplate>}
        </>
       
        
    );
};

export default ABMPrice;
