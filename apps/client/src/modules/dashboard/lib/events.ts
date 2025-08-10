export type ToastEventData = {
  title: string
  message: string
  isError: boolean
}

export const showToast = ({ title, message, isError }: ToastEventData) => {
  const ToastEvent = new CustomEvent('toast', {
    detail: {
      title,
      message,
      isError
    }
  })

  window.dispatchEvent(ToastEvent)
}
