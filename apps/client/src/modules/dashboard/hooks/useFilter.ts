import { useEffect, useState } from 'react'
import { useLinksStore } from '../lib/stores'
import { LinkDto } from 'modules/links/dto/link.dto'

export function useFilter() {
  const { links } = useLinksStore()
  const [result, setResult] = useState<LinkDto[]>(links)
  const [term, setTerm] = useState<string>('')

  const changeTerm = ({ term }: { term: string }) => {
    setTerm(term.trim().toLowerCase())
  }

  useEffect(() => {
    if (term.trim() === '') {
      setResult(links)
      return
    }

    const filter = setTimeout(() => {
      const regex = new RegExp(term)
      const linksFiltered = links.filter(
        (link) => regex.test(link.short) || regex.test(link.long)
      )

      setResult(linksFiltered)
    }, 1000)

    return () => clearTimeout(filter)
  }, [term, links])

  return { changeTerm, result }
}
