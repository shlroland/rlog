import { useState, forwardRef, useImperativeHandle, Ref } from 'react'
import Modal from 'react-modal'
import styles from './index.module.css'
import cls from 'classnames'
export interface LoginRefProps {
  open: () => void
}

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
      onRequestClose={handleCloseModal}
      contentLabel="login"
      shouldCloseOnOverlayClick={false}
      className={modalCls}
      overlayClassName={styles.overlay}
    >
      <div className="py-12 px-6 w-full">
        <img
          className="mx-auto h-8 w-auto"
          src={require('@/assets/images/tailwindui-logo.svg')}
          alt=""
        />
        <p className="mt-6 text-sm text-center text-gray-900">Log in to your account</p>
        <form className="mt-5" action="https://tailwindui.com/login" method="POST">
          <input type="hidden" name="_token" value="NSe3lVKUyYn8FLLyUJS4QPtH8Ei7xHL7JMaHtsTv" />{' '}
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                className="border-gray-300 placeholder-gray-500 appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value=""
              />
            </div>
            <div className="-mt-px relative">
              <input
                aria-label="Password"
                name="password"
                type="password"
                className="border-gray-300 placeholder-gray-500 appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="relative block w-full py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 focus:outline-none focus:shadow-outline sm:text-sm"
            >
              <span className="absolute left-0 inset-y pl-3">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              Log in
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="mt-6">
            <a
              href="/pricing"
              className="block w-full text-center py-2 px-3 border border-gray-300 rounded-md text-gray-900 font-medium hover:border-gray-400 focus:outline-none focus:border-gray-400 sm:text-sm"
            >
              Purchase a license
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
})

export type ModalLoginType = typeof ModalLogin

export default ModalLogin
