import { useLayoutEffect, useState, type RefObject } from 'react'

export const useDynamicHeight = ({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>
}) => {
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const onResize = () => {
      const container = containerRef.current

      if (container) {
        setHeight(container.clientHeight)
      }
    }

    onResize()

    addEventListener('resize', onResize)

    return () => {
      removeEventListener('resize', onResize)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { height }
}
