import { LanguageIcon } from '@/components/Icons'
import { useTranslationStore } from '@/lib/stores'
import { useEffect, useRef, useState } from 'react'

export function LanguageButton() {
  const { changeLanguage } = useTranslationStore()
  const languageButton = useRef<HTMLButtonElement | null>(null)
  const [languageStateButton, setLanguageStateButton] = useState<boolean>(false)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const element = languageButton.current
      const hit = element && !element.contains(event.target as Node)

      if (hit) {
        languageButton.current?.classList.replace(
          'animate-maximize',
          'animate-minize'
        )
        const timer = setTimeout(() => {
          setLanguageStateButton(false)
          clearTimeout(timer)
        }, 300)
      }
    }

    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [languageStateButton])

  const toggle = () => setLanguageStateButton((prev) => !prev)

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="change language"
        className="p-1 rounded hover:bg-slate-100 transition-all duration-200"
        onClick={toggle}
        ref={languageButton}
      >
        <LanguageIcon />
      </button>
      {languageStateButton && (
        <section className="animate-maximize rounded-md absolute w-28 top-10 right-0 bg-white border border-[#808080] flex flex-col">
          <button
            type="button"
            className="text-sm rounded-t-md bg-white hover:bg-slate-200"
            onClick={() => changeLanguage('es')}
          >
            Español - ES
          </button>
          <button
            type="button"
            className="text-sm rounded-b-md bg-white hover:bg-slate-200"
            onClick={() => changeLanguage('en')}
          >
            English - EN
          </button>
        </section>
      )}
    </div>
  )
}
