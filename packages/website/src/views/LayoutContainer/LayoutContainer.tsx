import LayoutContent from './LayoutContent'
import LayoutAside from './LayoutAside'
import { FC } from 'react'

interface LCProps {
  asideCom?: JSX.Element
}

const LayoutContainer: FC<LCProps> = ({ children, asideCom }) => {
  return (
    <main className="relative top-0 w-full pt-8 max-w-7xl mx-auto flex-none flex">
      <LayoutContent>{children}</LayoutContent>
      <LayoutAside>{asideCom}</LayoutAside>
    </main>
  )
}

export default LayoutContainer
