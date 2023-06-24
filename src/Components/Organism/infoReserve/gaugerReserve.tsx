import { HiOutlineIdentification } from "react-icons/hi";
import style from "./gaugerReserve.module.scss";
import Button from '../../Atoms/button/button';
import { FaTruckMoving, FaTruckPickup, FaCarSide } from "react-icons/fa"
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";

const iconEntitys: { [entityName: string]: JSX.Element} = {
    truck: <></>,
    pickup: <></>,
    car: <></>,
    person: <></>
}

interface IGaugerReserve {
    entityName: 'truck' | 'pickup' | 'car' | 'person', 
    amount: number
}

const GaugerReserve: React.FC<IGaugerReserve> = ({entityName, amount}) => {
    const getIconEntity = (entityName: string)=> {
        return iconEntitys[entityName]
    }

    return (
        <div className={style.gaugerContainer}>
            {getIconEntity(entityName)}
            <span>{amount}</span>
        </div>
    );
};

export default GaugerReserve;
