import { FormEvent, useRef, useState } from 'react'
import { useLinksStore } from '../lib/stores'
import { LinkService } from 'modules/links/services/link.service'
import { CreateLinkSchema } from 'modules/links/dto/link.dto'
import { useTranslation } from 'react-i18next'
import { updateInputBorder } from 'modules/links/utils/input-validate'
import { Switch } from 'modules/links/components/Switch'
import { TimerModeIcon, ClassicModeIcon } from '@/components/Icons'
import { DatetimePicker } from 'modules/links/components/DatetimePicker'
import { combineDateAndTimeToISO } from 'modules/links/utils/combine-date'

export default function LinkForm() {
  const [expirationMode, setExpirationMode] = useState<boolean>(false)
  const { fetchLinks } = useLinksStore()
  const { t } = useTranslation()
  const shortInput = useRef<HTMLInputElement>(null!)
  const linkInput = useRef<HTMLInputElement>(null!)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState<string>('14:00')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const short = data.get('short')?.toString()
    const long = data.get('long')?.toString()

    if (!short || !long) {
      return
    }

    try {
      const iso = combineDateAndTimeToISO(date, time)
      const { data, error } = CreateLinkSchema.safeParse({
        short: short,
        long: long,
        expiresAt: iso
      })

      console.log(iso)

      if (!data) {
        throw new Error(error.toString())
      }

      await LinkService.create(data)
      await fetchLinks()

      shortInput.current!.value = ''
      linkInput.current!.value = ''
    } catch (e) {
      console.error(e)
    }
  }

  const handleShortTyping = () => {
    const shortRegex = /^[A-Za-z0-9\-+*_]+$/ // sin flag "g", más limpio
    updateInputBorder(shortInput, shortRegex)
  }

  const handleURLTyping = () => {
    const urlRegex =
      /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/
    updateInputBorder(linkInput, urlRegex)
  }

  return (
    <>
      <section className="w-full mb-4 bg-white flex flex-col border border-shark-950/25 shadow-sm rounded-lg p-3 gap-2">
        <section className="flex justify-between mb-2">
          <h2 className="font-bold text-lg">{t('newLink')}</h2>
          <Switch
            state={expirationMode}
            exchange={() => setExpirationMode(!expirationMode)}
            disableIcon={<ClassicModeIcon />}
            enableIcon={<TimerModeIcon />}
          />
        </section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-2"
        >
          <input
            type="text"
            name="short"
            id="short"
            placeholder="Short"
            className="flex-1 border border-slate-300 shadow-sm rounded-md p-2 focus:outline-none"
            ref={shortInput}
            onChange={handleShortTyping}
          />
          <input
            type="text"
            name="long"
            id="long"
            placeholder="URL"
            className="flex-1 border border-slate-300 shadow-sm rounded-md p-2 focus:outline-none"
            ref={linkInput}
            onChange={handleURLTyping}
          />
          {expirationMode && (
            <DatetimePicker
              date={date}
              time={time}
              setDate={setDate}
              setTime={setTime}
            />
          )}
          <button
            type="submit"
            className="cursor-pointer hover:shadow-turquoise-simple transition-all duration-200 bg-turquoise-blue-500 text-white font-semibold px-4 py-2 rounded-md"
          >
            {t('shorten')}
          </button>
        </form>
      </section>
    </>
  )
}
