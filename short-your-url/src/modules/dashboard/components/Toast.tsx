import { CloseIcon } from '@/components/Icons'
import { clsx } from '@/lib/utils'
import { useEffect, useRef } from 'react'

type ToastProps = {
  title: string
  message: string
  isError: boolean
  toggle: () => void
}

export function Toast({ title, message, isError, toggle }: ToastProps) {
  const toastElement = useRef<HTMLElement | null>(null)
  const descriptionStyle = clsx({
    stuff: 'text-xs overflow-hidden whitespace-nowrap overflow-ellipsis w-30',
    first: 'text-black',
    second: 'text-[#d3102f]',
    conditional: !isError
  })

  const handleClick = () => {
    toastElement.current?.classList.replace(
      'animate-appear',
      'animate-disappear'
    )

    const timer = setTimeout(() => {
      toggle()
      clearTimeout(timer)
    }, 400)
  }

  useEffect(() => {
    let destroyTimer: number
    const TIME_TO_START_ANIMATION = 4000
    const TIME_TO_DESTROY = 450

    const timer = setTimeout(() => {
      toastElement.current?.classList.replace(
        'animate-appear',
        'animate-disappear'
      )

      destroyTimer = setTimeout(() => {
        toggle()
      }, TIME_TO_DESTROY)
    }, TIME_TO_START_ANIMATION)

    return () => {
      clearTimeout(timer)
      clearTimeout(destroyTimer)
    }
  }, [])

  return (
    <article
      className="animate-appear w-72 md:w-96 fixed bottom-2 left-2 border border-slate-300 shadow-sm p-2 bg-white-hue rounded-md"
      ref={toastElement}
    >
      <div className="flex justify-between">
        <p
          className={clsx({
            stuff: 'text-xl font-bold',
            first: 'text-black',
            second: 'text-[#d3102f]',
            conditional: !isError
          })}
        >
          {title}
        </p>
        <button type="button" aria-label="close toast" onClick={handleClick}>
          <CloseIcon />
        </button>
      </div>
      <p className={descriptionStyle}>{message}</p>
    </article>
  )
}
