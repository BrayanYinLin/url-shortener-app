import { useUserStore } from '@/lib/stores'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function useUser() {
  const { user, auth } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      auth().catch(() => navigate('/', { replace: true }))
    }
  }, [])

  return { user }
}
