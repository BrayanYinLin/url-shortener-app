import { useEffect } from 'react'
import { useParams } from 'react-router'
import { RedirectingIcon } from '@/components/Icons'
import { ENDPOINTS } from '@/lib/definitions'

export function Redirect() {
  const { short } = useParams()

  useEffect(() => {
    if (!short) return
    window.location.href = `${ENDPOINTS.LINK}?short=${short}`
  }, [])
  return (
    <main className="bg-pattern min-h-screen flex flex-col justify-center items-center">
      <RedirectingIcon />
      <h2 className="bg-white font-semibold text-center">Redirecting you...</h2>
    </main>
  )
}
