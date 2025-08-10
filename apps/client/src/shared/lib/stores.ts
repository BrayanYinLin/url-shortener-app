import { create } from 'zustand'
import { Language, resource, Resource, TranslationKeys } from './i18n'
import { findLanguagePreference } from './utils'
import { authentication } from 'modules/home/lib/services'

export type User = {
  id?: string
  name: string
  email: string
  avatar: string
  provider: {
    provider_id?: string
    provider_name: string
  }
  created_at?: string
  index?: number
}

interface UserState {
  user: User | null
  setUser: (user: User) => void
  auth: () => Promise<void>
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  error: null,
  setUser: (user) => set(() => ({ user: user })),
  auth: async () => {
    try {
      const user = await authentication()

      set({ user: user })
    } catch (e) {
      set({ user: null })
      throw e
    }
  }
}))

interface TranslationStore {
  language: Language
  translations: Resource
  t: (key: TranslationKeys) => string
  changeLanguage: (lang: Language) => void
}

const useTranslationStore = create<TranslationStore>((set, get) => ({
  language: findLanguagePreference(),
  translations: resource,
  changeLanguage: (lang: Language) => {
    set(() => ({ language: lang }))
    localStorage.setItem('lang-preference', lang)
  },
  t: (key) => get().translations[get().language][key]
}))

export { useUserStore, useTranslationStore }
