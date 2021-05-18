import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import * as path from 'path'
import * as fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

interface PostProps {
  data: Record<string, any>
  content: string
}

const Post: FC<PostProps> = ({ content }) => {
  return <article className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: content }}></article>
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
