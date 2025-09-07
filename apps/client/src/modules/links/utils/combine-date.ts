import { DateTime } from 'luxon'

export function combineDateAndTimeToISO(
  date: Date,
  time: string
): string | null {
  const [hours, minutes] = time.split(':').map(Number)

  const dt = DateTime.fromJSDate(date).set({
    hour: hours,
    minute: minutes,
    second: 0,
    millisecond: 0
  })

  return dt.toISO()
}
