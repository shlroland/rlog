import { FC, useEffect, useRef } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import * as path from 'path'
import * as fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'
import 'highlight.js/styles/shades-of-purple.css'
import highlight from 'highlight.js'

interface PostProps {
  data: Record<string, any>
  content: string
}

const Post: FC<PostProps> = ({ content }) => {
  const mdRef = useRef<HTMLElement | null>(null)

  // 高亮
  useEffect(() => {
    if (!mdRef.current) {
      return
    }
    const blocks = mdRef.current.querySelectorAll('pre code')
    blocks.forEach(block => {
      highlight.highlightBlock(block as HTMLElement)
    })
  })

  return (
    <LayoutContainer>
      <div className="w-full p-8 bg-white rounded-lg shadow">
        <article ref={mdRef} className="prose " dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </LayoutContainer>
  )
}

export const getStaticProps: GetStaticProps<
  { data: any; content: string },
  { id: string }
> = async ({ params }) => {
  const { id } = params as { id: string }
  const filePath = path.resolve(process.cwd(), '_posts', `${id}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const result = await remark().use(html).process(content)
  return {
    props: {
      data,
      content: result.toString(),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: 'xxxxxx' },
      },
    ],
    fallback: false,
  }
}

export default Post
