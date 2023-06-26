import { HiOutlineIdentification } from "react-icons/hi";
import style from "./gaugerReserve.module.scss";
import { FaCarSide } from "react-icons/fa"
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";

const iconEntitys: { [entityName: string]: JSX.Element} = {
    car: <FaCarSide></FaCarSide>,
    resident: <AiOutlineUser></AiOutlineUser>
}

interface IGaugerReserve {
    entityName: 'car' | 'resident',
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
