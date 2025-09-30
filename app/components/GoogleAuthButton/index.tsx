import { GoogleLogin } from '@react-oauth/google'
import { useTheme } from '~/modules/theme'
import { env } from '~/config'

export const GoogleAuthButton = () => {
  const theme = useTheme()

  return (
    <div
      // Background bug fix
      style={{ colorScheme: 'light' }}
      className="w-50 h-10"
    >
      <GoogleLogin
        onSuccess={() => {
          window.location.assign(`${env.VITE_BACKEND_URL}/auth/google`)
        }}
        ux_mode="popup"
        theme={theme === 'dark' ? 'filled_black' : 'outline'}
        shape="circle"
      />
    </div>
  )
}
