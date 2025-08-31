import { Overlay } from '@/components/Overlay'
import { FormEvent, useRef } from 'react'
import { editLink } from '../lib/services'
import { Link } from 'root/types'
import { useLinksStore } from '../lib/stores'

export function EditLink({
  id,
  short,
  close
}: {
  id: Required<Link>['id']
  short: string
  close: () => void
}) {
  const form = useRef<HTMLFormElement | null>(null)
  const { fetchLinks } = useLinksStore()

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const url = formData.get('long') as string

    try {
      await editLink({ id, long: url })
      await fetchLinks()
      animateClosing()
    } catch (e) {
      console.error(e)
    }
  }

  const animateClosing = () => {
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
        className="bg-white w-72 xs:w-96 p-2 rounded-md flex flex-col"
      >
        <h3 className="text-lg">
          Editar enlance <span className="font-semibold">/{short}</span>
        </h3>

        <label htmlFor="link">Enlace</label>
        <input
          type="text"
          name="long"
          id="link"
          className="focus:outline-none border border-black p-1 rounded my-4"
        />

        <div className="flex justify-between gap-2">
          <button
            type="button"
            className="cursor-pointer w-1/2 border text-turquoise-blue-500 border-turquoise-blue-500 px-4 py-2 rounded font-semibold"
            onClick={animateClosing}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="cursor-pointer w-1/2 bg-turquoise-blue-500 hover:shadow-turquoise-simple px-4 py-2 rounded text-white font-semibold"
          >
            Editar
          </button>
        </div>
      </form>
    </Overlay>
  )
}
