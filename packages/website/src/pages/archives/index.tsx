import { NextPage } from 'next'
import { MdArchive } from 'react-icons/md'
import styles from './index.module.css'
import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import SummaryCard from '@/components/SummaryCard'
import { FC } from 'react'

interface ArchiveItemProps {
  month: string
}

const ArchiveItem: FC<ArchiveItemProps> = ({ month }) => {
  return (
    <div className={styles.item}>
      <h3>{month}</h3>
      <ul>
        <li>
          <a>
            <span className={styles.meta}>01-11</span>
            <span className={styles.title}>浏览器原理剖析</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

const Archives: NextPage = () => {
  return (
    <LayoutContainer>
      <SummaryCard Icon={MdArchive} title="归档" total={12} />
      <div className={styles.list}>
        <h2>2020</h2>
        <ArchiveItem month={'Jan'} />
      </div>
    </LayoutContainer>
  )
}

export default Archives
