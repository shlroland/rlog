import { PostItem } from '@/pages/typeDefs'
import { FC } from 'react'
import ArticleCard from './ArticleCard'
interface ArticleListProp {
  postList?: PostItem[]
  current?: number
  pageSize?: number
}

const ArticleList: FC<ArticleListProp> = ({ postList }) => {
  return (
    <div className="flex flex-col flex-wrap w-full">
      {postList &&
        postList.map(post => {
          return <ArticleCard key={post._id} {...post} />
        })}
    </div>
  )
}

export default ArticleList
