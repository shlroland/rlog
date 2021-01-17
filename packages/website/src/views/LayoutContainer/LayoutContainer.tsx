import LayoutContent from './LayoutContent'
import LayoutAsdie from './LayoutAside'
import { FC } from 'react'

const LayoutContainer: FC = ({ children }) => {
  return (
    <>
      <LayoutContent>{children}</LayoutContent>
      <LayoutAsdie></LayoutAsdie>
    </>
  )
}

export default LayoutContainer
