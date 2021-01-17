import styles from '@/styles/App.module.css'
import LayoutContent from '@/views/LayoutContainer/LayoutContent'
import LayoutAsdie from '@/views/LayoutContainer/LayoutAside'

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <LayoutContent />
      <LayoutAsdie />
    </main>
  )
}
