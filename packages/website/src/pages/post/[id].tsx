import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import * as path from 'path'
import * as fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import LayoutContainer from '@/views/LayoutContainer/LayoutContainer'

interface PostProps {
  data: Record<string, any>
  content: string
}

const Post: FC<PostProps> = ({ content }) => {
  return (
    <LayoutContainer>
      <div className="w-full bg-white rounded-lg shadow p-8">
        {/*<div className="bg-blend-darken h-16 prose"></div>*/}
        <article className="prose " dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </LayoutContainer>
  )
}

export const getStaticProps: GetStaticProps<{}, { id: string }> = async ({ params }) => {
  const { id } = params
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
