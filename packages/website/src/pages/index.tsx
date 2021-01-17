import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <div className="flex-shrink-0">
        <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
      </div>
      <div>
        <div className="text-xl font-medium text-black">ChitChat</div>
        <p className="text-gray-500">You have a new message!</p>
      </div>
    </div>
  )
}
