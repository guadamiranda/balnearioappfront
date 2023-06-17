import Title from '@/Components/Atoms/Titulo/Titulo'
import style from './ABMTemplate.module.scss'
import { BiLeaf } from 'react-icons/bi'

interface IABMTemplate {
    title: string,
    subTitle: string,
    children: React.ReactNode
}

const ABMTemplate: React.FC<IABMTemplate> = ({ title, subTitle, children }) => {
    return(
        <div className={style.ABMContainer}>
            <Title icon={<BiLeaf/>} subTitle={subTitle} title={title}/>
            <div className={style.ABMContainer__childContainer}>
                {children}
            </div>
        </div>
    )
}

export default ABMTemplate