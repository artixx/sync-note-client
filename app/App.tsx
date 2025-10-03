import { Outlet } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from '~/modules/theme'
import { Toasts } from '~/components/Toasts'
import { env } from '~/config'
import { MyAd } from '~/components/MyAd'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

const App = () => {
  return (
    <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Outlet />
          <Toasts />
          <MyAd />
        </ThemeProvider>
      </QueryClientProvider>

      {/* Для дебага */}
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </GoogleOAuthProvider>
  )
}

export default App

export function shouldRevalidate() {
  return true
}
