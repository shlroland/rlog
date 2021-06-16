import { FC, useEffect, useRef } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import 'highlight.js/styles/shades-of-purple.css'
import highlight from 'highlight.js'
import { initializeApollo } from '@/gql'
import { PostListResult, POST_LIST } from '../typeDefs'
import { PostListVars } from '..'
import { POST, PostDetailItem, PostDetailResult } from './typeDefs'

interface PostProps {
  post: PostDetailItem
}

const Post: FC<PostProps> = ({ post }) => {
  const mdRef = useRef<HTMLElement | null>(null)
  // 高亮
  useEffect(() => {
    if (!mdRef.current) {
      return
    }
    const blocks = mdRef.current.querySelectorAll('pre code')
    blocks.forEach(block => {
      highlight.highlightElement(block as HTMLElement)
    })
  })

  return (
    <LayoutContainer>
      <div className="w-full p-8 bg-white rounded-lg shadow">
        <article ref={mdRef} className="prose " dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </LayoutContainer>
  )
}

export const getStaticProps: GetStaticProps<PostProps, { id: string }> = async ({ params }) => {
  const { id } = params!
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<PostDetailResult>({
    query: POST,
    variables: { id },
  })
  return {
    props: {
      post: data.getPostById,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<PostListResult>({
    query: POST_LIST,
    variables: PostListVars,
  })

  const paths = data.getPosts.items.map(post => {
    return {
      params: { id: post._id },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export default Post
