import TitleHome from '@/Components/Atoms/TitleHome/TitleHome'
import style from './homeTemplate.module.scss'
import { BiLeaf } from 'react-icons/bi'

interface IHomeTemplate {
    title: string,
    subTitle: string,
    children: React.ReactNode
}

const HomeTemplate: React.FC<IHomeTemplate> = ({ title, subTitle, children }) => {
    return(
        <div className={style.homeContainer}>
            <TitleHome icon={<BiLeaf/>} subTitle={subTitle} title={title}/>
            <div className={style.homeContainer__childContainer}>
                {children}
            </div>
        </div>
    )
}

export default HomeTemplate