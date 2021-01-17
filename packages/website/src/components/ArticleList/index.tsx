import styles from './index.module.css'

const ArticleCard = () => {
  return (
    <article className="w-full shadow rounded-lg md:p-4 bg-white sm:py-3 py-4 px-2">
      <div role="presentation">
        <div className="m-2">
          <div className="flex items-center">
            <div className="mr-2">
              <a href="/hagnerd">
                <img
                  className="rounded-full w-8"
                  src="https://res.cloudinary.com/practicaldev/image/fetch/s---dcV6iX4--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/112962/b1373942-b945-4d16-af76-c448e080d14a.jpeg"
                  alt="hagnerd profile"
                  loading="lazy"
                />
              </a>
            </div>
            <div>
              <p>
                <a href="/hagnerd" className="text text-gray-700 text-sm hover:text-black">
                  Matt Hagner
                </a>
              </p>
              <a
                href="/hagnerd/setting-up-tailwind-with-create-react-app-4jd"
                className="text-xs text-gray-600 hover:text-black"
              >
                <time dateTime="2019-08-02T13:58:42.196Z">Aug 2 19 </time>
              </a>
            </div>
          </div>
        </div>
        <div className="pl-12 md:pl-10 xs:pl-10">
          <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 leading-7">
            <a
              href="/hagnerd/setting-up-tailwind-with-create-react-app-4jd"
              id="article-link-151230"
            >
              Setting up Tailwind With create-react-app
            </a>
          </h2>
          <div className="mb-2">
            <a href="/t/react" className="text-sm text-gray-600 p-1 hover:text-black">
              <span className="text-opacity-50">#</span>
              react
            </a>
            <a href="/t/javascript" className="text-sm text-gray-600 p-1 hover:text-black">
              <span className="text-opacity-50">#</span>
              javascript
            </a>
            <a href="/t/tailwind" className="text-sm text-gray-600 p-1 hover:text-black">
              <span className="text-opacity-50">#</span>
              tailwind
            </a>
          </div>
          <div className="mb-1 leading-6">
            …base; @<mark>tailwind</mark> components; @<mark>tailwind</mark> utilities; These are{' '}
            <mark>Tailwind</mark> directives...What is <mark>Tailwind</mark>?…
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <a
                href="/hagnerd/setting-up-tailwind-with-create-react-app-4jd"
                className="py-1 pl-1 pr-2 text-gray-600 text-sm rounded hover:bg-gray-100 hover:text-black"
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
                className="py-1 pl-1 pr-2 text-gray-600 text-sm rounded hover:bg-gray-100 hover:text-black"
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
      </div>
    </article>
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
