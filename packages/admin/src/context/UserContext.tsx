import type { FC, Reducer } from 'react'
import { useReducer, useContext, createContext } from 'react'
import type { DispatchType, UserStateContextProp } from './types'
import type { History } from 'history'
import { deleteToken, getToken, saveToken } from 'src/utils/storage'

const UserStateContext = createContext<UserStateContextProp>({
  isAuthenticated: false,
})
const UserDispatchContext = createContext<(value: DispatchType) => void>(
  {} as (value: DispatchType) => void,
)

const userReducer: Reducer<UserStateContextProp, DispatchType> = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true }
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    isAuthenticated: !!getToken(),
  })

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

function useUserState() {
  const context = useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

function useUserDispatch() {
  const context = useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }
  return context
}

function loginUser(
  dispatch: (value: DispatchType) => void,
  token: string,
  history: History,
) {
  if (!!token) {
    saveToken(token)
    dispatch({ type: 'LOGIN_SUCCESS' })
    history.push('/app/dashboard')
  } else {
    dispatch({ type: 'LOGIN_FAILURE' })
  }
}

function signOut(dispatch: (value: DispatchType) => void, history: History) {
  deleteToken()
  dispatch({ type: 'SIGN_OUT_SUCCESS' })
  history.push('/login')
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut }
