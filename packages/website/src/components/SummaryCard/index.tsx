import { FC } from 'react'
import { IconType } from 'react-icons/lib'
import styles from './index.module.css'

interface SummaryCardProps {
  Icon: IconType
  title: string
  total: number
}

const SummaryCard: FC<SummaryCardProps> = ({ Icon, title, total }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['icon-wrapper']}>
        <Icon />
      </div>
      <p className={styles['title-wrapper']}>
        <span>{title}</span>
      </p>
      <p>
        共计 <span className={styles['total-text']}>{total}</span> 篇
      </p>
    </div>
  )
}

export default SummaryCard
