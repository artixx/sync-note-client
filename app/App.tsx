import { Outlet } from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from '~/modules/theme'
import { Toasts } from '~/components/Toasts'
import { env } from '~/config'
import { MyAd } from '~/components/MyAd'
import { toastError } from '~/modules/error'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toastError(error),
  }),
})

const App = () => {
  return (
    <>
      <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Outlet />
            <Toasts />
          </ThemeProvider>
        </QueryClientProvider>

        {/* Для дебага */}
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      </GoogleOAuthProvider>
      <MyAd />
    </>
  )
}

export default App

export function shouldRevalidate() {
  return true
}
