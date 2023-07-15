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
    const [openModal, setOpenModal] = useState(false)
    const [pricesData, setPricesData] = useState([{ name: '', amount: 0 }]);
    const [editName, setEditName] = useState('')
    const [editPrice, setEditPrice] = useState(0)
    

    async function getPrices() {
        const allPrices = await priceServices.getPrices()
        const dataPricesInTable = allPrices.map((price:any) => ({
            name: price.name,
            amount: price.amount
        }))

        setPricesData(dataPricesInTable)
    }

    useEffect(() => {
        getPrices()
    }, [])

    return (
        <>
            <LittleABMTemplate title="Administración de Precios" subTitle="">
                <div className={style.abmPriceContainer}>
                    <div className={style.abmPriceContainer__tableContainer}>
                        <Table columns={columns} tableData={pricesData} openModalFunction={setOpenModal}/>
                    </div>
                    <div className={style.abmPriceContainer__buttonContainer}>
                        <Button text="Crear nuevo Precio" type='primary'  onClickFunction={() => setOpenModal(true)} isFullWidth={true}></Button>
                    </div>
                </div>
            </LittleABMTemplate>
            {openModal && <ModalABMTemplate title='Crear Precio' children={<AddEditPrice updateTable={setPricesData} dataUpdateTable={pricesData}/>} closeFunction={setOpenModal} ></ModalABMTemplate>}
        </>
       
        
    );
};

export default ABMPrice;
