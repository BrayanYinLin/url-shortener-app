import { FireIcon } from '@/components/Icons'
import { useUserStore } from '@/lib/stores'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { authenticateGoogle } from '../lib/services'

export default function CallbackGoogle() {
  const { setUser } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    authenticateGoogle({ search: window.location.search })
      .then((user) => {
        setUser(user)
        navigate('/dashboard', { replace: true })
      })
      .catch((e) => {
        console.error('Error fetching user data:', e)
        navigate('/signin', { replace: true })
      })
  }, [])

  return (
    <main className="bg-pattern min-h-screen flex flex-col justify-center items-center">
      <FireIcon />
      <h2 className="font-semibold text-center">Loading...</h2>
    </main>
  )
}
