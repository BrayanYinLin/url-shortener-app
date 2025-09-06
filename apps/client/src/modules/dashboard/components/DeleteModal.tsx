import { Overlay } from '@/components/Overlay'
import { useRef } from 'react'
import { User } from 'root/types'
import { useLinksStore } from '../lib/stores'

export function DeleteModal({
  id,
  short,
  close
}: {
  id: Required<User>['id']
  short: string
  close: () => void
}) {
  const { remove } = useLinksStore()
  const modal = useRef<HTMLElement | null>(null)

  const handleClose = () => {
    modal.current?.classList.add('animate-jump-out')
    const timer = setTimeout(() => {
      close()

      clearTimeout(timer)
    }, 290)
  }

  const handleDelete = (id: Required<User>['id']) => {
    modal.current?.classList.add('animate-jump-out')
    const timer = setTimeout(() => {
      close()
      remove({ id })

      clearTimeout(timer)
    }, 290)
  }

  return (
    <Overlay>
      <section
        className="animate-jump-in animate-once animate-duration-200 bg-white rounded-md w-72 xs:w-96 p-2"
        ref={modal}
      >
        <h3 className="text-lg font-semibold">
          ¿Deseas eliminar <span className="font-bold">/{short}</span>?
        </h3>

        <div className="w-full flex flex-row mt-4 gap-2">
          <button
            type="button"
            className="cursor-pointer w-1/2 py-2 px-6 rounded text-shark-950 text-base font-semibold border border-shark-950"
            onClick={handleClose}
            aria-label="close panel"
          >
            Cancelar
          </button>
          <button
            type="button"
            className="cursor-pointer w-1/2 py-2 px-6 rounded text-white text-base font-semibold bg-turquoise-blue-500 text-white-hue"
            onClick={() => handleDelete(id)}
          >
            Borrar
          </button>
        </div>
      </section>
    </Overlay>
  )
}
