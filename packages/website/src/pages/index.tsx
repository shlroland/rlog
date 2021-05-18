import styles from '@/styles/App.module.css'
import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import ArticleList from '@/components/ArticleList/index'
import ListBox from '@/components/ListBox'

export default function Home() {
  return (
    <>
      <main className={styles.wrapper}>
        <LayoutContainer asideCom={ListBox()}>
          <ArticleList />
        </LayoutContainer>
      </main>
    </>
  )
}
