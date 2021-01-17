import styles from './LayoutContainer.module.css'
import ArticleList from '@/components/ArticleList/index'

const LayoutContent = () => {
  return (
    <div className={styles['content-wrapper']}>
      <ArticleList />
    </div>
  )
}

export default LayoutContent
