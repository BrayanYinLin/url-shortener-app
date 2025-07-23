import { Language } from './i18n'

const LANGUAGES: Record<string, Language> = {
  'es-ES': 'es',
  'en-US': 'en'
}

export const findLanguagePreference = (): Language => {
  const storagePreference = localStorage.getItem(
    'lang-preference'
  ) as Language | null

  if (storagePreference) return storagePreference

  const navigatorPreference = LANGUAGES[navigator.language] || 'en'

  return navigatorPreference
}

interface ClsxProps {
  stuff: string
  first: string
  second: string
  conditional: boolean
}

/**
 * clsx
 * @param stuff first tailwind classes
 * @param first first tailwind classes
 * @param second second tailwind classes
 * @param conditional condition to return the first one
 * @returns boolean
 */
export const clsx = ({ stuff, first, second, conditional }: ClsxProps) => {
  if (conditional) {
    return first + ' ' + stuff
  }

  return second + ' ' + stuff
}
