import Button from "@/Components/Atoms/button/button";
import Input from "@/Components/Atoms/Input/input";
import style from "./addEditPrice.module.scss";
import { ImPriceTag } from 'react-icons/im';
import { BiDollar } from 'react-icons/bi'

interface IAddEditPrice {
    valueName?: string,
    valuePrice?: number
}

const AddEditPrice: React.FC<IAddEditPrice> = ({ valueName, valuePrice }) => {

    return(
        <div className={style.addEditPriceContainer}>
            <div className={style.addEditPriceContainer__inputContainer}>
                <Input icon={<ImPriceTag/>} placeholder="Nombre del precio" title='Nombre' useStateFunction={() => console.log('hi')} isFullWidth={true}></Input>
                <br/>
                <Input icon={<BiDollar/>} placeholder="Precio" title='Precio' useStateFunction={() => console.log('hi')} isFullWidth={true}></Input>
            </div>
            <div className={style.addEditPriceContainer__buttonContainer}>
                <Button text="Crear Precio" type='primary' onClickFunction={() => console.log('hi')} isFullWidth={true}></Button>
            </div>
        </div>
    )
}

export default AddEditPrice