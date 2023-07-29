import style from "./cardInfoEntity.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { FaCarSide } from "react-icons/fa"

const iconEntitys: { [entityName: string]: JSX.Element} = {
    carPlate: <FaCarSide/>,
    dni: <AiOutlineUser/>
}

interface ICardInfoEntity {
    infoNames: string[],
    typeInfoName: 'carPlate' | 'dni'
}

const CardInfoEntity: React.FC<ICardInfoEntity> = ({typeInfoName, infoNames}) => {

    const renderInfo = (infoNames: string[]) => {
        return(infoNames.map((name, index) => <span key={index} className={style.cardEntity__entity}>{name}</span>))
    }

    return (
        <div className={style.cardEntity}>
            <div className={style.cardEntity__icon}>
                {iconEntitys[typeInfoName]}
            </div>
            <div className={style.cardEntity__entityContainer}>
                {renderInfo(infoNames)}
            </div>
        </div>
    );
};

export default CardInfoEntity;
