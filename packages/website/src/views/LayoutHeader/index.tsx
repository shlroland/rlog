import { ElementRef, FC, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cls from 'classnames'
import styles from '@/views/LayoutHeader/LayoutHeader.module.css'
import Button from '@/components/Button'
import ModalLogin from '@/views/ModalLogin'

type ModalLoginType = ElementRef<typeof ModalLogin>

const LayoutHeader: FC = () => {
  const { pathname } = useRouter()
  const loginModalRef = useRef<ModalLoginType>(null)

  const linkCls = useCallback(
    (path: string) => {
      const active = path === pathname

      return cls('h-full inline-flex items-center px-5 cursor-pointer', {
        'bg-teal-500': active,
        'text-white': active,
        [styles.item]: true && !active,
      })
    },
    [pathname]
  )

  function handleOpenLogin() {
    loginModalRef.current!.open()
  }

  return (
    <header className="w-full bg-white shadow-lg">
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <a className="overflow-hidden w-auto">
            <img className="w-10 h-10" src={require('@/assets/images/logo2.svg')} alt="/" />
          </a>
        </div>
        <nav className={styles.content}>
          <ul className={styles['content-nav']}>
            <Link href="/">
              <li className={linkCls('/')}>
                <a>首页</a>
              </li>
            </Link>
            <Link href="/archives">
              <li className={linkCls('/archives')}>
                <a>归档</a>
              </li>
            </Link>
          </ul>
          <ul className={styles['content-action']}>
            <div className="flex items-center">
              <Button type="primary" size="small" plain={true} onClick={handleOpenLogin}>
                登录
              </Button>
            </div>
          </ul>
        </nav>
      </div>
      <ModalLogin ref={loginModalRef}></ModalLogin>
    </header>
  )
}

export default LayoutHeader
