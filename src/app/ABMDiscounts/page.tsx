'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditDiscount from "@/Components/Molecules/AddEditDiscounts/AddEditDiscount";
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import style from './ABMDiscounts.module.scss'
import { useState } from "react";

const ABMDiscount = () => {
    const columns = ["Nombre", "Descuento"]
    const [openModal, setOpenModal] = useState(false)

    const data = [{name: 'Descuento 1', price: 1000},
                  {name: 'Descuento 2', price: 2000 },
                  {name: 'Descuento 3', price: 1000}]

    return (
        <>
            <LittleABMTemplate title="Administración de Descuentos" subTitle="">
                <div className={style.abmPriceContainer}>
                    <div className={style.abmPriceContainer__tableContainer}>
                        <Table columns={columns} tableData={data} openModalFunction={setOpenModal}/>
                    </div>
                    <div className={style.abmPriceContainer__buttonContainer}>
                        <Button text="Crear nuevo Descuento" type='primary'  onClickFunction={() => setOpenModal(true)} isFullWidth={true}></Button>
                    </div>
                </div>
            </LittleABMTemplate>

            {openModal && <ModalABMTemplate title='Crear Precio' children={<AddEditDiscount/>} closeFunction={setOpenModal}></ModalABMTemplate>}
        </>  
    );
};

export default ABMDiscount;
