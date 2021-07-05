import type { FC } from 'react'
import type { RouteProps as RouteBaseProps } from 'react-router-dom'

export interface RouteProps extends Omit<RouteBaseProps, 'component'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FC<Record<string, any>>
}
