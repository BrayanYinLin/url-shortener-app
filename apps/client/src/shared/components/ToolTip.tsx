import { ReactNode } from 'react'

export function ToolTip({ children }: { children: ReactNode }) {
  return (
    <div>
      <span></span>
      {children}
    </div>
  )
}
