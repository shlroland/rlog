import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import ArticleList from '@/components/ArticleList/index'
import ListBox from '@/components/ListBox'
import client from '@/graphql'
import { GetStaticProps } from 'next'
import { gql } from '@apollo/client'

export default function Home({ posts }) {
  console.log(posts)
  return (
    <LayoutContainer asideCom={ListBox()}>
      <ArticleList />
    </LayoutContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query PostList($input: PaginationInput!) {
        getPosts(input: $input) {
          total
          current
          pageSize
          items {
            _id
            title
          }
        }
      }
    `,
    variables: {
      input: {
        current: 1,
        pageSize: 10,
      },
    },
  })

  return {
    props: {
      posts: data.getPosts,
    },
  }
}
