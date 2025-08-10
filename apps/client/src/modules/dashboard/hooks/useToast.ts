import { useEffect, useState } from 'react'
import { ToastEventData } from '../lib/events'

export function useToast() {
  const [toast, setToast] = useState<ToastEventData | null>(null)

  useEffect(() => {
    const appear = (event: Event) => {
      const custom = event as CustomEvent<ToastEventData>

      setToast({
        title: custom.detail.title,
        message: custom.detail.message,
        isError: custom.detail.isError
      })
    }
    window.addEventListener('toast', appear)

    return () => {
      window.removeEventListener('toast', appear)
    }
  }, [])

  return { toast, setToast }
}
