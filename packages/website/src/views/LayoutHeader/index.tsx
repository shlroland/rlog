import { FC, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cls from 'classnames'
import styles from '@/views/LayoutHeader/LayoutHeader.module.css'

const LayoutHeader: FC = () => {
  const { pathname } = useRouter()

  const linkCls = useCallback(
    (path: string) => {
      const active = path === pathname

      return cls('h-full inline-flex items-center px-5 cursor-pointer', {
        'bg-teal-500': active,
        'text-white': active,
      })
    },
    [pathname]
  )

  return (
    <header className="w-full bg-white shadow-lg">
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <a className="overflow-hidden w-auto">
            <img className="w-10 h-10" src={require('@/assets/images/logo.png')} alt="/" />
          </a>
        </div>
        <nav className={styles.content}>
          <ul className={styles['content-nav']}>
            <li className={linkCls('/')}>
              <Link href="/">
                <a>首页</a>
              </Link>
            </li>
            <li className={linkCls('/archives')}>
              <Link href="/archives">
                <a>归档</a>
              </Link>
            </li>
          </ul>
          <ul className={styles['content-action']}></ul>
        </nav>
      </div>
    </header>
  )
}

export default LayoutHeader
