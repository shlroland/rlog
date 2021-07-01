import type { FC, Reducer } from 'react'
import { createContext, useReducer, useContext } from 'react'

type DispatchType = { type: string }

const LayoutStateContext = createContext<{
  isSidebarOpened: boolean
}>({ isSidebarOpened: true })
const LayoutDispatchContext = createContext<(value: DispatchType) => void>(
  {} as (value: DispatchType) => void,
)

const layoutReducer: Reducer<{ isSidebarOpened: boolean }, DispatchType> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpened: !state.isSidebarOpened }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const LayoutProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(layoutReducer, {
    isSidebarOpened: true,
  })

  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  )
}

const useLayoutState = () => {
  const context = useContext(LayoutStateContext)
  if (context === undefined) {
    throw new Error('useLayoutState must be used within a LayoutProvider')
  }
  return context
}

const useLayoutDispatch = () => {
  const context = useContext(LayoutDispatchContext)
  if (context === undefined) {
    throw new Error('useLayoutDispatch must be used within a LayoutProvider')
  }
  return context
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar }

// ###########################################################
function toggleSidebar(dispatch: (value: DispatchType) => void) {
  dispatch({
    type: 'TOGGLE_SIDEBAR',
  })
}
