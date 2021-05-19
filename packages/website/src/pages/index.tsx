import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import ArticleList from '@/components/ArticleList/index'
import ListBox from '@/components/ListBox'

export default function Home() {
  return (
    <LayoutContainer asideCom={ListBox()}>
      <ArticleList />
    </LayoutContainer>
  )
}
