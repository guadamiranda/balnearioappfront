import styles from './page.module.css'
import ABMTemplate from '@/Components/templates/abmTemplate/ABMTemplate'
import QueryReserve from '@/Components/Organism/queryReserve/queryReserve'

export default function Home() {
  return (
    <main className={styles.main}>
      <ABMTemplate title='Registrar Estadía' subTitle='Ingresa los datos para registrar la estadía.' children={<RegistrarEstadia/>}/>
    </main>
  )
}
