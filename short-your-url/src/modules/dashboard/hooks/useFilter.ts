import { useEffect, useState } from 'react'
import { Link } from 'root/types'
import { useLinksStore } from '../lib/stores'

export function useFilter() {
  const { links } = useLinksStore()
  const [linksFiltered, setLinksFiltered] = useState<Link[]>([])
  const [term, setTerm] = useState<string>('')

  const changeTerm = ({ term }: { term: string }) => {
    setTerm(term.trim().toLowerCase())
  }

  useEffect(() => {
    setLinksFiltered(links)
  }, [links])

  useEffect(() => {
    if (term.trim() === '') {
      setLinksFiltered(links)
      return
    }

    const regex = new RegExp(term)

    const filtered = linksFiltered.filter(
      ({ long, short }) =>
        regex.test(long.toLowerCase()) || regex.test(short.toLowerCase())
    )

    setLinksFiltered(filtered)
  }, [term])

  return { changeTerm, linksFiltered }
}
