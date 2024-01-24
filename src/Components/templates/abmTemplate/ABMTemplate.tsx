'use client'

import Title from '@/Components/Atoms/Titulo/Titulo'
import style from './ABMTemplate.module.scss'
import { AiFillHome } from 'react-icons/ai'
import { BiLeaf } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

interface IABMTemplate {
    title: string,
    subTitle: string,
    children: React.ReactNode,
    icon?: any
}

const ABMTemplate: React.FC<IABMTemplate> = ({ title, subTitle, children, icon }) => {
    const router = useRouter()

    return(
        <div className={style.ABMContainer}>
            <div className={style.ABMContainer__title}>
                <Title icon={icon} subTitle={subTitle} title={title}/>
            </div>
            
            <div className={style.ABMContainer__childContainer}>
                {children}
            </div>
        </div>
    )
}

export default ABMTemplate