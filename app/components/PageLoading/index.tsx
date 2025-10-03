import type { FC } from 'react'
import Logo from './img/logo.png'

export const PageLoading: FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-back-1 flex flex-col justify-center items-center text-center text-text-1">
      <div className="flex flex-col justify-center items-center pb-[10%]">
        <img height={128} width={128} src={Logo} alt="Sync Note" />
        <span className="text-lg">Loading...</span>
      </div>
    </div>
  )
}
