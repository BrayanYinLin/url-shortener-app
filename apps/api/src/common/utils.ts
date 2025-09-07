import { env_node } from '@shared/config/enviroment'
import { CookieOptions } from 'express'
import { MILLISECONDS_TIMES } from '../common/definitions'
import { DateTime } from 'luxon'

export const parseCookie = ({
  cookiesSet,
  tokenName
}: {
  cookiesSet: string[]
  tokenName: string
}) => {
  let match
  for (const cookie of cookiesSet) {
    const regex = new RegExp(`(?:^|; )${tokenName}=([^;]*)`)
    match = cookie.match(regex)
    if (match) {
      return `${tokenName}=${match[1]}`
    }
  }
  return ''
}

type CookieSettings = {
  access_settings: CookieOptions
  refresh_settings: CookieOptions
}

export const setCookiesSettings = (): CookieSettings => {
  const { FITHTEEN_DAYS_SECONDS, TWO_HOURS } = MILLISECONDS_TIMES

  const access_settings: CookieOptions = {
    httpOnly: true,
    maxAge: TWO_HOURS,
    domain: 'localhost',
    secure: env_node === 'PRODUCTION',
    sameSite: env_node === 'PRODUCTION' ? 'none' : 'lax',
    path: '/'
  }

  const refresh_settings: CookieOptions = {
    httpOnly: true,
    maxAge: FITHTEEN_DAYS_SECONDS,
    domain: 'localhost',
    secure: env_node === 'PRODUCTION',
    sameSite: env_node === 'PRODUCTION' ? 'none' : 'lax',
    path: '/'
  }

  return { access_settings, refresh_settings }
}

export const getClearCookiesSettings = () => {
  const settings: CookieOptions = {
    httpOnly: true,
    domain: 'localhost',
    secure: env_node === 'PRODUCTION',
    sameSite: env_node === 'PRODUCTION' ? 'none' : 'lax',
    path: '/'
  }

  return { settings }
}

export const getExpirationWithTimezone = (time: string) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const date = DateTime.fromISO(time).setZone(timezone).toISO()

  if (!date) return null

  return date.toString()
}
