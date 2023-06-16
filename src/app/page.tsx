import styles from './page.module.css'
import RegistrarEstadia from '@/Components/Organism/RegistrarEstadia/RegistrarEstadia'

export default function Home() {
  return (
    <main className={styles.main}>
      <RegistrarEstadia/>
    </main>
  )
}
