'use client'

import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import ModalABMTemplate from "@/Components/templates/modalABMTemplate/modalABMTemplate";
import AddEditPrice from "@/Components/Molecules/AddEditPrice/AddEditPrice";
import Button from "@/Components/Atoms/button/button";
import Table from "@/Components/Atoms/Table/Table";
import style from './ABMPrice.module.scss'
import { useState } from "react";


const ABMPrice = () => {
    const columns = ["Nombre", "Precio"]
    const [openModal, setOpenModal] = useState(false)
    const [editName, setEditName] = useState('')
    const [editPrice, setEditPrice] = useState(0)

    const data = [{name: 'Precio por Persona', price: 1000},
                  {name: 'Precio por Día', price: 2000 },
                  {name: 'Precio por Persona', price: 1000},
                  {name: 'Precio por Día', price: 2000 }]

    return (
        <>
            <LittleABMTemplate title="Administración de Precios" subTitle="">
                <div className={style.abmPriceContainer}>
                    <div className={style.abmPriceContainer__tableContainer}>
                        <Table columns={columns} tableData={data} openModalFunction={setOpenModal}/>
                    </div>
                    <div className={style.abmPriceContainer__buttonContainer}>
                        <Button text="Crear nuevo Precio" type='primary'  onClickFunction={() => setOpenModal(true)} isFullWidth={true}></Button>
                    </div>
                </div>
            </LittleABMTemplate>
            {openModal && <ModalABMTemplate title='Crear Precio' children={<AddEditPrice/>} closeFunction={setOpenModal}></ModalABMTemplate>}
        </>
       
        
    );
};

export default ABMPrice;
