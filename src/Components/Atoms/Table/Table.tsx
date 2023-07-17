'use client'
import style from './table.module.scss'
import { FaTrashAlt } from 'react-icons/fa'
import { RiEdit2Fill } from 'react-icons/ri' 
import ButtonIcon from '../ButtonIcon/ButtonIcon'
import priceServices from '@/Services/priceServices'

interface ITable{
    columns: Array<string>,
    completeTableData: any,
    tableData: Array<any>,
    openModalEditFunction: any,
    setRender:any,
    render: boolean,
    setFullElementToEdit: any
}

const Table: React.FC<ITable> = ({
    columns, 
    tableData, 
    completeTableData, 
    openModalEditFunction, 
    setRender, 
    render, 
    setFullElementToEdit}) => {

    async function deleteFunction(index:number) {
        setRender(!render)
        const elementToDelete = completeTableData[index]
        
        await priceServices.deletePrice(elementToDelete.id)
    }   

    const openModal = (index:number) => {
        setFullElementToEdit(completeTableData[index])
        console.log(completeTableData[index])
        openModalEditFunction()
    }

    return(
        <div className={style.tableContainer}>
            <div className={style.tableContainer__tableHeader}>
                {columns.map((column, index) => <div className={style.tableContainer__tableColumns} key={index}>{column}</div>)}
                <div className={style.tableContainer__tableColumns}>Acciones</div>
            </div>
            <div className={style.tableContainer__tableBody}>
                {tableData.map((data, index) => 
                <div key={index} className={style.tableContainer__tableItem}>
                    {Object.keys(data).map((key) => (
                    <div className={style.tableContainer__tableColumns} key={key}>{data[key]}</div>
                    ))}
                    <div className={style.tableContainer__tableColumns}>
                        <ButtonIcon icon={<RiEdit2Fill/>} type='info' onClickFunction={() => openModal(index)}/>
                        <ButtonIcon icon={<FaTrashAlt/>} type='danger' onClickFunction={() => deleteFunction(index)}/>
                    </div>
                </div>
                )}
            </div>
            
        </div>
    )
}

export default Table