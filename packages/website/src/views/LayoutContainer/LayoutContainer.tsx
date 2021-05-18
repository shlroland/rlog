import LayoutContent from './LayoutContent'
import LayoutAside from './LayoutAside'
import { FC } from 'react'

interface LCProps {
  asideCom?: JSX.Element
}

const LayoutContainer: FC<LCProps> = ({ children, asideCom }) => {
  return (
    <>
      <LayoutContent>{children}</LayoutContent>
      <LayoutAside>{asideCom}</LayoutAside>
    </>
  )
}

export default LayoutContainer
