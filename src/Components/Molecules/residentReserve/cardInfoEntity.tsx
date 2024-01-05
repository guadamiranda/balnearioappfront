import style from "./cardInfoEntity.module.scss";
import { FaCarSide, FaUsers } from "react-icons/fa"

const iconEntitys: { [entityName: string]: JSX.Element} = {
    carPlate: <FaCarSide/>,
    dni: <FaUsers/>,
}

interface ICardInfoEntity {
    infoNames: string[],
    typeInfoName: 'carPlate' | 'dni' 
}

const CardInfoEntity: React.FC<ICardInfoEntity> = ({typeInfoName, infoNames}) => {
    const renderInfo = (infoNames: string[]) => {
        return(infoNames.length === 0 ? 
            <span className={style.cardEntity__entity}>No hay datos para mostrar</span>
            : infoNames.map((name, index) => <span key={index} className={style.cardEntity__entity}>{name}</span>))
    }

    return (
        <div className={style.cardEntity}>
            <div className={style.cardEntity__icon}>
                {iconEntitys[typeInfoName]}
            </div>
            <div className={style.cardEntity__entityContainer}>
                <div className={style.cardEntity__allInfo}>{renderInfo(infoNames)}</div>
            </div>
        </div>
    );
};

export default CardInfoEntity;
