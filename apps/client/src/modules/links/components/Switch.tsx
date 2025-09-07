import { ReactNode } from 'react'

export type SwitchProps = {
  state: boolean
  exchange: () => void
  enableIcon: ReactNode
  disableIcon: ReactNode
}

export function Switch({
  exchange,
  state,
  enableIcon,
  disableIcon
}: SwitchProps) {
  return (
    <button
      type="button"
      onClick={() => exchange()}
      className="cursor-pointer relative inline-flex h-7 w-14 items-center rounded-full transition bg-slate-100"
    >
      <span
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-turquoise-blue-500 shadow-md transform transition
          ${state ? 'translate-x-6' : 'translate-x-0'}`}
      >
        {state ? enableIcon : disableIcon}
      </span>
    </button>
  )
}
