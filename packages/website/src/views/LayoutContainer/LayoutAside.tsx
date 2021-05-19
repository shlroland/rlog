import styles from './LayoutContainer.module.css'
import { FC } from 'react'

const LayoutAside: FC = ({ children }) => {
  return <aside className={styles['content-aside']}>{children}</aside>
}

export default LayoutAside
