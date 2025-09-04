import { Suspense, useEffect } from 'react'
import { LinkCard } from './LinkCard'
import { useLinksStore } from '../lib/stores'
import { useNavigate } from 'react-router'
import { LinkDto } from 'modules/links/dto/link.dto'
export interface ListLinksProps {
  linksFiltered: LinkDto[]
}

export function ListLinks({ linksFiltered }: ListLinksProps) {
  const { error, fetchLinks } = useLinksStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchLinks().then(() => {
      if (error) {
        navigate('/', { replace: true })
      }
    })
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="tablet:mx-0 md:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-2 pb-4">
        {(linksFiltered.length > 0 || linksFiltered) &&
          linksFiltered.map(({ id, long, short, clicks, expiresAt }) => (
            <LinkCard
              key={id!}
              id={id!}
              long={long}
              short={short}
              clicks={clicks}
              expiresAt={expiresAt}
            />
          ))}
      </section>
    </Suspense>
  )
}
