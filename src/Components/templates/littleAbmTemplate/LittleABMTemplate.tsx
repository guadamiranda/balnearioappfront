import Title from '@/Components/Atoms/Titulo/Titulo'
import style from './littleABMTemplate.module.scss'
import { BiLeaf } from 'react-icons/bi'

interface ILittleABMTemplate {
    title: string,
    subTitle: string,
    children: React.ReactNode
}

const LittleABMTemplate: React.FC<ILittleABMTemplate> = ({ title, subTitle, children }) => {
    return(
        <div className={style.ABMContainer}>
            <Title icon={<BiLeaf/>} subTitle={subTitle} title={title}/>
            <div className={style.ABMContainer__childContainer}>
                {children}
            </div>
        </div>
    )
}

export default LittleABMTemplate