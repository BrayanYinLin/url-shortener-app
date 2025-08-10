import { SettingsIcon } from '@/components/Icons'
import { useEffect, useRef, useState } from 'react'
import { LogoutButton } from './LogoutButton'

export function SettingsButton() {
  const settingsButton = useRef<HTMLButtonElement | null>(null)
  const [settings, setSettings] = useState<boolean>(false)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const element = settingsButton.current
      const hit = element && !element.contains(event.target as Node)

      if (hit) {
        settingsButton.current?.classList.replace(
          'animate-maximize',
          'animate-minize'
        )
        const timer = setTimeout(() => {
          setSettings(false)
          clearTimeout(timer)
        }, 300)
      }
    }

    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [settings])

  const toggle = () => setSettings((prev) => !prev)

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="settings"
        className="p-1 rounded hover:bg-slate-100 transition-all duration-200"
        ref={settingsButton}
        onClick={toggle}
      >
        <SettingsIcon />
      </button>
      {settings && (
        <section className="animate-maximize rounded-md absolute w-20 top-10 right-0 md:left-0 bg-white p-1 border-[1px] border-[#808080] flex flex-col">
          <LogoutButton />
        </section>
      )}
    </div>
  )
}
