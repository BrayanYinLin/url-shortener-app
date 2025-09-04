import { create } from 'zustand'
import { authentication } from '@auth/services/auth.service'

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

export { useUserStore }
