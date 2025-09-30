import { type FC, useEffect, useState, useRef } from 'react'
import cx from 'classnames'
import { useAuthUser } from '~/queries/useAuthUser'
import { GoogleAuthButton } from '~/components/GoogleAuthButton'
import { useLogout } from '~/mutations/useLogout'

export const Menu: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useAuthUser()
  const { mutateAsync } = useLogout()

  const containerRef = useRef<HTMLDivElement>(null)

  const getCharacter = () => {
    const userName = data?.user?.name

    if (userName) {
      return userName.slice(0, 1).toUpperCase()
    }

    return '?'
  }

  const getMenuContent = () => {
    if (!data) {
      return 'Loading...'
    }

    if (!data.isAuthenticated) {
      return (
        <div className="px-1.5 py-1.5">
          <GoogleAuthButton />
        </div>
      )
    }

    return (
      <button
        className="hover:bg-[#0a69cc] text-text-1 hover:text-text-1-dark cursor-pointer px-1.5 py-1 rounded-md"
        onClick={() =>
          mutateAsync().then(() => {
            setIsOpen(false)
          })
        }
      >
        Logout
      </button>
    )
  }

  useEffect(() => {
    const onClick = (event: PointerEvent) => {
      const container = containerRef.current
      const target = event.target

      if (
        container &&
        target instanceof HTMLElement &&
        !container.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="shrink-0 flex justify-center items-center relative bg-back-2 h-8.5 w-8.5"
    >
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-full h-6 w-6 bg-[#ff9800] flex items-center justify-center text-center"
      >
        {getCharacter()}
      </button>
      <div
        className={cx(
          'border border-gray-300 dark:border-gray-600 rounded-md z-1 absolute backdrop-blur-xs top-4 right-4 opacity-0 flex flex-col px-1.5 py-1 transition-opacity duration-100 ease-out',
          {
            ['pointer-events-none']: !isOpen,
            ['opacity-100']: isOpen,
          },
        )}
      >
        {getMenuContent()}
      </div>
    </div>
  )
}
