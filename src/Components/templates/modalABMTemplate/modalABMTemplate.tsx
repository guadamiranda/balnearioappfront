import style from './modalABMTemplate.module.scss'
import { MdOutlineClose } from 'react-icons/md'

interface IModalABMTemplate {
    title: string,
    children: React.ReactNode,
    closeFunction: any,
}

const ModalABMTemplate: React.FC<IModalABMTemplate> = ({ title, children, closeFunction }) => {
    return(
        <div className={style.ABMContainer}>
            <div className={style.ABMContainer__modal}>
                <div className={style.ABMContainer__header}>
                    <span>{title}</span> 
                    <MdOutlineClose className={style.ABMContainer__closeButton} onClick={() => closeFunction(false)}/>
                </div>
                <div className={style.ABMContainer__childContainer}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalABMTemplate