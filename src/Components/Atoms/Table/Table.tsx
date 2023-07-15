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
    openModalFunction: any,
    setRender:any,
    render: any
}

const Table: React.FC<ITable> = ({columns, tableData, completeTableData, openModalFunction, setRender, render}) => {

    async function deleteFunction(index:number) {
        setRender(!render)
        const elementToDelete = completeTableData[index]
        
        await priceServices.deletePrice(elementToDelete.id)
        console.log(elementToDelete.id)
    }   

    return(
        <div className={style.tableContainer}>
            <div className={style.tableContainer__tableHeader}>
                {columns.map((column, index) => <div className={style.tableContainer__tableColumns} key={index}>{column}</div>)}
                <div className={style.tableContainer__tableColumns}>Acciones</div>
            </div>
            <div className={style.tableContainer__tableBody}>
                {tableData.map((data, index) => 
                <div className={style.tableContainer__tableItem}>
                    {Object.keys(data).map((key) => (
                    <div className={style.tableContainer__tableColumns} key={key}>{data[key]}</div>
                    ))}
                    <div className={style.tableContainer__tableColumns}>
                        <ButtonIcon icon={<RiEdit2Fill/>} type='info' onClickFunction={() => openModalFunction(true)}/>
                        <ButtonIcon icon={<FaTrashAlt/>} type='danger' onClickFunction={() => deleteFunction(index)}/>
                    </div>
                </div>
                )}
            </div>
            
        </div>
    )
}

export default Table