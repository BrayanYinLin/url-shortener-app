import { FormEvent, useRef } from 'react'
import { createLink } from '../lib/services'
import { useLinksStore } from '../lib/stores'
import { showToast } from '../lib/events'
import { LinkError } from '@/lib/errors'
import { getExpirationWithTimezone } from '../lib/utils'

export default function LinkForm() {
  const { fetchLinks } = useLinksStore()
  const shortInput = useRef<HTMLInputElement | null>(null)
  const linkInput = useRef<HTMLInputElement | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const short = data.get('short')?.toString()
    const long = data.get('long')?.toString()
    const expiration = data.get('datetime')?.toString()

    if (!short || !long) {
      return
    }

    if (
      short === 'dashboard' ||
      short === 'signin' ||
      short === 'auth' ||
      short === 'not-found'
    ) {
      showToast({
        title: 'Creating Link Error',
        message: 'Name Reserved',
        isError: true
      })
      return
    }

    try {
      // eslint-disable-next-line no-useless-escape
      const shortRegex = /^[A-Za-z0-9\-\+\*\_]*$/g
      const urlRegex =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s?#]*)?(\?[^\s#]*)?(#[^\s]*)?$/g

      if (!shortRegex.test(short) || !urlRegex.test(long)) {
        return
      }

      const iso = getExpirationWithTimezone(expiration!)
      const link = await createLink({ long, short, expiresAt: iso! })
      await fetchLinks()

      shortInput.current!.value = ''
      linkInput.current!.value = ''
      showToast({
        title: 'New Link Confirmation',
        message: link.long,
        isError: false
      })
    } catch (e) {
      console.error(e)
      if (e instanceof LinkError) {
        showToast({
          title: 'Creating Link Error',
          message: e.message,
          isError: false
        })
      }
    }
  }

  const handleShortTyping = () => {
    // eslint-disable-next-line no-useless-escape
    const shortRegex = /^[A-Za-z0-9\-\+\*\_]+$/g

    if (shortInput.current!.value === '') {
      shortInput.current?.classList.replace(
        'border-[#d3102f]',
        'border-slate-300'
      )
      return
    }

    if (shortRegex.test(shortInput.current!.value)) {
      shortInput.current?.classList.replace(
        'border-[#d3102f]',
        'border-slate-300'
      )
    } else {
      shortInput.current?.classList.replace(
        'border-slate-300',
        'border-[#d3102f]'
      )
    }
  }

  const handleURLTyping = () => {
    const urlRegex =
      /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/

    if (linkInput.current!.value === '') {
      linkInput.current?.classList.replace(
        'border-[#d3102f]',
        'border-slate-300'
      )
      return
    }

    if (urlRegex.test(linkInput.current!.value)) {
      linkInput.current?.classList.replace(
        'border-[#d3102f]',
        'border-slate-300'
      )
    } else {
      linkInput.current?.classList.replace(
        'border-slate-300',
        'border-[#d3102f]'
      )
    }
  }
  return (
    <>
      <section className="w-full mb-4 bg-white flex flex-col border border-slate-300 shadow-sm rounded-lg p-3 gap-2">
        <section className="flex justify-between">
          <h2 className="font-bold text-lg">{'Create Shortened Link'}</h2>
        </section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-col gap-2"
        >
          <input
            type="text"
            name="short"
            id="short"
            placeholder="Short"
            className="flex-1 border border-slate-300 shadow-sm rounded-md p-2 focus:outline-none"
            ref={shortInput}
            onChange={handleShortTyping}
            required
          />
          <input
            type="text"
            name="long"
            id="long"
            placeholder="URL"
            className="flex-1 border border-slate-300 shadow-sm rounded-md p-2 focus:outline-none"
            ref={linkInput}
            onChange={handleURLTyping}
            required
          />
          <button
            type="submit"
            className="bg-turquoise-blue-500 text-white font-semibold px-4 py-2 rounded-md"
          >
            Shorten
          </button>
        </form>
      </section>
    </>
  )
}
