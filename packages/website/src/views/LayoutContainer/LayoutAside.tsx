import styles from './LayoutContainer.module.css'
import ListBox from '@/components/ListBox/index'

const LayoutAside = () => {
  return (
    <aside className={styles['content-aside']}>
      <ListBox />
    </aside>
  )
}

export default LayoutAside
