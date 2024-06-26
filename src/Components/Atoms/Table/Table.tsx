'use client'
import style from './table.module.scss'
import { FaTrashAlt } from 'react-icons/fa'
import { RiEdit2Fill } from 'react-icons/ri' 
import ButtonIcon from '../ButtonIcon/ButtonIcon'

interface ITable{
    columns: Array<string>,
    completeTableData: any,
    tableData: Array<any>,
    openModalEditFunction: any,
    setFullElement: any,
    deleteElementFunction?: any
}

const Table: React.FC<ITable> = ({
    columns, 
    tableData, 
    completeTableData, 
    openModalEditFunction, 
    setFullElement,
    deleteElementFunction}) => {

    const openEditModal = (index:number) => {
        setFullElement(completeTableData[index])
        openModalEditFunction()
    }

    const rowStyle = (index:any) => {
        const styleRow = index % 2== 0 ? style.tableContainer__tableItem__pair : style.tableContainer__tableItem

        return styleRow
    }

    return(
        <div className={style.tableContainer}>
            <div className={style.tableContainer__tableHeader}>
                {columns.map((column, index) => <div className={style.tableContainer__tableColumns} key={index}>{column}</div>)}
                <div className={style.tableContainer__tableColumns}>Acciones</div>
            </div>
            <div className={style.tableContainer__tableBody}>
                {tableData.map((data, index) => 
                <div key={index} className={rowStyle(index)}>
                    {Object.keys(data).map((key) => (
                    <div className={style.tableContainer__tableColumns} key={key}>{data[key]}</div>
                    ))}
                    <div className={style.tableContainer__tableColumns}>
                        <ButtonIcon icon={<RiEdit2Fill/>} type='info' onClickFunction={() => openEditModal(index)}/>
                        {deleteElementFunction? <ButtonIcon icon={<FaTrashAlt/>} type='danger' onClickFunction={() => deleteElementFunction(index)}/> : <></>}
                    </div>
                </div>
                )}
            </div>
            
        </div>
    )
}

export default Table