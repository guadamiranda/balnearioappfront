import styles from './page.module.css'
import QueryReserve from '@/Components/Organism/queryReserve/queryReserve'

export default function Home() {
  return (
    <main className={styles.main}>
      <QueryReserve/>
    </main>
  )
}
