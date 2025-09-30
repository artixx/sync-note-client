import { ToastContainer, Zoom } from 'react-toastify'

export const Toasts = () => {
  return (
    <ToastContainer
      draggablePercent={50}
      limit={3}
      position="top-center"
      theme="dark"
      transition={Zoom}
    />
  )
}
