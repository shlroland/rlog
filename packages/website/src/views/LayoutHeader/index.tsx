import { FC } from 'react'
import styles from '@/views/LayoutHeader/LayoutHeader.module.css'

const LayoutHeader: FC = () => {
  return (
    <header className="w-full bg-white">
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <a className="overflow-hidden w-auto">
            <img className="w-10 h-10" src={require('@/assets/images/logo.png')} alt="/" />
          </a>
        </div>
        <nav className={styles.content}>
          <ul className={styles['content-nav']}>
            <li className="h-full inline-flex items-center pr-8 cursor-pointer">首页</li>
            <li className="h-full inline-flex items-center pr-8">归档</li>
          </ul>
          <ul className={styles['content-action']}></ul>
        </nav>
      </div>
    </header>
  )
}

export default LayoutHeader
