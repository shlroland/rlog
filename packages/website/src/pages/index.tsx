import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import ListBox from '@/components/ListBox'
import ArticleList from '@/components/ArticleList'
import { GetStaticProps } from 'next'
import { addApolloState, initializeApollo } from '@/gql'
import { useQuery } from '@apollo/client'
import { PostListResult, POST_LIST } from './typeDefs'

const PostListVars = {
  input: {
    current: 1,
    pageSize: 10,
  },
}

export default function Home() {
  const { data } = useQuery<PostListResult>(POST_LIST, {
    variables: PostListVars,
  })

  console.log(data)

  return (
    <LayoutContainer asideCom={ListBox()}>
      <ArticleList
        current={data?.getPosts.current}
        pageSize={data?.getPosts.pageSize}
        postList={data?.getPosts.items}
      />
    </LayoutContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  await apolloClient.query<PostListResult>({
    query: POST_LIST,
    variables: PostListVars,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}
