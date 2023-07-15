import Button from "@/Components/Atoms/button/button";
import Input from "@/Components/Atoms/Input/input";
import style from "./addEditDiscount.module.scss";
import { ImPriceTag } from 'react-icons/im';
import { BiDollar } from 'react-icons/bi'

interface IAddEditDiscount {
    valueName?: string,
    valueDiscount?: number
}

const AddEditDiscount: React.FC<IAddEditDiscount> = ({ valueName, valueDiscount }) => {
    return(
        <div className={style.addEditDiscountContainer}>
            <div className={style.addEditDiscountContainer__inputContainer}>
                <Input icon={<ImPriceTag/>} placeholder="Nombre del Descuento" title='Nombre' useStateFunction={() => console.log('hi')} isFullWidth={true}></Input>
                <br/>
                <Input icon={<BiDollar/>} placeholder="Descuento" title='Descuento' useStateFunction={() => console.log('hi')} isFullWidth={true}></Input>
            </div>
            <div className={style.addEditDiscountContainer__buttonContainer}>
                <Button text="Crear Descuento" type='primary' onClickFunction={() => console.log('hi')} isFullWidth={true}></Button>
            </div>
        </div>
    )
}

export default AddEditDiscount