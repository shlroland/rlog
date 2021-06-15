import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import ArticleCard from '@/components/ArticleCard/index'
import ListBox from '@/components/ListBox'
import client from '@/graphql'
import { GetStaticProps } from 'next'
import { gql } from '@apollo/client'

export default function Home() {
  return (
    <LayoutContainer asideCom={ListBox()}>
      <div className="flex flex-col flex-wrap w-full">
        <ArticleCard />
      </div>
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
