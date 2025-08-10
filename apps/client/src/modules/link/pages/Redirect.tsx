import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getLinkByShort } from '../lib/services'
import { RedirectingIcon } from '@/components/Icons'

export function Redirect() {
  const { short } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!short) return

    getLinkByShort({ name: short })
      .then(({ long }) => (window.location.href = long))
      .catch(() => navigate('/not-found'))
  }, [])
  return (
    <main className="bg-pattern min-h-screen flex flex-col justify-center items-center">
      <RedirectingIcon />
      <h2 className="bg-white font-semibold text-center">Redirecting you...</h2>
    </main>
  )
}
