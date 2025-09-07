import { Popover } from '@/components/Popover'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Dispatch, SetStateAction } from 'react'
import { es, enUS } from 'react-day-picker/locale'
import i18next from 'i18next'

export type DatetimePickerProps = {
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
  time: string
  setTime: Dispatch<SetStateAction<string>>
}

export function DatetimePicker({
  date,
  time,
  setDate,
  setTime
}: DatetimePickerProps) {
  const language = i18next.language === 'es' ? es : enUS

  const formatted = date
    ? new Intl.DateTimeFormat(i18next.language, {
        dateStyle: 'full'
      }).format(date)
    : ''

  const changeDate = (newDate: Date) => {
    if (newDate < date) {
      setDate(date)
      return
    }

    setDate(newDate)
  }

  return (
    <>
      <Popover
        trigger={
          <p className="cursor-pointer w-full px-3 py-2 border border-slate-300 shadow-sm rounded-md p-2">
            {formatted}
          </p>
        }
      >
        <DayPicker
          locale={language}
          mode="single"
          required={true}
          selected={date}
          onSelect={changeDate}
          className="bg-white"
        />
      </Popover>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
    </>
  )
}
