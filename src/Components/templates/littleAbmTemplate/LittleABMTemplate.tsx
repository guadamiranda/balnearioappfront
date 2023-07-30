import Title from '@/Components/Atoms/Titulo/Titulo'
import style from './littleABMTemplate.module.scss'
import { AiFillHome } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { BiLeaf } from 'react-icons/bi'

interface ILittleABMTemplate {
    title: string,
    subTitle: string,
    children: React.ReactNode
}

const LittleABMTemplate: React.FC<ILittleABMTemplate> = ({ title, subTitle, children }) => {
    const router = useRouter()
    return(
        <div className={style.ABMContainer}>
            <div className={style.ABMContainer__title}>
                <Title icon={<BiLeaf/>} subTitle={subTitle} title={title}/>
                <AiFillHome className={style.ABMContainer__homeIcon} onClick={() => router.push('/')}/>
            </div>

            <div className={style.ABMContainer__childContainer}>
                {children}
            </div>
        </div>
    )
}

export default LittleABMTemplate