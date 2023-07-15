'use client'
import style from './table.module.scss'
import { FaTrashAlt } from 'react-icons/fa'
import { RiEdit2Fill } from 'react-icons/ri' 
import ButtonIcon from '../ButtonIcon/ButtonIcon'

interface ITable{
    columns: Array<string>,
    tableData: Array<any>,
    openModalFunction: any
}

const Table: React.FC<ITable> = ({columns, tableData, openModalFunction}) => {
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
                        <ButtonIcon icon={<FaTrashAlt/>} type='danger' onClickFunction={() => console.log('BUAG')}/>
                    </div>
                </div>
                )}
            </div>
            
        </div>
    )
}

export default Table