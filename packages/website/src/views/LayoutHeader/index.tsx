import { FC } from 'react'
import styles from '@/views/LayoutHeader/LayoutHeader.module.css'

const LayoutHeader: FC = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}></div>
      <div className={styles.content}></div>
    </header>
  )
}

export default LayoutHeader
