import { useState, forwardRef, useImperativeHandle, Ref } from 'react'
import Modal from 'react-modal'
import styles from './index.module.css'
import cls from 'classnames'
export interface LoginRefProps {
  open: () => void
}

Modal.setAppElement('body')

const ModalLogin = forwardRef((props, ref: Ref<LoginRefProps>) => {
  const [showModal, setShowModal] = useState(false)

  function handleOpenModal() {
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  useImperativeHandle(ref, () => ({
    open: handleOpenModal,
  }))

  const modalCls = cls([
    styles.modal,
    'max-w-md w-full flex items-center hover:outline-none focus:outline-none',
  ])

  // const overlayCls = cls()

  return (
    <Modal
      isOpen={showModal}
      contentLabel="login"
      shouldCloseOnOverlayClick={false}
      className={modalCls}
      overlayClassName={styles.overlay}
    >
      <div className="w-full px-6 py-12">
        <img className="w-auto h-10 mx-auto" src={require('@/assets/images/logo2.svg')} alt="" />
        <form className="mt-5" action="https://tailwindui.com/login" method="POST">
          <input type="hidden" name="_token" value="NSe3lVKUyYn8FLLyUJS4QPtH8Ei7xHL7JMaHtsTv" />{' '}
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value=""
              />
            </div>
            <div className="relative -mt-px">
              <input
                aria-label="Password"
                name="password"
                type="password"
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="relative block w-full px-3 py-2 font-semibold text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:bg-gray-900 focus:outline-none focus:shadow-outline sm:text-sm"
            >
              登录
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="mt-6">
            <a
              onClick={handleCloseModal}
              className="block w-full px-3 py-2 font-medium text-center text-gray-900 border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 focus:outline-none focus:border-gray-400 sm:text-sm"
            >
              取消登录
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
})

export type ModalLoginType = typeof ModalLogin

export default ModalLogin
