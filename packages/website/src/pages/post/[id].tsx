import { FC, useEffect, useRef } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import 'highlight.js/styles/shades-of-purple.css'
import highlight from 'highlight.js'
import { initializeApollo } from '@/gql'
import { PostListResult, POST_LIST } from '../typeDefs'
import { PostListVars } from '..'
import { POST, PostDetailItem, PostDetailResult } from './typeDefs'
import dayjs from 'dayjs'
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

  console.log(post)

  return (
    <LayoutContainer>
      <div className="w-full p-8 bg-white rounded-lg shadow">
        <h1 className="my-6 text-5xl font-extrabold text-center">{post.title}</h1>
        <p className="italic text-center">
          发布于{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </p>
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
