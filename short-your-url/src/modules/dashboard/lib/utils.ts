import { DateTime } from 'luxon'

export const getExpirationWithTimezone = (time: string) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const date = DateTime.fromISO(time).setZone(timezone).toISO()

  return date?.toString()
}
