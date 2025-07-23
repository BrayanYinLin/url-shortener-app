import { ENDPOINTS } from '@/lib/definitions'
import { LinkError } from '@/lib/errors'
import { Link } from 'root/types'

export const getLinkByShort = async ({ name }: { name: string }) => {
  const response = await fetch(`${ENDPOINTS.LINK}?short=${name}`, {
    method: 'GET',
    credentials: 'include'
  })

  if (!response.ok) {
    const { msg } = await response.json()
    throw new LinkError(msg)
  }

  const links: Link = await response.json()

  return links
}
