import type { RefObject } from 'react'
import { useFullscreen, useToggle } from 'react-use'

export const useFullSreenFn = (ref: RefObject<HTMLDivElement>) => {
  const [show, toggle] = useToggle(false)
  const isFullscreen = useFullscreen(ref, show, { onClose: () => toggle(false) })

  return [toggle, isFullscreen]
}
