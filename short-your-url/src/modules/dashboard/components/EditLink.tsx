import { Overlay } from '@/components/Overlay'
import { useTranslationStore } from '@/lib/stores'
import { FormEvent, useRef } from 'react'
import { editLink } from '../lib/services'
import { Link } from 'root/types'

export function EditLink({
  id,
  short,
  close
}: {
  id: Required<Link>['id']
  short: string
  close: () => void
}) {
  const { t } = useTranslationStore()
  const form = useRef<HTMLFormElement | null>(null)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const url = formData.get('long') as string

    try {
      await editLink({ id, long: url })
      animateClosing()
    } catch (e) {
      console.error(e)
    }
  }

  const animateClosing = () => {
    form.current?.classList.replace('animate-maximize', 'animate-minimize')

    const timer = setTimeout(() => {
      close()
      clearTimeout(timer)
    }, 290)
  }

  return (
    <Overlay>
      <form
        onSubmit={submit}
        ref={form}
        className="animate-maximize bg-white-hue w-72 xs:w-96 p-2 rounded-md flex flex-col"
      >
        <h3 className="text-lg">
          {t('Edit Title')} <span className="font-semibold">/{short}</span>
        </h3>

        <label htmlFor="link">{t('Link')}</label>
        <input
          type="text"
          name="long"
          id="link"
          className="focus:outline-none border border-black p-1 rounded my-4"
        />

        <div className="flex justify-between gap-2">
          <button
            type="button"
            className="w-1/2 bg-slate-200 px-4 py-2 rounded font-semibold"
            onClick={animateClosing}
          >
            {t('Cancel')}
          </button>
          <button
            type="submit"
            className="w-1/2 bg-black-hue px-4 py-2 rounded text-white font-semibold"
          >
            {t('Edit Confirmation')}
          </button>
        </div>
      </form>
    </Overlay>
  )
}
