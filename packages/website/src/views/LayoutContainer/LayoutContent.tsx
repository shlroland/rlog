import styles from './LayoutContainer.module.css'
import { FC } from 'react'

const LayoutContent: FC = ({ children }) => {
  return <div className={styles['content-wrapper']}>{children}</div>
}

export default LayoutContent
