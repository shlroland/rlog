import styles from './index.module.css'
import Link from 'next/link'

const ArticleCard = () => {
  return (
    <Link href={`/post/[id]`} as={`/post/xxxxxx`}>
      <article className="flex w-full bg-white rounded-lg shadow">
        <img
          className="object-cover w-1/3 rounded-tl-lg rounded-bl-lg"
          src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-05-13/internet-emerge-econ_1200x675_hero_071317.jpeg"
          alt="xxx"
        />
        <div className="py-4 pl-12 md:pl-10 xs:pl-10">
          <h2 className="mb-2 text-2xl font-bold leading-7 transition hover:text-teal-600">
            Setting up Tailwind With create-react-app
          </h2>
          <div className="mb-2">
            <a href="/t/react" className="p-1 text-sm text-gray-600 hover:text-black">
              <span className="text-opacity-50">#</span>
              react
            </a>
            <a href="/t/javascript" className="p-1 text-sm text-gray-600 hover:text-black">
              <span className="text-opacity-50">#</span>
              javascript
            </a>
            <a href="/t/tailwind" className="p-1 text-sm text-gray-600 hover:text-black">
              <span className="text-opacity-50">#</span>
              tailwind
            </a>
          </div>
          <div className="mb-1 leading-6">
            …base; @<mark>tailwind</mark> components; @<mark>tailwind</mark> utilities; These are{' '}
            <mark>Tailwind</mark> directives...What is <mark>Tailwind</mark>?…
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <a
                href="/hagnerd/setting-up-tailwind-with-create-react-app-4jd"
                className="py-1 pl-1 pr-2 text-sm text-gray-600 rounded hover:bg-gray-100 hover:text-black"
              >
                <svg
                  className="inline fill-current"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
                </svg>
                195<span className="hidden md:inline">&nbsp;reactions</span>
              </a>
              <a
                href="/hagnerd/setting-up-tailwind-with-create-react-app-4jd#comments"
                className="py-1 pl-1 pr-2 text-sm text-gray-600 rounded hover:bg-gray-100 hover:text-black"
              >
                <svg
                  className="inline fill-current"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
                </svg>
                20<span className="hidden md:inline">&nbsp;comments</span>
              </a>
            </div>
            <div className="flex items-center">
              <small className="mr-2 text-gray-600">8 min read</small>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

const ArticleList = () => {
  return (
    <div className={styles.wrapper}>
      <ArticleCard />
    </div>
  )
}

export default ArticleList
