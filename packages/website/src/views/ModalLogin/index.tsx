import { useState, forwardRef, useImperativeHandle, Ref } from 'react'
import Modal from 'react-modal'

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

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="login"
      shouldCloseOnOverlayClick={false}
    >
      <p>Modal text!</p>
      <button>Close Modal</button>
    </Modal>
  )
})

export type ModalLoginType = typeof ModalLogin

export default ModalLogin
