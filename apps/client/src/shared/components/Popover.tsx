import { Root, Trigger, Portal, Content } from '@radix-ui/react-popover'
import { ReactNode } from 'react'

export type PopoverProps = {
  trigger: ReactNode
  children: ReactNode
}

export function Popover({ trigger, children }: PopoverProps) {
  return (
    <Root>
      <Trigger>{trigger}</Trigger>
      <Portal>
        <Content
          side="top"
          sideOffset={10}
          className="border border-slate-300 shadow-sm rounded-md p-2 focus:outline-none flex flex-col"
        >
          {children}
        </Content>
      </Portal>
    </Root>
  )
}
