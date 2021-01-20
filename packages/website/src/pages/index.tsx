import styles from '@/styles/App.module.css'
import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import ArticleList from '@/components/ArticleList/index'

export default function Home() {
  return (
    <>
      <main className={styles.wrapper}>
        <LayoutContainer>
          <ArticleList></ArticleList>
        </LayoutContainer>
      </main>
    </>
  )
}