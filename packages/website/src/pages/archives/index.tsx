import { NextPage } from 'next'
import { MdArchive } from 'react-icons/md'
import styles from '@/styles/App.module.css'
import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import SummaryCard from '@/components/SummaryCard'

const Archives: NextPage = () => {
  return (
    <>
      <main className={styles.wrapper}>
        <LayoutContainer>
          <SummaryCard Icon={MdArchive} title="归档" total={12} />
        </LayoutContainer>
      </main>
    </>
  )
}

export default Archives
