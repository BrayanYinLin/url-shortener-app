import { Link, User } from 'root/types'
import { create } from 'zustand'
import { deleteLink, getUserLinks } from './services'
import { LinkError, TokenNotRefreshed } from '@/lib/errors'

interface LinksState {
  links: Link[]
  error: string | null
  fetchLinks: () => Promise<void>
  remove: ({ id }: Required<Pick<User, 'id'>>) => Promise<void>
}

export const useLinksStore = create<LinksState>((set, get) => ({
  links: [],
  error: null,
  fetchLinks: async () => {
    set({ error: null })
    try {
      const links = await getUserLinks()

      set({ links: links })
    } catch (e) {
      console.error(e)
      if (e instanceof TokenNotRefreshed) {
        set({ error: e.message })
      } else {
        set({ error: 'there was an error' })
      }
    }
  },
  remove: async ({ id }) => {
    try {
      await deleteLink({ id })

      await get().fetchLinks()
    } catch (e) {
      console.error(e)
      if (e instanceof LinkError) {
        set({ error: e.message })
      } else {
        set({ error: 'there was an error' })
      }
    }
  }
}))
