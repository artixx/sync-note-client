import { ToastContainer, Zoom } from 'react-toastify'
import { useTheme } from '~/modules/theme'

export const Toasts = () => {
  const theme = useTheme()

  return (
    <ToastContainer
      draggablePercent={50}
      limit={3}
      position="bottom-right"
      theme={theme}
      transition={Zoom}
    />
  )
}
